export const run = async (sock, from) => {
    const menu = `✨ *EX-RAR-Z-BOT* ✨

📑 *INFORMACIÓN*
#menu
#profile
#ping
#donar
#rank
#lvl

👮 *ADMINISTRACIÓN*
#kick
#add
#gp
#promote
#demote
#group
#tagall
#hidetag
#warn
#unwarn
#link
#setwelcome

💰 *ECONOMÍA*
#work
#daily
#rob
#pay
#crime
#coins
#rt
#top

💎 *GACHA & SOCIAL*
#gacha
#harem
#inv
#trade
#marry
#divorce

───────────────
_Versión: 2.1.0 Beta_
_Creado por: Uziel/EXrarZ_`;

    try {
        await sock.sendMessage(from, { text: menu });
    } catch (err) {
        console.error("Error al enviar el menú:", err);
    }
};

