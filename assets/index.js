const main = document.querySelector(".container .main");
const clicks = document.querySelector(".info .clicks .count");
const levels = document.querySelector(".info .lvl .count");
const mny = document.querySelector(".info .mny .count");
const resets = document.querySelector(".info .resets .count");
const shopBtn = document.querySelector(".secondary .buttons .shop");
const resBtn = document.querySelector(".secondary .buttons .reset");
const shopWin = document.querySelector(".container .shop-win");
const closBtn = document.querySelector(".container .shop-win .head .close");
const clickBtn = document.querySelector(
  ".container .shop-win .shop-menu table .group .click-rate"
);
const clickPrice = document.querySelector(
  ".container .shop-win .shop-menu table .click .price"
);

let count = localStorage.getItem("count")
  ? parseInt(localStorage.getItem("count"))
  : 0;
let level = localStorage.getItem("level")
  ? parseInt(localStorage.getItem("level"))
  : 0;
let exp = localStorage.getItem("exp")
  ? parseInt(localStorage.getItem("exp"))
  : 0;
let rate = localStorage.getItem("rate")
  ? parseInt(localStorage.getItem("rate"))
  : 1;
let money = localStorage.getItem("money")
  ? parseInt(localStorage.getItem("money"))
  : 0;
let resCount = localStorage.getItem("resets")
  ? parseInt(localStorage.getItem("resets"))
  : 0;
let items_to_reset = ["count", "level", "exp", "rate", "money"];

clicks.innerHTML = count.toLocaleString();
levels.innerHTML = level.toLocaleString();
mny.innerHTML = money.toLocaleString();
resets.innerHTML = resCount.toLocaleString();
clickBtn.innerHTML = `<i class='bx bxs-pointer' ></i> x${rate + 1}`;
clickPrice.innerHTML = `$${nextLvlMny(rate + 1).toLocaleString()}`;

function nextLvlExp(level) {
  return 100 * (level * level);
}

function nextLvlMny(rate) {
  return 10 * (rate * rate * rate);
}

function updateMoney(rate, lvl) {
  let calculation = 0.2 * Math.pow(count - rate + 1, 0.3) * Math.pow(lvl, 0.95);
  calculation = Math.max(1, Math.round(calculation));

  money += calculation * rate;
  localStorage.setItem("money", money);

  mny.innerHTML = money.toLocaleString();
}

function updateColor(level) {
  document.documentElement.classList.remove(
    "beginner",
    "intermediate",
    "experienced",
    "advanced",
    "expert"
  );
  document.documentElement.classList.remove(
    "beginner",
    "intermediate",
    "experienced",
    "advanced",
    "expert"
  );

  let className = "";
  if (level <= 15) className = "beginner";
  else if (level <= 30) className = "intermediate";
  else if (level <= 60) className = "experienced";
  else if (level <= 100) className = "advanced";
  else className = "expert";
  document.documentElement.classList.add(className);
}

function updateLevel() {
  while (exp >= nextLvlExp(level + 1)) {
    level++;
    localStorage.setItem("level", level);
    levels.innerHTML = level;
  }

  updateColor(level);
  updateBoxShadowBasedOnClass();
}

updateColor(level);

let touches = 0;

function handleClickOrTouch() {
  for (let i = 0; i < touches; i++) {
    exp += 5 * rate;
    count += rate;

    clicks.innerHTML = count.toLocaleString();
    localStorage.setItem("count", count);
    localStorage.setItem("exp", exp);
    updateLevel();
    updateMoney(rate, level);
  }
}

main.addEventListener("touchstart", (event) => {
  touches = event.touches.length;
  handleClickOrTouch();
});

main.addEventListener("click", () => {
  touches = 1;
  handleClickOrTouch();
});

clickBtn.addEventListener("click", () => {
  let balance = localStorage.getItem("money");
  if (balance < nextLvlMny(rate + 1)) {
    window.alert("Insufficient money!");
  } else {
    let updatedBal = balance - nextLvlMny(rate + 1);
    localStorage.setItem("money", updatedBal);
    rate++;
    localStorage.setItem("rate", rate);
    clickBtn.innerHTML = `<i class='bx bxs-pointer' ></i> x${rate + 1}`;
    clickPrice.innerHTML = nextLvlMny(rate + 1).toLocaleString();
    location.reload();
  }
});

resBtn.addEventListener("click", () => {
  let reset = parseInt(localStorage.getItem("resets")) || 0;
  let last_lvl = parseInt(localStorage.getItem("last_lvl")) || 0;
  let last_mny = parseInt(localStorage.getItem("money")) || 0;
  let last_rate = parseInt(localStorage.getItem("rate")) || 0;
  let next_bal =
    10 * Math.pow(count, 0.609) * Math.pow(level, 0.95) + last_mny / 2;

  if (
    localStorage.length === 0 ||
    (localStorage.length === 1 && localStorage.getItem("resets") !== null)
  ) {
    window.alert(
      "Nothing to reset here. Maybe spam some clicks before resetting!"
    );
    return;
  }

  if (last_lvl >= level) {
    window.alert(
      `You have to be at least level ${last_lvl + 1} to be able to reset!`
    );
    return;
  }

  let confirmReset = window.prompt("Type 'RESET' to confirm.");
  if (confirmReset !== "RESET") {
    window.alert("Reset canceled!");
    return;
  }

  items_to_reset.forEach((item) => localStorage.removeItem(item));

  localStorage.setItem("last_lvl", level);
  localStorage.setItem("resets", reset + 1);
  localStorage.setItem("money", Math.round(next_bal));
  localStorage.setItem("rate", Math.round(last_rate / 2));

  resets.innerHTML = (reset + 1).toLocaleString();
  location.reload();
});

