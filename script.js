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
  } else {
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

   // Stop mini game 3
  if(id === 3) {
    clearInterval(timer3); // hentikan timer
    questionImg3.style.display = 'none';
    answerInput3.style.display = 'none';
    submitBtn3.style.display = 'none';
    startBtn3.style.display = 'block'; // reset tombol start
    timerDiv3.innerText = "";
    scoreDiv3.innerText = "Score: 0";
    currentQ3 = 0;
    score3 = 0;
    answerInput3.value = "";
  }
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

  //document.getElementById("score").innerText = "🎉 Score: 100";
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

// ==== GAME 3 FINAL ====
const startBtn3 = document.getElementById('startGame3Btn');
const questionImg3 = document.getElementById('questionImage3');
const answerInput3 = document.getElementById('answerInput3');
const submitBtn3 = document.getElementById('submitAnswer3Btn');
const timerDiv3 = document.getElementById('timer3');
const scoreDiv3 = document.getElementById('score3');
const container3 = document.getElementById("game3Container");

let currentQ3 = 0;
let score3 = 0;
let timer3;
let timeLeft3;
let gameRunning3 = false;

const questions3 = [
  {img: "img/soal1.jpg", answer: "ayaka"},
  {img: "img/soal2.jpg", answer: "nilou"},
  {img: "img/soal3.jpg", answer: "keqing"},
  {img: "img/soal4.jpg", answer: "ganyu"},
  {img: "img/soal5.jpg", answer: "clorinde"},
  {img: "img/soal6.jpg", answer: "navia"},
  {img: "img/soal7.jpg", answer: "mualani"},
  {img: "img/soal8.jpg", answer: "citlali"},
  {img: "img/soal9.jpg", answer: "yae miko"},
  {img: "img/soal10.jpg", answer: "xiangling"}
];

// RESET GAME SEBELUM MULAI
function resetGame3(message) {
  clearInterval(timer3);
  gameRunning3 = false;

  // hide elemen game
  questionImg3.style.display = 'none';
  answerInput3.style.display = 'none';
  submitBtn3.style.display = 'none';
  startBtn3.style.display = 'block';
  timerDiv3.innerText = "";

  // hapus reward lama kalau ada
  const oldReward = document.getElementById("rewardDiv3");
  if(oldReward) oldReward.remove();

  // buat card di web kalau ada skor
  if(score3 > 0){
    const rewardCard = document.createElement("div");
    rewardCard.id = "rewardDiv3";
    rewardCard.style.border = "2px solid #C15E5E";
    rewardCard.style.borderRadius = "12px";
    rewardCard.style.padding = "15px";
    rewardCard.style.marginTop = "15px";
    rewardCard.style.textAlign = "center";
    rewardCard.style.background = "#FFF8F8";
    rewardCard.style.maxWidth = "250px";
    rewardCard.style.marginInline = "auto";

    const img = document.createElement("img");
    img.src = "img/photo8.jpg"; 
    img.style.width = "120px";
    img.style.borderRadius = "10px";
    img.style.marginBottom = "10px";

    const text = document.createElement("p");
    text.innerText = `YEYY SELAMAT KAKAK selesai dengan skor: ${score3}!\nHadiah spesial buat kakak Elan : `;
    text.style.color = "#C15E5E";
    text.style.fontWeight = "700";

    rewardCard.appendChild(img);
    rewardCard.appendChild(text);
    container3.appendChild(rewardCard);
  }

  // reset skor & index
  score3 = 0;
  currentQ3 = 0;
  answerInput3.value = "";
  scoreDiv3.innerText = message || "Score: 0";
}


// MULAI GAME
startBtn3.addEventListener('click', () => {
  startBtn3.style.display = 'none';
  questionImg3.style.display = 'block';
  answerInput3.style.display = 'block';
  submitBtn3.style.display = 'block';
  scoreDiv3.innerText = `Score: 0`;
  gameRunning3 = true;
  currentQ3 = 0;
  score3 = 0;
  showQuestion3();
});

// TAMPILKAN SOAL
function showQuestion3() {
  if(!gameRunning3) return;

  if(currentQ3 >= questions3.length){
    gameEnd3();
    return;
  }

  questionImg3.src = questions3[currentQ3].img;
  answerInput3.value = "";
  startTimer3();
}

// TIMER PER SOAL
function startTimer3() {
  clearInterval(timer3);
  timeLeft3 = 5;
  timerDiv3.innerText = `⏳ Time: ${timeLeft3}s`;

  timer3 = setInterval(() => {
    if(!gameRunning3) { clearInterval(timer3); return; }

    timeLeft3--;
    timerDiv3.innerText = `⏳ Time: ${timeLeft3}s`;

    if(timeLeft3 <= 0){
      clearInterval(timer3);
      resetGame3("⏰ Waktu habis 😭 Klik ▶️ Play untuk ulang!");
    }
  }, 1000);
}

// SUBMIT JAWABAN
submitBtn3.addEventListener('click', () => {
  if(!gameRunning3) return;

  clearInterval(timer3);
  const answer = answerInput3.value.trim().toLowerCase();

  if(answer === questions3[currentQ3].answer.toLowerCase()){
    score3 += 10;
    scoreDiv3.innerText = `Score: ${score3}`;
    currentQ3++;
    showQuestion3();
  } else {
    resetGame3("Jawaban salah 😭 Klik ▶️ Play untuk ulang!");
  }
});

// GAME SELESAI → TAMPILKAN HADIAH + SKOR
function gameEnd3() {
  gameRunning3 = false;

  // hide semua elemen game
  questionImg3.style.display = 'none';
  answerInput3.style.display = 'none';
  submitBtn3.style.display = 'none';
  timerDiv3.innerText = "";
  startBtn3.style.display = 'none';

  // hapus reward lama kalau ada
  const oldReward = document.getElementById("rewardDiv3");
  if(oldReward) oldReward.remove();

  // buat reward baru
  const rewardDiv = document.createElement("div");
  rewardDiv.id = "rewardDiv3";
  rewardDiv.style.textAlign = "center";
  rewardDiv.style.marginTop = "10px";

  const img = document.createElement("img");
  img.src = "img/hadiah.jpg";
  img.style.width = "150px";
  img.style.borderRadius = "10px";
  img.style.marginBottom = "10px";

  const text = document.createElement("p");
  text.innerText = "🎉 Yeay, kamu selesai! Hadiah spesial buat kamu 💕"; // ubah sesuai yang diinginkan
  text.style.color = "#C15E5E";
  text.style.fontWeight = "700";

  // link hadiah
  const link = document.createElement("a");
  link.href = "https://example.com";
  link.innerText = "Klik disini untuk hadiahmu!";
  link.target = "_blank";
  link.style.color = "#C15E5E";
  link.style.fontWeight = "700";

  rewardDiv.appendChild(img);
  rewardDiv.appendChild(text);
  rewardDiv.appendChild(link);

  container3.appendChild(rewardDiv);

  // reset score & currentQ untuk play lagi
  score3 = 0;
  currentQ3 = 0;
}
