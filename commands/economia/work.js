export const run = async (sock, from, user, db) => {
    const cooldown = 10 * 60 * 1000; // 10 minutos en milisegundos
    const ahora = Date.now();
    const tiempoPasado = ahora - (user.lastWork || 0);

    if (tiempoPasado < cooldown) {
        const restante = cooldown - tiempoPasado;
        const min = Math.floor(restante / (1000 * 60));
        const seg = Math.floor((restante % (1000 * 60)) / 1000);
        
        return await sock.sendMessage(from, { 
            text: `🛠️ Estás cansado... Regresa a trabajar en *${min}m ${seg}s*` 
        });
    }

    // Generar pago entre 1000 y 3000
    const pago = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
    
    // Frases aleatorias para darle sabor
    const empleos = [
        "Limpiaste el laboratorio del Dr. Gero",
        "Fuiste guardaespaldas de un comerciante en el Reino Clover",
        "Ayudaste a Ichigo a cazar Hollows",
        "Cocinaste con Sanji en el Baratie",
        "Entrenaste con Saitama (solo hiciste 10 flexiones)",
        "Entregaste paquetes con Rimuru Tempest"
    ];
    const frase = empleos[Math.floor(Math.random() * empleos.length)];

    user.coins += pago;
    user.lastWork = ahora; // Guardamos cuando trabajó
    await db.write();

    const mensaje = `💰 *¡PAGO RECIBIDO!* 💰\n\n📢 ${frase}\n💵 Ganaste: *${pago.toLocaleString()}* 🪙\n✨ Saldo total: *${user.coins.toLocaleString()}*`;

    return await sock.sendMessage(from, { text: mensaje });
};

