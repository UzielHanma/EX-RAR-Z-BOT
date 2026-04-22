export const run = async (sock, from, user) => {
    if (!user.inventory || user.inventory.length === 0) {
        return await sock.sendMessage(from, { text: '❌ Tu harem está vacío. ¡Usa .gacha para empezar tu colección!' });
    }

    // Agrupamos personajes repetidos para una vista limpia
    const counts = {};
    user.inventory.forEach(char => {
        counts[char.name] = (counts[char.name] || 0) + 1;
    });

    let haremMsg = `💖 *TU HAREM PERSONAL* 💖\n`;
    haremMsg += `_Coleccionista: @${user.id.split('@')[0]}_\n\n`;

    for (const name in counts) {
        haremMsg += `• ${name} (x${counts[name]})\n`;
    }

    haremMsg += `\n✨ Total de personajes: *${user.inventory.length}*`;

    return await sock.sendMessage(from, { 
        text: haremMsg, 
        mentions: [user.id] 
    });
};

