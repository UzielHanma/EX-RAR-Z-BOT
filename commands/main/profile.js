export const run = async (sock, from, user, sender) => {
    // Calculamos el progreso de nivel (ejemplo simple por ahora)
    const xpParaSiguiente = (user.level || 1) * 500;
    const progreso = user.xp ? Math.floor((user.xp / xpParaSiguiente) * 10) : 0;
    const barra = '🟩'.repeat(progreso) + '⬜'.repeat(10 - progreso);

    const profileMsg = `👤 *PERFIL DE USUARIO* 👤

✨ *Nombre:* @${sender.split('@')[0]}
🎟️ *Rango:* ${user.isPremium ? '⭐ PREMIUM' : '👤 Usuario Estándar'}
💖 *Pareja:* ${user.marry ? `@${user.marry.split('@')[0]}` : 'Soltero/a'}

💰 *ECONOMÍA*
🪙 *Monedas:* ${user.coins.toLocaleString()}
🏆 *Ranking:* (Usa .top para ver)

📊 *ESTADÍSTICAS*
🆙 *Nivel:* ${user.level || 1}
🧪 *XP:* ${user.xp || 0} / ${xpParaSiguiente}
[ ${barra} ]

🎒 *COLECCIÓN*
🧸 *Personajes:* ${user.inventory ? user.inventory.length : 0} obtenidos

☕ _Apoya el bot con .donar_`;

    return await sock.sendMessage(from, { 
        text: profileMsg, 
        mentions: [sender, user.marry].filter(Boolean) 
    });
};

