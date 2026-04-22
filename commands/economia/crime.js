export const run = async (sock, from, user, db) => {
    const cooldown = 45 * 60 * 1000; // 45 minutos
    const ahora = Date.now();
    
    if (ahora - (user.lastCrime || 0) < cooldown) {
        const falta = Math.ceil((cooldown - (ahora - user.lastCrime)) / (1000 * 60));
        return await sock.sendMessage(from, { text: `🚨 Los federales están patrullando. Espera ${falta} min.` });
    }

    const acciones = [
        { msg: "Hackeaste un banco de la Soul Society", min: 5000, max: 10000, prob: 0.3 },
        { msg: "Robaste un cargamento de fruta del diablo", min: 3000, max: 7000, prob: 0.4 },
        { msg: "Estafaste a un noble de Marley", min: 2000, max: 5000, prob: 0.5 }
    ];

    const crimen = acciones[Math.floor(Math.random() * acciones.length)];
    const exito = Math.random() <= crimen.prob;
    user.lastCrime = ahora;

    if (exito) {
        const premio = Math.floor(Math.random() * (crimen.max - crimen.min + 1)) + crimen.min;
        user.coins += premio;
        await db.write();
        return await sock.sendMessage(from, { 
            text: `🕶️ *CRIMEN LOGRADO*\n\n${crimen.msg}.\nGanancia: *${premio.toLocaleString()}* 🪙` 
        });
    } else {
        const multa = 2000;
        user.coins = Math.max(0, user.coins - multa);
        await db.write();
        return await sock.sendMessage(from, { 
            text: `🚔 *OPERACIÓN FALLIDA*\n\nTe descubrieron y perdiste *${multa}* 🪙 en sobornos.` 
        });
    }
};

