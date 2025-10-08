<<<<<<< HEAD
let progress = 0;
let bar = document.querySelector('.bar');

// LOADING
let loading = setInterval(() => {
  progress += 10;
  bar.style.width = progress + "%";
  if (progress >= 100) {
    clearInterval(loading);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('passwordScreen').style.display = 'flex';
  }
}, 300);

// PASSWORD
function checkPassword() {
  const input = document.getElementById('pwInput').value;
  if (input === "07102025") {
  document.getElementById('passwordScreen').style.display = 'none';
  document.getElementById('home').style.display = 'block';
  document.body.style.overflow = 'auto';
  toggleMusic(); // mulai lagu otomatis
}
 else {
    alert("Wrong password 😭");
  }
}

// MODAL
function openModal(id) {
  document.getElementById('modal' + id).style.display = 'flex';
  if (id === 2) setupGame();
}

function closeModal(id) {
  document.getElementById('modal' + id).style.display = 'none';
}

// ANIMASI DAUN
window.addEventListener('load', () => {
  const home = document.getElementById('home');
  for (let i = 0; i < 15; i++) {
    let leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = (8 + Math.random() * 5) + 's';
    leaf.style.width = (20 + Math.random() * 30) + 'px';
    leaf.style.height = leaf.style.width;
    leaf.style.animationDelay = Math.random() * 5 + 's';
    home.appendChild(leaf);
  }
});

// === MINI GAME BARU ===
let gridSize, correctIndex, score, timer, timeLeft, gameRunning;

function setupGame() {
  const modal = document.querySelector("#modal2 .modal-content");
  const canvas = document.getElementById("gameCanvas");
  canvas.style.display = "none";

  const existingGrid = document.getElementById("gameGrid");
  if (existingGrid) existingGrid.remove();

  const existingTimer = document.getElementById("timer");
  if (existingTimer) existingTimer.remove();

  const timerText = document.createElement("div");
  timerText.id = "timer";
  timerText.style.marginTop = "5px";
  timerText.style.fontWeight = "700";
  timerText.style.color = "#C15E5E";
  modal.insertBefore(timerText, document.getElementById("score"));

  const grid = document.createElement("div");
  grid.id = "gameGrid";
  grid.style.display = "grid";
  grid.style.placeItems = "center";
  grid.style.justifyContent = "center";
  grid.style.alignItems = "center";
  grid.style.gap = "8px";
  grid.style.marginTop = "15px";
  grid.style.width = "100%";
  grid.style.maxWidth = "350px";
  grid.style.marginInline = "auto";
  modal.appendChild(grid);

  const playBtn = modal.querySelector("button.play");
  if (!playBtn) {
    const newPlayBtn = document.createElement("button");
    newPlayBtn.innerText = "▶️ Play";
    newPlayBtn.className = "close play";
    newPlayBtn.style.marginTop = "10px";
    newPlayBtn.onclick = startGame;
    modal.appendChild(newPlayBtn);
  }

  document.getElementById("score").innerText = "Press Play to Start 🎮";
}

function startGame() {
  score = 0;
  gridSize = 3;
  gameRunning = true;
  document.getElementById("score").innerText = "Score: 0";
  generateGrid();
}

function generateGrid() {
  if (!gameRunning) return;

  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

  const totalBoxes = gridSize * gridSize;
  correctIndex = Math.floor(Math.random() * totalBoxes);

  const columnCount = Math.ceil(Math.sqrt(totalBoxes));
  grid.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");
    box.style.aspectRatio = "1 / 1";
    box.style.borderRadius = "10px";
    box.style.cursor = "pointer";
    box.style.transition = "transform 0.2s";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.background = "var(--white)";
    box.style.boxShadow = "0 3px 6px rgba(0,0,0,0.1)";

    const img = document.createElement("img");
    img.src = i === correctIndex ? "img/chibi.png" : "img/obstacle.png";
    img.style.width = "70%";
    img.style.height = "70%";
    img.style.objectFit = "contain";
    img.style.borderRadius = "8px";
    box.appendChild(img);

    box.onclick = () => handleChoice(i, box);
    box.onmouseenter = () => (box.style.transform = "scale(1.05)");
    box.onmouseleave = () => (box.style.transform = "scale(1)");
    grid.appendChild(box);
  }

  // timer per stage
  resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 5;
  const timerText = document.getElementById("timer");
  timerText.innerText = "⏳ Time: " + timeLeft + "s";

  timer = setInterval(() => {
    timeLeft--;
    timerText.innerText = "⏳ Time: " + timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver("Waktu habis 😭");
    }
  }, 1000);
}