closBtn.addEventListener("click", () => {
  shopWin.style.display = "none";
});

shopBtn.addEventListener("click", () => {
  shopWin.style.display = "flex";
  clickPrice.innerHTML = `$${nextLvlMny(rate + 1).toLocaleString()}`;
});

function updateBoxShadowBasedOnClass() {
  const classList = document.documentElement.classList;
  const beginnerShadow = "0 0 15px rgba(139, 195, 74, 0.6)";
  const intermediateShadow = "0 0 15px rgba(255, 235, 59, 0.6)";
  const experiencedShadow = "0 0 15px rgba(255, 193, 7, 0.6)";
  const advancedShadow = "0 0 15px rgba(187, 140, 1, 0.6)";
  const expertShadow = "0 0 15px rgba(156, 95, 255, 0.6)";

  if (classList.contains("beginner")) {
    document.querySelector(".profile").style.boxShadow = beginnerShadow;
    document.querySelector(".profile .picture").style.boxShadow =
      beginnerShadow;
    document.querySelectorAll(".buttons button").forEach((button) => {
      button.style.boxShadow = beginnerShadow;
    });
    document.querySelector(".shop-win .shop-menu").style.boxShadow =
      beginnerShadow;
    document.querySelector(".shop-menu .head").style.boxShadow = beginnerShadow;
    document.querySelector(".shop-menu .primary").style.boxShadow =
      beginnerShadow;
    document.querySelectorAll(".group button").forEach((button) => {
      button.style.boxShadow = beginnerShadow;
    });
  } else if (classList.contains("intermediate")) {
    document.querySelector(".profile").style.boxShadow = intermediateShadow;
    document.querySelector(".profile .picture").style.boxShadow =
      intermediateShadow;
    document.querySelectorAll(".buttons button").forEach((button) => {
      button.style.boxShadow = intermediateShadow;
    });
    document.querySelector(".shop-win .shop-menu").style.boxShadow =
      intermediateShadow;
    document.querySelector(".shop-menu .head").style.boxShadow =
      intermediateShadow;
    document.querySelector(".shop-menu .primary").style.boxShadow =
      intermediateShadow;
    document.querySelectorAll(".group button").forEach((button) => {
      button.style.boxShadow = intermediateShadow;
    });
  } else if (classList.contains("experienced")) {
    document.querySelector(".profile").style.boxShadow = experiencedShadow;
    document.querySelector(".profile .picture").style.boxShadow =
      experiencedShadow;
    document.querySelectorAll(".buttons button").forEach((button) => {
      button.style.boxShadow = experiencedShadow;
    });
    document.querySelector(".shop-win .shop-menu").style.boxShadow =
      experiencedShadow;
    document.querySelector(".shop-menu .head").style.boxShadow =
      experiencedShadow;
    document.querySelector(".shop-menu .primary").style.boxShadow =
      experiencedShadow;
    document.querySelectorAll(".group button").forEach((button) => {
      button.style.boxShadow = experiencedShadow;
    });
  } else if (classList.contains("advanced")) {
    // Applying box-shadow for all relevant elements
    document.querySelector(".profile").style.boxShadow = advancedShadow;
    document.querySelector(".profile .picture").style.boxShadow =
      advancedShadow;
    document.querySelectorAll(".buttons button").forEach((button) => {
      button.style.boxShadow = advancedShadow;
    });
    document.querySelector(".shop-win .shop-menu").style.boxShadow =
      advancedShadow;
    document.querySelector(".shop-menu .head").style.boxShadow = advancedShadow;
    document.querySelector(".shop-menu .primary").style.boxShadow =
      advancedShadow;
    document.querySelectorAll(".group button").forEach((button) => {
      button.style.boxShadow = advancedShadow;
    });
  } else if (classList.contains("expert")) {
    // Applying box-shadow for all relevant elements
    document.querySelector(".profile").style.boxShadow = expertShadow;
    document.querySelector(".profile .picture").style.boxShadow = expertShadow;
    document.querySelectorAll(".buttons button").forEach((button) => {
      button.style.boxShadow = expertShadow;
    });
    document.querySelector(".shop-win .shop-menu").style.boxShadow =
      expertShadow;
    document.querySelector(".shop-menu .head").style.boxShadow = expertShadow;
    document.querySelector(".shop-menu .primary").style.boxShadow =
      expertShadow;
    document.querySelectorAll(".group button").forEach((button) => {
      button.style.boxShadow = expertShadow;
    });
  }
}
updateBoxShadowBasedOnClass();

// ChatGpt Generated //

const fileInput = document.getElementById("file-input");
const profilePicture = document.getElementById("profile-picture");

// Check if there's a saved image in localStorage and apply it
const savedImage = localStorage.getItem("profileImage");
if (savedImage) {
  profilePicture.style.backgroundImage = `url(${savedImage})`;
}

// Function to resize the image before saving it
function resizeImage(file, maxWidth = 300, maxHeight = 300) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (event) {
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);

    img.onload = function () {
      // Create a canvas to resize the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Calculate new dimensions
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }

      // Resize the image on the canvas
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the resized image to a Data URL
      const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.7); // 0.7 is the quality (0 to 1)
      resolve(resizedDataUrl);
    };

    img.onerror = reject;
  });
}

// Listen for changes on the file input
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    resizeImage(file)
      .then((resizedDataUrl) => {
        // Set the background image of the profile picture
        profilePicture.style.backgroundImage = `url(${resizedDataUrl})`;

        // Store the image in localStorage
        localStorage.setItem("profileImage", resizedDataUrl);
      })
      .catch((err) => {
        console.error("Image resize error:", err);
      });
  }
});
