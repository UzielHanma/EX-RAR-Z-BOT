export const run = async (sock, from, user, db) => {
    if (!user.marry) return await sock.sendMessage(from, { text: '❌ Ni siquiera estás casado...' });

    const exPartner = db.data.users.find(u => u.id === user.marry);
    if (exPartner) exPartner.marry = null;

    const partnerId = user.marry;
    user.marry = null;
    await db.write();

    return await sock.sendMessage(from, { 
        text: `💔 @${user.id.split('@')[0]} se ha divorciado de @${partnerId.split('@')[0]}. ¡La libertad se siente bien!`,
        mentions: [user.id, partnerId]
    });
};