function handleChoice(index, box) {
  if (!gameRunning) return;

  if (index === correctIndex) {
    clearInterval(timer);
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;

    if (score >= 100) {
      endGame();
      return;
    }

    // tambah kotak di stage berikutnya
    gridSize = Math.min(8, gridSize + 1);
    generateGrid();
  } else {
    clearInterval(timer);
    gameOver("Salah pilih 😭");
  }
}

function gameOver(reason) {
  gameRunning = false;
  document.getElementById("score").innerText = `${reason} (Score: ${score})`;
}

function endGame() {
  clearInterval(timer);
  gameRunning = false;
  const modal = document.querySelector("#modal2 .modal-content");
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

  document.getElementById("score").innerText = "🎉 Score: 100";
  document.getElementById("timer").innerText = "";

  const rewardDiv = document.createElement("div");
  rewardDiv.style.textAlign = "center";
  rewardDiv.style.marginTop = "10px";

  const img = document.createElement("img");
  img.src = "img/photo7.jpeg";
  img.style.width = "120px";
  img.style.borderRadius = "10px";
  img.style.marginBottom = "10px";

  const text = document.createElement("p");
  text.style.color = "#C15E5E";
  text.style.fontWeight = "700";
  text.innerText = "YEY YOU DID IT! 🎉\nHADIAHNYA SOON YA ADA DI WEBSITE SINI JUGA XIXI STAY TUNE 💕";

  rewardDiv.appendChild(img);
  rewardDiv.appendChild(text);
  modal.appendChild(rewardDiv);
}

// MUSIC PLAYER
let isPlaying = false;
const music = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');

function toggleMusic() {
  if (!isPlaying) {
    music.play();
    playBtn.textContent = "⏸️ Pause Music";
  } else {
    music.pause();
    playBtn.textContent = "🎵 Play Music";
  }
  isPlaying = !isPlaying;
}


for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");
    box.className = "card";

    // Kalau card belum unlock
    if (i > maxAvailableIndex) { // misal 1 atau 2 card pertama unlock
        box.classList.add("locked");
    }

    // img
    const img = document.createElement("img");
    img.src = i === correctIndex ? "img/chibi.png" : "img/obstacle.png";
    box.appendChild(img);

    // Hanya card unlock bisa diklik
    if (!box.classList.contains("locked")) {
        box.onclick = () => handleChoice(i, box);
    }

    grid.appendChild(box);
}
=======
let progress = 0;
let bar = document.querySelector('.bar');

// LOADING
let loading = setInterval(() => {
  progress += 10;
  bar.style.width = progress + "%";
  if (progress >= 100) {
    clearInterval(loading);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('passwordScreen').style.display = 'flex';
  }
}, 300);

// PASSWORD
function checkPassword() {
  const input = document.getElementById('pwInput').value;
  if (input === "07102025") {
  document.getElementById('passwordScreen').style.display = 'none';
  document.getElementById('home').style.display = 'block';
  document.body.style.overflow = 'auto';
  toggleMusic(); // mulai lagu otomatis
}
 else {
    alert("Wrong password 😭");
  }
}

// MODAL
function openModal(id) {
  document.getElementById('modal' + id).style.display = 'flex';
  if (id === 2) setupGame();
}

function closeModal(id) {
  document.getElementById('modal' + id).style.display = 'none';
}

// ANIMASI DAUN
window.addEventListener('load', () => {
  const home = document.getElementById('home');
  for (let i = 0; i < 15; i++) {
    let leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = (8 + Math.random() * 5) + 's';
    leaf.style.width = (20 + Math.random() * 30) + 'px';
    leaf.style.height = leaf.style.width;
    leaf.style.animationDelay = Math.random() * 5 + 's';
    home.appendChild(leaf);
  }
});

// === MINI GAME BARU ===
let gridSize, correctIndex, score, timer, timeLeft, gameRunning;

function setupGame() {
  const modal = document.querySelector("#modal2 .modal-content");
  const canvas = document.getElementById("gameCanvas");
  canvas.style.display = "none";

  const existingGrid = document.getElementById("gameGrid");
  if (existingGrid) existingGrid.remove();

  const existingTimer = document.getElementById("timer");
  if (existingTimer) existingTimer.remove();

  const timerText = document.createElement("div");
  timerText.id = "timer";
  timerText.style.marginTop = "5px";
  timerText.style.fontWeight = "700";
  timerText.style.color = "#C15E5E";
  modal.insertBefore(timerText, document.getElementById("score"));

  const grid = document.createElement("div");
  grid.id = "gameGrid";
  grid.style.display = "grid";
  grid.style.placeItems = "center";
  grid.style.justifyContent = "center";
  grid.style.alignItems = "center";
  grid.style.gap = "8px";
  grid.style.marginTop = "15px";
  grid.style.width = "100%";
  grid.style.maxWidth = "350px";
  grid.style.marginInline = "auto";
  modal.appendChild(grid);

  const playBtn = modal.querySelector("button.play");
  if (!playBtn) {
    const newPlayBtn = document.createElement("button");
    newPlayBtn.innerText = "▶️ Play";
    newPlayBtn.className = "close play";
    newPlayBtn.style.marginTop = "10px";
    newPlayBtn.onclick = startGame;
    modal.appendChild(newPlayBtn);
  }

  document.getElementById("score").innerText = "Press Play to Start 🎮";
}

