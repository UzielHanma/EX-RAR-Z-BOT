export const run = async (sock, from, user, db, args) => {
    const mentioned = args[0]?.includes('@') ? args[0].replace('@', '') + '@s.whatsapp.net' : null;
    const charName = args.slice(1).join(' ');

    if (!mentioned || !charName) return await sock.sendMessage(from, { text: '❌ Uso: `.trade @usuario Nombre del Personaje`' });

    const charIndex = user.inventory.findIndex(c => c.name.toLowerCase() === charName.toLowerCase());
    if (charIndex === -1) return await sock.sendMessage(from, { text: `❌ No tienes a "${charName}" en tu harem.` });

    const targetUser = db.data.users.find(u => u.id === mentioned);
    if (!targetUser) return await sock.sendMessage(from, { text: '❌ El destinatario no está registrado.' });

    // Transferir
    const [character] = user.inventory.splice(charIndex, 1);
    targetUser.inventory.push(character);
    await db.write();

    return await sock.sendMessage(from, { 
        text: `🔄 *INTERCAMBIO EXITOSO*\n\nHas enviado a *${character.name}* a @${mentioned.split('@')[0]}.`,
        mentions: [mentioned]
    });
};

