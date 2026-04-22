import { rollGacha } from '../../gacha.js';

export const run = async (sock, from, user, db) => {
    const cost = 50;
    if (user.coins < cost) return await sock.sendMessage(from, { text: '❌ Monedas insuficientes.' });

    const reward = rollGacha();
    user.coins -= cost;
    user.inventory.push({ name: reward.name, series: reward.series });
    await db.write();

    const textoGacha = `🎰 | *GACHA PULL*\n\n🌟 Ganaste: *${reward.name}*\n📺 Serie: *${reward.series}*\n💰 Saldo: ${user.coins.toLocaleString()} 🪙`;

    if (reward.image) {
        return await sock.sendMessage(from, { 
            image: { url: reward.image }, 
            caption: textoGacha 
        });
    } else {
        return await sock.sendMessage(from, { text: textoGacha });
    }
};

