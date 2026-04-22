export const run = async (sock, from, args) => {
    const action = args[0]?.toLowerCase();
    if (action === 'abrir' || action === 'open') {
        await sock.groupSettingUpdate(from, 'not_announcement');
        await sock.sendMessage(from, { text: '🔓 Grupo abierto. ¡Todos pueden comentar!' });
    } else if (action === 'cerrar' || action === 'close') {
        await sock.groupSettingUpdate(from, 'announcement');
        await sock.sendMessage(from, { text: '🔒 Grupo cerrado. Solo admins pueden comentar.' });
    } else {
        await sock.sendMessage(from, { text: '❓ Usa: `.group abrir` o `.group cerrar`' });
    }
};

export const config = async (sock, from, command, args, db) => {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: `📝 Escribe el mensaje para: ${command}` });
    
    // Guardamos en la DB (Asegúrate de tener db.data.groups = [])
    if (!db.data.groups) db.data.groups = {};
    if (!db.data.groups[from]) db.data.groups[from] = {};
    
    db.data.groups[from][command] = text;
    await db.write();
    await sock.sendMessage(from, { text: `✅ Mensaje de ${command} configurado con éxito.` });
};

