// Usaremos la versión dinámica de LowDB para compatibilidad total
async function initDB() {
    const { JSONFilePreset } = await import('lowdb/node');
    
    // Define la estructura inicial de tu "Universo Anime"
    const defaultData = { 
        users: [], 
        gacha_items: [
            { id: 1, name: "Naruto Uzumaki", rarity: "SR" },
            { id: 2, name: "Goku", rarity: "SSR" },
            { id: 3, name: "Rimuru Tempest", rarity: "SSR" }
        ] 
    };
    
    const db = await JSONFilePreset('db.json', defaultData);
    return db;
}

module.exports = { initDB };

