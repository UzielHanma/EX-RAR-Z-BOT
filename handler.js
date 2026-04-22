// --- IMPORTACIÓN DE MÓDULOS ---

// Main & Info
import * as helpCmd from './commands/main/help.js';
import * as donateCmd from './commands/main/donate.js';
import * as profileCmd from './commands/main/profile.js';

// Administración de Grupos
import * as groupCmd from './commands/admin/group.js';
import * as warnCmd from './commands/admin/warn.js';
import * as tagallCmd from './commands/admin/tagall.js';
import * as actionCmd from './commands/admin/actions.js'; // kick, add, promote, demote
import * as infoGroupCmd from './commands/admin/infogroup.js';

// Economía & Juegos
import * as dailyCmd from './commands/economia/daily.js';
import * as workCmd from './commands/economia/work.js';
import * as ruletaCmd from './commands/economia/ruleta.js';
import * as topCmd from './commands/economia/top.js';
import * as robCmd from './commands/economia/rob.js';
import * as payCmd from './commands/economia/pay.js';
import * as crimeCmd from './commands/economia/crime.js';

// Gacha & Colección
import * as gachaCmd from './commands/gacha/gacha_run.js';
import * as haremCmd from './commands/gacha/harem.js';
import * as tradeCmd from './commands/gacha/trade.js';

// RPG & Social
import * as marryCmd from './commands/social/marry.js';
import * as divCmd from './commands/social/divorce.js';
import * as levelCmd from './commands/social/rank.js';

// NOTA: Añadimos 'message' a los parámetros para que los comandos de admin no fallen
export const handleCommand = async (sock, from, command, user, db, sender, message) => {
    const args = command.split(' ');
    const mainCommand = args[0];

    switch (mainCommand) {
        // 📑 --- SECCIÓN MAIN ---
        case 'help':
        case 'menu':
            await helpCmd.run(sock, from);
            break;

        case 'ping':
            await sock.sendMessage(from, { text: '🚀 *EX-RAR-Z-BOT* Online.' });
            break;

        case 'donar':
        case 'donate':
        case 'premium':
            await donateCmd.run(sock, from);
            break;

        case 'perfil':
        case 'profile':
            await profileCmd.run(sock, from, user, sender);
            break;

        // 👮 --- SECCIÓN ADMINISTRACIÓN ---
        case 'kick':
        case 'add':
        case 'promote':
            case 'demote':
            // Pasamos 'message' que ahora sí existe
            await actionCmd.run(sock, from, mainCommand, args, message);
            break;

        case 'group':
        case 'grupo':
            await groupCmd.run(sock, from, args);
            break;

        case 'setwelcome':
        case 'setbye':
            await groupCmd.config(sock, from, mainCommand, args, db);
            break;

        case 'link':
        case 'enlace':
            try {
                const code = await sock.groupInviteCode(from);
                await sock.sendMessage(from, { text: `🔗 *Enlace del grupo:* https://chat.whatsapp.com/${code}` });
            } catch {
                await sock.sendMessage(from, { text: '❌ No soy admin para obtener el link.' });
            }
            break;

        case 'infogroup':
        case 'gp':
            await infoGroupCmd.run(sock, from);
            break;

        case 'tagall':
        case 'todos':
            await tagallCmd.run(sock, from, args, message);
            break;

        case 'hidetag':
        case 'notificar':
            await tagallCmd.hidden(sock, from, args, message);
            break;

        case 'warn':
        case 'advertir':
        case 'unwarn':
            await warnCmd.run(sock, from, mainCommand, args, db);
            break;

        case 'banchat':
            await sock.sendMessage(from, { text: '🚫 Bot desactivado en este grupo.' });
            break;

        case 'mute':
            await sock.sendMessage(from, { text: '🤫 El usuario ha sido silenciado (Lógica en desarrollo).' });
            break;

        // 💰 --- SECCIÓN ECONOMÍA ---
        case 'daily':
        case 'diario':
            await dailyCmd.run(sock, from, user, db);
            break;

        case 'work':
        case 'trabajar':
            await workCmd.run(sock, from, user, db);
            break;

        case 'crime':
        case 'crimen':
            await crimeCmd.run(sock, from, user, db);
            break;

        case 'rob':
        case 'robar':
            await robCmd.run(sock, from, user, db, args, sender);
            break;

        case 'pay':
        case 'pagar':
            await payCmd.run(sock, from, user, db, args, sender);
            break;

        case 'rt':
        case 'ruleta':
            await ruletaCmd.run(sock, from, user, db, args);
            break;

        case 'top':
            await topCmd.run(sock, from, db);
            break;

        case 'coins':
        case 'bal':
            await sock.sendMessage(from, { text: `🪙 Tienes: *${user.coins.toLocaleString()}* monedas.` });
            break;

        // 💎 --- SECCIÓN GACHA ---
        case 'gacha':
            await gachaCmd.run(sock, from, user, db);
            break;

        case 'harem':
            await haremCmd.run(sock, from, user);
            break;

        case 'trade':
            await tradeCmd.run(sock, from, user, db, args);
            break;

        case 'inv':
        case 'inventario':
            const list = user.inventory.slice(-10).map(c => `· ${c.name}`).join('\n');
            await sock.sendMessage(from, { text: `🎒 *ÚLTIMOS 10*\n\n${list || 'Vacío'}` });
            break;

        // ❤️ --- SECCIÓN SOCIAL ---
        case 'marry':
        case 'casar':
            await marryCmd.run(sock, from, user, db, args, sender);
            break;

        case 'divorce':
        case 'divorcio':
            await divCmd.run(sock, from, user, db);
            break;

        case 'rank':
        case 'lvl':
            await levelCmd.run(sock, from, user);
            break;

        default:
            break;
    }
};

