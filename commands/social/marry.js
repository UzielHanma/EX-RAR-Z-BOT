export const run = async (sock, from, user, db, args, sender) => {
    const target = args[0]?.includes('@') ? args[0].replace('@', '') + '@s.whatsapp.net' : null;

    if (!target || target === sender) return await sock.sendMessage(from, { text: '❌ Menciona a quién le quieres proponer matrimonio.' });
    if (user.marry) return await sock.sendMessage(from, { text: '❌ ¡Ya estás casado! Divórciate primero con `.divorce`.' });

    const targetUser = db.data.users.find(u => u.id === target);
    if (!targetUser) return await sock.sendMessage(from, { text: '❌ Esa persona no está registrada en el bot.' });
    if (targetUser.marry) return await sock.sendMessage(from, { text: '❌ Esa persona ya está casada.' });

    // Por ahora es un matrimonio directo, luego podemos añadir sistema de aceptación
    user.marry = target;
    targetUser.marry = sender;
    await db.write();

    return await sock.sendMessage(from, { 
        text: `❤️ ¡FELICIDADES! ❤️\n\n@${sender.split('@')[0]} y @${target.split('@')[0]} ahora están felizmente casados.`,
        mentions: [sender, target]
    });
};

