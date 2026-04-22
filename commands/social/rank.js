export const run = async (sock, from, user) => {
    const xpParaSiguiente = (user.level || 1) * 500;
    const progreso = Math.floor(((user.xp || 0) / xpParaSiguiente) * 10);
    const barra = '🟦'.repeat(progreso) + '⬜'.repeat(10 - progreso);
    
    const txt = `⭐ *NIVEL DE USUARIO* ⭐\n\n` +
                `👤 *Usuario:* @${user.id.split('@')[0]}\n` +
                `🆙 *Nivel Actual:* ${user.level || 1}\n` +
                `✨ *XP Total:* ${user.xp || 0} / ${xpParaSiguiente}\n\n` +
                `Progreso:\n${barra} [${progreso * 10}%]\n\n` +
                `_¡Sigue usando el bot para subir de nivel!_`;

    return await sock.sendMessage(from, { text: txt, mentions: [user.id] });
};

