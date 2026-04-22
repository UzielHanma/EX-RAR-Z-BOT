export const run = async (sock, from, user, db, args) => {
    const colorInput = args[1]?.toLowerCase();
    const amount = parseInt(args[2]);
    const coloresValidos = ['rojo', 'negro', 'verde'];

    if (!coloresValidos.includes(colorInput) || isNaN(amount) || amount <= 0) {
        return await sock.sendMessage(from, { text: '❌ Uso: `.rt rojo 100`\nColores: rojo (x2), negro (x2), verde (x10)' });
    }
    if (user.coins < amount) return await sock.sendMessage(from, { text: '❌ Monedas insuficientes.' });

    const suerte = Math.floor(Math.random() * 100) + 1;
    let colorResultado = suerte <= 5 ? 'verde' : suerte <= 52 ? 'rojo' : 'negro';
    let mult = colorResultado === 'verde' ? 10 : 2;
    const visual = colorResultado === 'rojo' ? '🔴' : colorResultado === 'negro' ? '⚫' : '🟢';

    if (colorInput === colorResultado) {
        const premio = amount * mult;
        user.coins += (premio - amount);
        await db.write();
        return await sock.sendMessage(from, { text: `🎡 *RULETA*\n\nResultó: ${visual}\n✨ Ganaste *${premio}* 🪙` });
    } else {
        user.coins -= amount;
        await db.write();
        return await sock.sendMessage(from, { text: `🎡 *RULETA*\n\nResultó: ${visual}\n💀 Perdiste *${amount}* 🪙` });
    }
};

