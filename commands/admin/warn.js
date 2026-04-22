export const run = async (sock, from, command, args, db) => {
    const quoted = args[0]?.includes('@') ? args[0].replace('@', '') + '@s.whatsapp.net' : null;
    if (!quoted) return sock.sendMessage(from, { text: '❌ Menciona a alguien para advertir.' });

    if (!db.data.warns) db.data.warns = {};
    if (!db.data.warns[quoted]) db.data.warns[quoted] = 0;

    if (command === 'warn' || command === 'advertir') {
        db.data.warns[quoted]++;
        if (db.data.warns[quoted] >= 3) {
            db.data.warns[quoted] = 0;
            await sock.groupParticipantsUpdate(from, [quoted], "remove");
            await sock.sendMessage(from, { text: `🚫 @${quoted.split('@')[0]} fue eliminado por acumular 3 advertencias.`, mentions: [quoted] });
        } else {
            await sock.sendMessage(from, { text: `⚠️ @${quoted.split('@')[0]} tiene [${db.data.warns[quoted]}/3] advertencias.`, mentions: [quoted] });
        }
    } else { // unwarn
        db.data.warns[quoted] = 0;
        await sock.sendMessage(from, { text: `✅ Advertencias reiniciadas para @${quoted.split('@')[0]}`, mentions: [quoted] });
    }
    await db.write();
};

