import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import pino from 'pino';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';

// IMPORTAMOS EL HANDLER
import { handleCommand } from './handler.js';                          

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

async function startBot() {
    const adapter = new JSONFile(file);
    const db = new Low(adapter, { users: [] });
    try {
        await db.read();
        db.data ||= { users: [] };
    } catch (e) {
        console.error("Error leyendo DB, reseteando...");
        db.data = { users: [] };
    }

    const { state, saveCreds } = await useMultiFileAuthState('session_auth');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        auth: state,
        printQRInTerminal: false,
        browser: ['EX-Rar-Z', 'Chrome', '1.0.0'],
        syncFullHistory: false,
        shouldSyncHistoryMessage: () => false,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.clear();
            console.log('🔰 ESCANEA EL CÓDIGO QR 🔰');
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada, reconectando:', shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.clear();
            console.log('✅ EX-RAR-Z: SISTEMA ONLINE');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const body = msg.message.conversation ||
                     msg.message.extendedTextMessage?.text ||
                     msg.message.imageMessage?.caption ||
                     msg.message.videoMessage?.caption || "";

        // --- LÓGICA DE MULTIPREFIJO ---
        const prefixes = ['.', '#', '/', '!']; // <--- Aquí puedes añadir más si quieres
        const prefix = prefixes.find(p => body.startsWith(p));
        
        // Si no empieza con un prefijo válido, ignoramos el mensaje
        if (!prefix) return;

        // Limpiamos el comando: quitamos el prefijo y pasamos a minúsculas
        const commandRaw = body.slice(prefix.length).trim();
        const command = commandRaw.toLowerCase();
        
        const sender = msg.key.participant || msg.key.remoteJid;

        console.log(`📩 [MENSAJE]: ${prefix}${command} | DE: ${sender.split('@')[0]}`);

        try {
            let user = db.data.users.find(u => u.id === sender);
	if (!user) {
   	 user = { 
        id: sender, 
        coins: 500, 
        inventory: [], 
        lastDaily: 0,
        lastWork: 0,
        xp: 0,           // NUEVO
        level: 1,        // NUEVO
        marry: null,     // NUEVO
        isPremium: false // NUEVO
    };
    db.data.users.push(user);
 	   await db.write();
}
            // AQUÍ LLAMAMOS AL MANEJADOR DE COMANDOS
            // Nota: El handler ahora recibirá el comando SIN el punto/prefijo (ej: "help")
            await handleCommand(sock, from, command, user, db, sender, msg);

        } catch (err) {
            console.error("❌ Error en el sistema de mensajes:", err);
        }
    });
}

startBot().catch(console.error);

