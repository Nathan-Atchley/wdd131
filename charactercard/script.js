const character = {
    name: "Valeros",
    class: "Fighter",
    level: 5,
    hp: 60,
    maxhp: 60,
    damage: 20,
    heal: 15,
    image: "https://i.pinimg.com/736x/d8/f7/df/d8f7df8ba6e145fff5e8cd1a57c1f349.jpg",
    attack: function() {
        enemy.hp -= this.damage;
        if (enemy.hp <= 0) {
            enemy.hp = 0;
            alert(enemy.name + " has been defeated!");
        }
    },
    healed: function() {
        this.hp += this.heal;
        if (this.hp > this.maxhp) {
            this.hp = this.maxhp;
        }
    },
    levelUp: function() {
        this.level += 1;
        this.hp += 12;
        this.maxhp += 12;
        this.damage += 5;
        this.heal += 3;
    }
}

const enemy = {
    name: "Chimera",
    class: "Monster",
    level: 5,
    hp: 47,
    maxhp: 47,
    damage: 20,
    heal: 15,
    image: "https://i.pinimg.com/1200x/36/7a/a5/367aa51ab7ec8d6467f08b1ee046a783.jpg",
    attack: function() {
        character.hp -= this.damage;
        if (character.hp <= 0) {
            character.hp = 0;
            alert(character.name + " has been defeated!");
        }
    },
    healed: function() {
        this.hp += this.heal;
        if (this.hp > this.maxhp) {
            this.hp = this.maxhp;
        }
    },
    levelUp: function() {
        this.level += 1;
        this.hp += 15;
        this.maxhp += 15;
        this.damage += 7;
        this.heal += 5;
    }
}

function updateCharacterCard() {
    document.getElementById("char-image").src = character.image;
    document.getElementById("char-image").alt = character.name;
    document.getElementById("char-name").textContent = character.name;
    document.getElementById("char-class").textContent = character.class;
    document.getElementById("char-level").textContent = character.level;
    document.getElementById("char-hp").textContent = character.hp;
    document.getElementById("char-maxhp").textContent = character.maxhp;
}

function updateEnemyCard() {
    document.getElementById("enemy-image").src = enemy.image;
    document.getElementById("enemy-image").alt = enemy.name;
    document.getElementById("enemy-name").textContent = enemy.name;
    document.getElementById("enemy-class").textContent = enemy.class;
    document.getElementById("enemy-level").textContent = enemy.level;
    document.getElementById("enemy-hp").textContent = enemy.hp;
    document.getElementById("enemy-maxhp").textContent = enemy.maxhp;
}

document.getElementById("btn-attack").addEventListener("click", function() {
    character.attack();
    updateCharacterCard();
    updateEnemyCard();
});

document.getElementById("btn-heal").addEventListener("click", function() {
    character.healed();
    updateCharacterCard();
});

document.getElementById("btn-level").addEventListener("click", function() {
    character.levelUp();
    updateCharacterCard();
});

document.getElementById("btn-attack2").addEventListener("click", function() {
    enemy.attack();
    updateCharacterCard();
    updateEnemyCard();
});

document.getElementById("btn-heal2").addEventListener("click", function() {
    enemy.healed();
    updateEnemyCard();
});

document.getElementById("btn-level2").addEventListener("click", function() {
    enemy.levelUp();
    updateEnemyCard();
});

updateCharacterCard();
updateEnemyCard();