export const run = async (sock, from) => {
    const menu = `✨ *EX-RAR-Z-BOT: MENÚ* ✨
╔══════════════════╗
  📑 *PRINCIPALES*
╠══════════════════╝
  ◈ .help / .ping / .daily
╔══════════════════╗
  💎 *GACHA*
╠══════════════════╝
  ◈ .gacha / .harem / .inv
╔══════════════════╗
  💰 *ECONOMÍA*
╠══════════════════╝
  ◈ .rt <color> <monto> / .top / .coins
╚══════════════════╝
_Desarrollado por: [Uziel/EXrarZ]_`;
    return await sock.sendMessage(from, { text: menu });
};

