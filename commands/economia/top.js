export const run = async (sock, from, db) => {
    // Ordenamos usuarios de mayor a menor cantidad de monedas
    const topUsers = [...db.data.users]
        .sort((a, b) => b.coins - a.coins)
        .slice(0, 10);

    let topMsg = `🏆 *RANKING DE RIQUEZA* 🏆\n`;
    topMsg += `_Los 10 usuarios más poderosos_\n\n`;

    topUsers.forEach((u, i) => {
        const corona = i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : '👤';
        topMsg += `${corona} *${i + 1}.* @${u.id.split('@')[0]}\n      💰 *${u.coins.toLocaleString()}* 🪙\n\n`;
    });

    return await sock.sendMessage(from, { 
        text: topMsg, 
        mentions: topUsers.map(u => u.id) 
    });
};

