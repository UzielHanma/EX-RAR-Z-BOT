export const run = async (sock, from, command, args, msg) => {
    const text = args.join(' ');
    const participants = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant;
    const users = participants.length > 0 ? participants : (quoted ? [quoted] : []);

    if (users.length === 0 && command !== 'add') return sock.sendMessage(from, { text: `❌ Menciona o responde al mensaje de alguien para ejecutar: ${command}` });

    try {
        switch (command) {
            case 'kick':
                await sock.groupParticipantsUpdate(from, users, "remove");
                break;
            case 'add':
                const num = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await sock.groupParticipantsUpdate(from, [num], "add");
                break;
            case 'promote':
                await sock.groupParticipantsUpdate(from, users, "promote");
                break;
            case 'demote':
                await sock.groupParticipantsUpdate(from, users, "demote");
                break;
        }
    } catch (e) {
        await sock.sendMessage(from, { text: '❌ Error: Asegúrate de que yo sea Admin y el número sea válido.' });
    }
};

