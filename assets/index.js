const main = document.querySelector(".container .main");
const clicks = document.querySelector(".info .clicks .count");
const levels = document.querySelector(".info .lvl .count");

let count = localStorage.getItem("count") ? parseInt(localStorage.getItem("count")) : 0;
let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;
let exp = localStorage.getItem("exp") ? parseInt(localStorage.getItem("exp")) : 0;

clicks.innerHTML = count;
levels.innerHTML = level;

function nextLvlExp(level) {
    return 100 * (level * level);
}

function updateColor(level) {
    clicks.classList.remove("beginner", "intermediate", "experienced", "advanced", "expert");
    levels.classList.remove("beginner", "intermediate", "experienced", "advanced", "expert");
    
    if (level <= 5) {
        document.documentElement.classList.add("beginner")
    } else if (level <= 10) {
        document.documentElement.classList.add("intermediate")
    } else if (level <= 15) {
        document.documentElement.classList.add("experienced")
    } else if (level <= 20) {
        document.documentElement.classList.add("advanced")
    } else {
        document.documentElement.classList.add("expert")
    }
}

function updateLevel() {
    while (exp >= nextLvlExp(level + 1)) {
        level++;
        localStorage.setItem("level", level);
        levels.innerHTML = level;
    }

    updateColor(level);
}
updateColor(level);
main.addEventListener("click", () => {
    exp += 5;
    count++;

    clicks.innerHTML = count;
    localStorage.setItem("count", count);
    localStorage.setItem("exp", exp);
    updateLevel();
});
