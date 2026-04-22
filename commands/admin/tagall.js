export const run = async (sock, from, args, msg) => {
    const metadata = await sock.groupMetadata(from);
    const users = metadata.participants.map(u => u.id);
    const mensaje = args.join(' ') || '¡Atención a todos! 📢';
    
    let texto = `📣 *INVOCACIÓN GENERAL* 📣\n\n📝 *Mensaje:* ${mensaje}\n\n`;
    for (let u of users) { texto += `• @${u.split('@')[0]}\n`; }

    await sock.sendMessage(from, { text: texto, mentions: users });
};

export const hidden = async (sock, from, args) => {
    const metadata = await sock.groupMetadata(from);
    const users = metadata.participants.map(u => u.id);
    const mensaje = args.join(' ') || 'Notificación importante 🔔';
    
    await sock.sendMessage(from, { text: mensaje, mentions: users });
};

