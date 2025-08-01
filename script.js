// Inisialisasi pemain
const player1 = {
    name: "Pemain 1",
    health: 100,
    attackPower: 10
};

const player2 = {
    name: "Pemain 2",
    health: 100,
    attackPower: 10
};

// Elemen DOM
const battleLog = document.getElementById("battle-log");
const attackBtn = document.getElementById("attack-btn");

// Fungsi untuk menyerang
function attack(attacker, defender) {
    const damage = Math.floor(Math.random() * attacker.attackPower) + 1;
    defender.health -= damage;
    const logEntry = document.createElement("div");
    logEntry.textContent = `${attacker.name} menyerang ${defender.name} dan menyebabkan ${damage} damage!`;
    battleLog.appendChild(logEntry);

    if (defender.health <= 0) {
        defender.health = 0;
        logEntry.textContent += ` ${defender.name} telah dikalahkan!`;
        attackBtn.disabled = true; // Menonaktifkan tombol serang setelah pertempuran selesai
    }
}

// Fungsi untuk memeriksa apakah pemain masih hidup
function isAlive(player) {
    return player.health > 0;
}

// Event listener untuk tombol serang
attackBtn.addEventListener("click", () => {
    if (isAlive(player1) && isAlive(player2)) {
        // Pemain 1 menyerang Pemain 2
        attack(player1, player2);

        // Jika Pemain 2 masih hidup, Pemain 2 menyerang balik
        if (isAlive(player2)) {
            attack(player2, player1);
        }
    }

    // Tampilkan status kesehatan pemain
    const statusEntry = document.createElement("div");
    statusEntry.textContent = `${player1.name}: ${player1.health} HP | ${player2.name}: ${player2.health} HP`;
    battleLog.appendChild(statusEntry);

    // Periksa apakah pertempuran sudah selesai
    if (!isAlive(player1)) {
        battleLog.appendChild(document.createElement("div")).textContent = `${player2.name} memenangkan pertempuran!`;
    } else if (!isAlive(player2)) {
        battleLog.appendChild(document.createElement("div")).textContent = `${player1.name} memenangkan pertempuran!`;
    }
});