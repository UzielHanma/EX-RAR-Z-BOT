export const run = async (sock, from, user, db) => {
    const cooldown = 24 * 60 * 60 * 1000; // 24 Horas en milisegundos
    const ahora = Date.now();
    const tiempoPasado = ahora - (user.lastDaily || 0);

    if (tiempoPasado < cooldown) {
        const falta = cooldown - tiempoPasado;
        const horas = Math.floor(falta / (1000 * 60 * 60));
        const minutos = Math.floor((falta % (1000 * 60 * 60)) / (1000 * 60));
        
        return await sock.sendMessage(from, { 
            text: `⏳ Ya reclamaste tu recompensa diaria.\n\nRegresa en: *${horas}h ${minutos}m*` 
        });
    }

    const premio = 500; // Recompensa diaria
    user.coins += premio;
    user.lastDaily = ahora;
    await db.write();

    return await sock.sendMessage(from, { 
        text: `🎁 *RECOMPENSA DIARIA*\n\n¡Has recibido *${premio}* 🪙!\n💰 Nuevo saldo: *${user.coins}*` 
    });
};

