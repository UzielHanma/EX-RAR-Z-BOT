export const run = async (sock, from, user, db, args, sender) => {
    const amount = parseInt(args[1]);
    const mentioned = args[0]?.includes('@') ? args[0].replace('@', '') + '@s.whatsapp.net' : null;

    if (!mentioned || isNaN(amount) || amount <= 0) {
        return await sock.sendMessage(from, { text: '❌ Uso correcto: `.pay @usuario 500`' });
    }

    if (user.coins < amount) {
        return await sock.sendMessage(from, { text: '❌ No tienes suficientes monedas para regalar.' });
    }

    // Buscamos al receptor en la base de datos
    const targetUser = db.data.users.find(u => u.id === mentioned);

    if (!targetUser) {
        return await sock.sendMessage(from, { text: '❌ El usuario no está registrado en mi base de datos.' });
    }

    // Realizamos la transferencia
    user.coins -= amount;
    targetUser.coins += amount;
    await db.write();

    return await sock.sendMessage(from, { 
        text: `✅ ¡Transferencia exitosa!\n\nDe: @${sender.split('@')[0]}\nPara: @${mentioned.split('@')[0]}\nMonto: *${amount.toLocaleString()}* 🪙`,
        mentions: [sender, mentioned]
    });
};

