// IMPORTACIÓN DE MÓDULOS (Los archivos que creamos en carpetas)
import * as helpCmd from './commands/main/help.js';
import * as ruletaCmd from './commands/economia/ruleta.js';
import * as dailyCmd from './commands/economia/daily.js';
import * as topCmd from './commands/economia/top.js';
import * as workCmd from './commands/economia/work.js';
import * as haremCmd from './commands/gacha/harem.js';
// Nota: gacha_run.js debe tener la lógica del pull que pasamos a archivo
import * as gachaCmd from './commands/gacha/gacha_run.js'; 

export const handleCommand = async (sock, from, command, user, db, sender) => {
    const args = command.split(' ');
    const mainCommand = args[0];

    switch (mainCommand) {
        // --- SECCIÓN MAIN ---
        case 'help':
        case 'menu':
            await helpCmd.run(sock, from);
            break;

        case 'ping':
            await sock.sendMessage(from, { text: '🚀 *EX-RAR-Z-BOT* Online.' });
            break;

        // --- SECCIÓN ECONOMÍA ---
        case 'daily':
        case 'diario':
            await dailyCmd.run(sock, from, user, db);
            break;

        case 'work':
        case 'trabajar':
            await workCmd.run(sock, from, user, db);
            break;

        case 'rt':
        case 'ruleta':
            await ruletaCmd.run(sock, from, user, db, args);
            break;

        case 'top':
            await topCmd.run(sock, from, db);
            break;

        case 'coins':
            await sock.sendMessage(from, { text: `🪙 Tienes: *${user.coins.toLocaleString()}* monedas.` });
            break;

        // --- SECCIÓN GACHA ---
        case 'gacha':
            await gachaCmd.run(sock, from, user, db);
            break;

        case 'harem':
            await haremCmd.run(sock, from, user);
            break;

        case 'inv':
        case 'inventario':
            const list = user.inventory.slice(-10).map(c => `· ${c.name}`).join('\n');
            await sock.sendMessage(from, { text: `🎒 *ÚLTIMOS 10*\n\n${list || 'Vacío'}` });
            break;
    }
};