function startGame() {
  score = 0;
  gridSize = 3;
  gameRunning = true;
  document.getElementById("score").innerText = "Score: 0";
  generateGrid();
}

function generateGrid() {
  if (!gameRunning) return;

  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

  const totalBoxes = gridSize * gridSize;
  correctIndex = Math.floor(Math.random() * totalBoxes);

  const columnCount = Math.ceil(Math.sqrt(totalBoxes));
  grid.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");
    box.style.aspectRatio = "1 / 1";
    box.style.borderRadius = "10px";
    box.style.cursor = "pointer";
    box.style.transition = "transform 0.2s";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.background = "var(--white)";
    box.style.boxShadow = "0 3px 6px rgba(0,0,0,0.1)";

    const img = document.createElement("img");
    img.src = i === correctIndex ? "img/chibi.png" : "img/obstacle.png";
    img.style.width = "70%";
    img.style.height = "70%";
    img.style.objectFit = "contain";
    img.style.borderRadius = "8px";
    box.appendChild(img);

    box.onclick = () => handleChoice(i, box);
    box.onmouseenter = () => (box.style.transform = "scale(1.05)");
    box.onmouseleave = () => (box.style.transform = "scale(1)");
    grid.appendChild(box);
  }

  // timer per stage
  resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 5;
  const timerText = document.getElementById("timer");
  timerText.innerText = "⏳ Time: " + timeLeft + "s";

  timer = setInterval(() => {
    timeLeft--;
    timerText.innerText = "⏳ Time: " + timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver("Waktu habis 😭");
    }
  }, 1000);
}

function handleChoice(index, box) {
  if (!gameRunning) return;

  if (index === correctIndex) {
    clearInterval(timer);
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;

    if (score >= 100) {
      endGame();
      return;
    }

    // tambah kotak di stage berikutnya
    gridSize = Math.min(8, gridSize + 1);
    generateGrid();
  } else {
    clearInterval(timer);
    gameOver("Salah pilih 😭");
  }
}

function gameOver(reason) {
  gameRunning = false;
  document.getElementById("score").innerText = `${reason} (Score: ${score})`;
}

function endGame() {
  clearInterval(timer);
  gameRunning = false;
  const modal = document.querySelector("#modal2 .modal-content");
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";

  document.getElementById("score").innerText = "🎉 Score: 100";
  document.getElementById("timer").innerText = "";

  const rewardDiv = document.createElement("div");
  rewardDiv.style.textAlign = "center";
  rewardDiv.style.marginTop = "10px";

  const img = document.createElement("img");
  img.src = "img/photo7.jpeg";
  img.style.width = "120px";
  img.style.borderRadius = "10px";
  img.style.marginBottom = "10px";

  const text = document.createElement("p");
  text.style.color = "#C15E5E";
  text.style.fontWeight = "700";
  text.innerText = "YEY YOU DID IT! 🎉\nHADIAHNYA SOON YA ADA DI WEBSITE SINI JUGA XIXI STAY TUNE 💕";

  rewardDiv.appendChild(img);
  rewardDiv.appendChild(text);
  modal.appendChild(rewardDiv);
}

// MUSIC PLAYER
let isPlaying = false;
const music = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');

function toggleMusic() {
  if (!isPlaying) {
    music.play();
    playBtn.textContent = "⏸️ Pause Music";
  } else {
    music.pause();
    playBtn.textContent = "🎵 Play Music";
  }
  isPlaying = !isPlaying;
}


for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");
    box.className = "card";

    // Kalau card belum unlock
    if (i > maxAvailableIndex) { // misal 1 atau 2 card pertama unlock
        box.classList.add("locked");
    }

    // img
    const img = document.createElement("img");
    img.src = i === correctIndex ? "img/chibi.png" : "img/obstacle.png";
    box.appendChild(img);

    // Hanya card unlock bisa diklik
    if (!box.classList.contains("locked")) {
        box.onclick = () => handleChoice(i, box);
    }

    grid.appendChild(box);
}
>>>>>>> c687f43b1bbaadef85c20a781996e19fac1673f0
