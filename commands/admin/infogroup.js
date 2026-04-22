export const run = async (sock, from) => {
    const metadata = await sock.groupMetadata(from);
    const listAdmins = metadata.participants.filter(p => p.admin).map(a => `• @${a.id.split('@')[0]}`);
    
    const info = `🏘️ *INFO DEL GRUPO* 🏘️\n\n` +
                 `📛 *Nombre:* ${metadata.subject}\n` +
                 `🆔 *ID:* ${from}\n` +
                 `👥 *Miembros:* ${metadata.participants.length}\n` +
                 `👮 *Admins:* \n${listAdmins.join('\n')}\n\n` +
                 `📜 *Descripción:* \n${metadata.desc || 'Sin descripción'}`;

    await sock.sendMessage(from, { text: info, mentions: metadata.participants.filter(p => p.admin).map(a => a.id) });
};

