// =======================
// CONFIGURACIÓN
// =======================
const correctName = "Adela Robles Cruz";   // 🔹 Cambia por el nombre correcto
const correctDate = "24/06/2021";          // 🔹 Cambia por la fecha correcta

// Referencias al DOM
const pandaImg = document.getElementById("pandaImg");
const nameInput = document.getElementById("nameInput");
const submitName = document.getElementById("submitName");
const dateInput = document.getElementById("dateInput");
const submitDate = document.getElementById("submitDate");
const message1 = document.getElementById("message1");

const sign2 = document.querySelector(".sign2");
const sign3 = document.querySelector(".sign3");
const sky = document.querySelector(".sky");
const thanksScreen = document.querySelector(".thanks-screen");
const romanticSong = document.getElementById("romanticSong");

// =======================
// EVENTO: Validar Nombre
// =======================
submitName.addEventListener("click", () => {
  const enteredName = nameInput.value.trim();

  if (enteredName.toLowerCase() === correctName.toLowerCase()) {
    pandaImg.src = "img/panda_sospechoso.png"; // Cambia a panda sospechoso
    message1.textContent = "💘 ¡Correcto! Ahora falta una última prueba...";
    sign2.style.display = "none";
    sign3.style.display = "block";
    dateInput.focus();
  } else {
    alert("🙈 Ese no es el nombre correcto... inténtalo otra vez 💕");
    nameInput.focus();
  }
});

// =======================
// EVENTO: Validar Fecha
// =======================
submitDate.addEventListener("click", () => {
  const enteredDate = dateInput.value.trim();

  if (enteredDate === correctDate) {
    // Transición de imagen → panda amoroso
    pandaImg.style.opacity = 0;
    setTimeout(() => {
      pandaImg.src = "img/panda_amor.png";
      pandaImg.style.opacity = 1;
    }, 1000);

    // Luego mostrar pantalla final
    setTimeout(() => {
      sky.style.display = "none";
      thanksScreen.style.display = "flex";
      romanticSong.play(); // 🎶 Música al final
      launchHearts();      // 💖 Comienza animación de corazones
      setupTypingEffect(); // 📝 Ajusta efecto máquina de escribir
    }, 6000);

  } else {
    alert("😢 Esa no es la fecha... vuelve a intentarlo 💖");
    dateInput.focus();
  }
});

// =======================
// CORAZONES FLOTANDO
// =======================
function launchHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";
    heart.textContent = "💖";
    thanksScreen.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 800);
}

// =======================
// ESTRELLAS FUGACES
// =======================
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  rebuildStars();
});

// Clase Estrella
class Star {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinkleDir = Math.random() < 0.5 ? 1 : -1;
  }
  update() {
    this.alpha += this.twinkleSpeed * this.twinkleDir;
    if (this.alpha <= 0.1) { this.alpha = 0.1; this.twinkleDir = 1; }
    if (this.alpha >= 1) { this.alpha = 1; this.twinkleDir = -1; }
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 5);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.6, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Clase Estrella Fugaz
class ShootingStar {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H * 0.35;
    const angle = (Math.random() * 0.6 - 0.3) - Math.PI / 4;
    this.speed = 5 * (Math.random() * 0.6 + 0.7);
    this.vx = Math.cos(angle) * this.speed * 8;
    this.vy = Math.sin(angle) * this.speed * 8;
    this.life = Math.random() * 40 + 60;
    this.maxLife = this.life;
    this.length = Math.random() * 80 + 120;
    this.alpha = 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.alpha = Math.max(0, this.life / this.maxLife);
  }
  draw(ctx) {
    ctx.save();
    ctx.lineWidth = 2 + (1 * this.alpha);
    ctx.lineCap = 'round';
    const grad = ctx.createLinearGradient(
      this.x, this.y,
      this.x - this.vx * this.length / this.speed,
      this.y - this.vy * this.length / this.speed
    );
    grad.addColorStop(0, 'rgba(255,255,255,' + (0.9 * this.alpha) + ')');
    grad.addColorStop(1, 'rgba(255,200,150,0)');
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.vx * this.length / this.speed,
      this.y - this.vy * this.length / this.speed
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,' + (1 * this.alpha) + ')';
    ctx.arc(this.x, this.y, 2.5 + this.alpha * 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

let stars = [];
let shoots = [];

function rebuildStars() {
  stars = [];
  for (let i = 0; i < 200; i++) stars.push(new Star());
}

rebuildStars();

function loop() {
  ctx.clearRect(0, 0, W, H);

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#041021');
  bg.addColorStop(1, '#02020a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  for (const s of stars) { s.update(); s.draw(ctx); }

  if (Math.random() < 0.02) { shoots.push(new ShootingStar()); }

  for (let i = shoots.length - 1; i >= 0; i--) {
    const sh = shoots[i];
    sh.update();
    sh.draw(ctx);
    if (sh.life <= 0 || sh.x < -200 || sh.x > W + 200 || sh.y > H + 200) shoots.splice(i, 1);
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

// =======================
// EFECTO MÁQUINA DE ESCRIBIR
// =======================
function setupTypingEffect() {
  const finalMessage = document.querySelector(".final-message p");
  if (finalMessage) {
    const chars = finalMessage.textContent.length;
    finalMessage.style.animation = `typing 12s steps(${chars}, end), blink .8s step-end infinite`;
  }
}
