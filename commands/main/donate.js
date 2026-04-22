export const run = async (sock, from) => {
    const donateMsg = `🌟 *APOYA EL PROYECTO EX-RAR-Z* 🌟

¡Hola! Soy el desarrollador de **EX-RAR-Z-BOT**. Este proyecto está en fase **BETA** y mi meta es convertirlo en uno de los mejores bots de entretenimiento.

Para mantener el bot encendido 24/7 y mejorar la velocidad, necesitamos un servidor **VPS**. Si te gusta el bot, ¡puedes ayudarnos con una donación!

✨ *BENEFICIOS POR APOYAR:*
◈ Rol **PREMIUM** en el bot.
◈ Prioridad en sugerencias de nuevos personajes.
◈ Insignia especial en tu .profile (Próximamente).
◈ Ayudas a que el bot nunca se apague.

🔗 *DONAR AQUÍ:*
https://ko-fi.com/exrarzbotloader

_(Posdata: aún estoy en fases betas, así que no te sientas estafado si ves que voy poco, recibo con mucho gusto sugerencias)_`;

    // Enviamos el mensaje con una miniatura visual del link
    await sock.sendMessage(from, { 
        text: donateMsg,
        contextInfo: {
            externalAdReply: {
                title: "ExRarZ Bot - Support",
                body: "Apoya el desarrollo del bot aquí",
                sourceUrl: "https://ko-fi.com/exrarzbotloader",
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: false
            }
        }
    });
};

