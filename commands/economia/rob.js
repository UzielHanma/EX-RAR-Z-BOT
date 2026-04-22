export const run = async (sock, from, user, db, args, sender) => {
    const mentioned = args[0]?.includes('@') ? args[0].replace('@', '') + '@s.whatsapp.net' : null;

    if (!mentioned || mentioned === sender) {
        return await sock.sendMessage(from, { text: '❌ Debes mencionar a alguien para robarle (que no seas tú mismo).' });
    }

    const targetUser = db.data.users.find(u => u.id === mentioned);
    if (!targetUser || targetUser.coins < 500) {
        return await sock.sendMessage(from, { text: '❌ La víctima es demasiado pobre o no está registrada.' });
    }

    const cooldown = 30 * 60 * 1000; // 30 minutos
    const ahora = Date.now();
    if (ahora - (user.lastRob || 0) < cooldown) {
        const falta = Math.ceil((cooldown - (ahora - user.lastRob)) / (1000 * 60));
        return await sock.sendMessage(from, { text: `⏳ Estás en la mira de la policía. Espera ${falta} min para volver a robar.` });
    }

    // Probabilidad de éxito: 40%
    const exito = Math.random() <= 0.40;
    user.lastRob = ahora;

    if (exito) {
        const robo = Math.floor(targetUser.coins * (Math.random() * 0.25 + 0.10)); // Roba entre el 10% y 35%
        targetUser.coins -= robo;
        user.coins += robo;
        await db.write();
        return await sock.sendMessage(from, { 
            text: `🥷 *¡ASALTO EXITOSO!*\n\nLe robaste *${robo.toLocaleString()}* 🪙 a @${mentioned.split('@')[0]}.\n¡Corre antes de que te atrapen!`,
            mentions: [mentioned]
        });
    } else {
        const multa = 1000; // Multa por fallar
        user.coins = Math.max(0, user.coins - multa);
        await db.write();
        return await sock.sendMessage(from, { 
            text: `👮‍♂️ *¡TE ATRAPARON!*\n\nFallaste el robo contra @${mentioned.split('@')[0]} y pagaste una multa de *${multa}* 🪙.`,
            mentions: [mentioned]
        });
    }
};

