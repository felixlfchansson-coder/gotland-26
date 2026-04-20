// =========================
// HÄMTA HTML-ELEMENT
// =========================

// Canvas = själva spelplanen
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Bilder på baggarna
const blueBaggeImg = new Image();
blueBaggeImg.src = "img/blue.png";

const redBaggeImg = new Image();
redBaggeImg.src = "img/red.png";

const farmImg = new Image();
farmImg.src = "img/bondgård.png";

const raukImg = new Image();
raukImg.src = "img/rauk.png";

const bussImg = new Image();
bussImg.src = "img/buss.png";

// HUD = rutorna under spelplanen
const turnLabel = document.getElementById("turnLabel");
const angleLabel = document.getElementById("angleLabel");
const powerLabel = document.getElementById("powerLabel");
const hpLabel = document.getElementById("hpLabel");
const logEl = document.getElementById("log");

// Knappar för styrning
const angleDown = document.getElementById("angleDown");
const angleUp = document.getElementById("angleUp");
const powerDown = document.getElementById("powerDown");
const powerUp = document.getElementById("powerUp");
const fireBtn = document.getElementById("fireBtn");

// Startmeny
const startMenu = document.getElementById("startMenu");
const mapSelect = document.getElementById("mapSelect");
const projectileColorSelect = document.getElementById("projectileColor");
const startGameBtn = document.getElementById("startGameBtn");
const countdownOverlay = document.getElementById("countdownOverlay");

// =========================
// SPEL-KONSTANTER
// =========================

// Gravitation för projektilen
const GRAVITY = 0.22;

// Hur stor sprängkratern blir
const BLAST_RADIUS = 34;

// Hur långt explosionen kan skada
const DAMAGE_RADIUS = 60;

// Hur tätt terrängpunkterna ligger
const GROUND_STEP = 4;

// Storlek på baggbilderna
const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 48;

// =========================
// SPELVARIABLER
// =========================

// Terrain = markens form
let terrain = [];

// projectile = den kula som just nu flyger
let projectile = null;

// gameOver = om matchen är slut
let gameOver = false;

// Vems tur det är: 0 = blå, 1 = röd
let currentPlayerIndex = 0;

// Menyval
let selectedProjectileColor = "pink";
let currentMapType = "rauk";

// Om kontrollerna får användas just nu
let controlsLocked = true;

// =========================
// SPELARE
// =========================

// Här skapar vi två baggar som objekt
// Ett objekt kan ha flera egenskaper: namn, hp, vinkel, bild osv
const players = [
  {
    name: "Blå bagge",
    x: 140,
    y: 0,
    img: blueBaggeImg,
    hp: 100,
    angle: 45,
    power: 14,
    facing: 1
  },
  {
    name: "Röd bagge",
    x: 760,
    y: 0,
    img: redBaggeImg,
    hp: 100,
    angle: 135,
    power: 14,
    facing: -1
  }
];

// =========================
// HJÄLPFUNKTIONER
// =========================

// Skriver text i loggrutan
function log(message) {
  logEl.textContent = message;
}

// Returnerar rätt färg beroende på vad spelaren valde i menyn
function getProjectileColor() {
  switch (selectedProjectileColor) {
    case "blue":
      return "#7db7ff";
    case "yellow":
      return "#ffe082";
    case "brown":
      return "#8b5a2b";
    case "green":
      return "#9ad27a";
    case "pink":
    default:
      return "#ff77aa";
  }
}

// Slår på knapparna
function enableControls() {
  controlsLocked = false;
  angleDown.disabled = false;
  angleUp.disabled = false;
  powerDown.disabled = false;
  powerUp.disabled = false;
  fireBtn.disabled = false;
}

// Stänger av knapparna
function disableControls() {
  controlsLocked = true;
  angleDown.disabled = true;
  angleUp.disabled = true;
  powerDown.disabled = true;
  powerUp.disabled = true;
  fireBtn.disabled = true;
}

// Nedräkning innan matchen börjar
function startCountdown() {
  let count = 3;

  countdownOverlay.textContent = count;
  countdownOverlay.classList.remove("hidden");

  const interval = setInterval(() => {
    count--;

    if (count > 0) {
      countdownOverlay.textContent = count;
    } else if (count === 0) {
      countdownOverlay.textContent = "KÖR!";
    } else {
      clearInterval(interval);
      countdownOverlay.classList.add("hidden");
      enableControls();
      log("Glasskriget är igång.");
    }
  }, 1000);
}

// =========================
// TERRÄNG
// =========================

function drawBackground() {
  let bg;

  if (currentMapType === "rauk") {
    bg = raukImg;
  } else if (currentMapType === "farm") {
    bg = farmImg;
  } else if (currentMapType === "bus") {
    bg = bussImg;
  }

  if (bg) {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  }
}
// Skapar olika mark beroende på vald bana
function createTerrain(type) {
  terrain = [];

  for (let x = 0; x < canvas.width; x += GROUND_STEP) {
    let y;

    if (type === "rauk") {
      // Ojämn bana med stora kullar
      y = 360 + Math.sin(x * 0.01) * 35 + Math.sin(x * 0.03) * 18;
    } else if (type === "farm") {
      // Lugna kullar
      y = 390 + Math.sin(x * 0.008) * 18;
    } else if (type === "bus") {
      // Nästan platt
      y = 395;
    } else {
      y = 380;
    }

    terrain.push({ x, y });
  }
}

// Hämtar markens höjd vid en viss x-position
function getGroundY(x) {
  const index = Math.max(
    0,
    Math.min(terrain.length - 1, Math.floor(x / GROUND_STEP))
  );
  return terrain[index].y;
}

// Gör ett hål i marken vid explosion
function carveTerrain(cx, cy, radius) {
  for (const point of terrain) {
    const dx = point.x - cx;
    const distX = Math.abs(dx);

    if (distX < radius) {
      const depth = Math.sqrt(radius * radius - dx * dx);
      point.y = Math.max(point.y, cy + depth);
    }
  }
}

// Ställer baggarna på marken vid start
function placePlayersOnGround() {
  players.forEach((player) => {
    player.y = getGroundY(player.x) - 8;
  });
}

// Gör att baggarna faller om marken försvinner under dem
function updateFallingPlayers() {
  players.forEach((player) => {
    const groundY = getGroundY(player.x) - 8;

    if (player.y < groundY) {
      player.y += 3;
    }
  });
}

// Om en bagge faller utanför spelplanen = död
function checkOutOfBounds() {
  players.forEach((player) => {
    if (player.y > canvas.height + 50) {
      player.hp = 0;
    }
  });
}

// =========================
// RITNING
// =========================

// Himmel och moln
//function drawSky() {
  ctx.fillStyle = "#dceeff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.beginPath();
  ctx.ellipse(140, 80, 55, 24, 0, 0, Math.PI * 2);
  ctx.ellipse(180, 88, 45, 20, 0, 0, Math.PI * 2);
  ctx.ellipse(700, 70, 60, 25, 0, 0, Math.PI * 2);
  ctx.fill();

// Marken
function drawTerrain() {
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);

  for (const point of terrain) {
    ctx.lineTo(point.x, point.y);
  }

  ctx.lineTo(canvas.width, canvas.height);
  ctx.closePath();
  ctx.fillStyle = "#c8a06a";
  ctx.fill();

  ctx.beginPath();
  for (let i = 0; i < terrain.length; i++) {
    const point = terrain[i];
    if (i === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  }
  ctx.strokeStyle = "#7ca86c";
  ctx.lineWidth = 6;
  ctx.stroke();
}

// Glasstrut på ryggen som roterar med vinkeln
function drawConeLauncher(player) {
  const angleRadians = (player.angle * Math.PI) / 180;

  // Var på baggen struten sitter
  const baseX = player.x;
  const baseY = player.y - 30;

  ctx.save();
  ctx.translate(baseX, baseY);

  // Minus behövs här eftersom canvas-rotation går "åt andra hållet"
  ctx.rotate(-angleRadians);

  // Själva struten
  ctx.fillStyle = "#d7a56c";
  ctx.beginPath();
  ctx.moveTo(-10, -6);
  ctx.lineTo(-10, 6);
  ctx.lineTo(22, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#b9834f";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Våffelmönster
  ctx.strokeStyle = "rgba(140, 90, 40, 0.45)";
  ctx.lineWidth = 1;

  for (let i = -8; i <= 16; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, -5);
    ctx.lineTo(i + 8, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 5);
    ctx.lineTo(i + 8, -5);
    ctx.stroke();
  }

  // Glasskulor ovanpå struten
  ctx.fillStyle = "#ff77aa";
  ctx.beginPath();
  ctx.arc(-3, 0, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#7db7ff";
  ctx.beginPath();
  ctx.arc(5, -2, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffe082";
  ctx.beginPath();
  ctx.arc(2, 4, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Ritar baggen
function drawBug(player) {
  ctx.drawImage(
    player.img,
    player.x - PLAYER_WIDTH / 2,
    player.y - PLAYER_HEIGHT + 8,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );

  drawConeLauncher(player);
}

// Ritar projektilen
function drawProjectile() {
  if (!projectile) return;

  ctx.fillStyle = getProjectileColor();
  ctx.beginPath();
  ctx.arc(projectile.x, projectile.y, 6, 0, Math.PI * 2);
  ctx.fill();

  // liten highlight så kulan ser glansig ut
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.beginPath();
  ctx.arc(projectile.x - 2, projectile.y - 2, 2, 0, Math.PI * 2);
  ctx.fill();
}

// Enkel explosionsring
function drawExplosionRing(x, y) {
  ctx.strokeStyle = "rgba(255,180,220,0.5)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, y, BLAST_RADIUS, 0, Math.PI * 2);
  ctx.stroke();
}

// Ritar hela scenen varje frame
function draw() {
  drawBackground(); // 🔥 NY RAD
  drawTerrain();    // (kan vara kvar ovanpå)
  players.forEach(drawBug);
  drawProjectile();
}

// =========================
// HUD OCH TURER
// =========================

function updateHud() {
  const player = players[currentPlayerIndex];
  turnLabel.textContent = `Tur: ${player.name}`;
  angleLabel.textContent = `Vinkel: ${Math.round(player.angle)}°`;
  powerLabel.textContent = `Kraft: ${player.power.toFixed(1)}`;
  hpLabel.textContent = `HP: ${players[0].hp} / ${players[1].hp}`;
}

function nextTurn() {
  currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  updateHud();
}

// =========================
// SKADA OCH VINST
// =========================

// Skadar spelare som står nära explosionen
function damagePlayers(cx, cy) {
  players.forEach((player) => {
    const hitPoints = [
      { x: player.x, y: player.y - PLAYER_HEIGHT + 18 },
      { x: player.x, y: player.y - PLAYER_HEIGHT / 2 },
      { x: player.x, y: player.y }
    ];

    let minDist = Infinity;

    hitPoints.forEach((point) => {
      const dx = point.x - cx;
      const dy = point.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) minDist = dist;
    });

    if (minDist < DAMAGE_RADIUS) {
      const damage = Math.round((1 - minDist / DAMAGE_RADIUS) * 55);
      player.hp = Math.max(0, player.hp - damage);
    }
  });
}

// Kollar om spelet är slut
function checkWin() {
  const alivePlayers = players.filter((p) => p.hp > 0);

  if (alivePlayers.length === 2) return false;

  gameOver = true;
  disableControls();

  if (alivePlayers.length === 1) {
    log(`${alivePlayers[0].name} vinner glasskriget.`);
  } else {
    log("Båda baggarna kollapsade. Oavgjort.");
  }

  return true;
}

// När en projektil träffar marken
function explode(x, y) {
  carveTerrain(x, y, BLAST_RADIUS);
  damagePlayers(x, y);
  drawExplosionRing(x, y);
  updateFallingPlayers();
  updateHud();

  if (!checkWin()) {
    log("Glasskulan slog ner. Marken tog det personligt.");
    nextTurn();
  }
}

// Kollar om projektilen direkt träffar en bagge
function checkProjectileHitPlayer() {
  if (!projectile) return false;

  for (let i = 0; i < players.length; i++) {
    if (i === currentPlayerIndex) continue;

    const player = players[i];

    const left = player.x - PLAYER_WIDTH / 2;
    const right = player.x + PLAYER_WIDTH / 2;
    const top = player.y - PLAYER_HEIGHT + 12;
    const bottom = player.y + 8;

    if (
      projectile.x >= left &&
      projectile.x <= right &&
      projectile.y >= top &&
      projectile.y <= bottom
    ) {
      const hitX = projectile.x;
      const hitY = projectile.y;

      projectile = null;

      // Direktträff gör extra skada
      player.hp = Math.max(0, player.hp - 25);

      explode(hitX, hitY);
      log(`${player.name} fick en glasskula rakt på ullen.`);
      return true;
    }
  }

  return false;
}

// =========================
// PROJEKTIL OCH SKJUTNING
// =========================

// Uppdaterar kulan medan den flyger
function updateProjectile() {
  if (!projectile) return;

  projectile.vy += GRAVITY;
  projectile.x += projectile.vx;
  projectile.y += projectile.vy;

  if (checkProjectileHitPlayer()) {
    return;
  }

  if (
    projectile.x < 0 ||
    projectile.x > canvas.width ||
    projectile.y > canvas.height
  ) {
    projectile = null;
    log("Glasskulan försvann ut i intet.");
    nextTurn();
    return;
  }

  const groundY = getGroundY(projectile.x);

  if (projectile.y >= groundY) {
    const hitX = projectile.x;
    const hitY = projectile.y;
    projectile = null;
    explode(hitX, hitY);
  }
}

// Skjuter från spetsen på glasstruten
function shoot() {
  if (projectile || gameOver || controlsLocked) return;

  const player = players[currentPlayerIndex];
  const angleRadians = (player.angle * Math.PI) / 180;

  // Samma utgångspunkt som struten använder
  const baseX = player.x;
  const baseY = player.y - 30;

  // Hur lång struten är
  const coneLength = 22;

  // Spetsen på struten = där kulan ska börja
  const shotX = baseX + Math.cos(angleRadians) * coneLength;
  const shotY = baseY - Math.sin(angleRadians) * coneLength;

  projectile = {
    x: shotX,
    y: shotY,
    vx: Math.cos(angleRadians) * player.power,
    vy: -Math.sin(angleRadians) * player.power
  };

  log(`${player.name} skjuter en glasskula.`);
}

// Hindrar för låg/hög vinkel och kraft
function clampControls() {
  const player = players[currentPlayerIndex];

  if (currentPlayerIndex === 0) {
    player.angle = Math.max(15, Math.min(75, player.angle));
  } else {
    player.angle = Math.max(105, Math.min(165, player.angle));
  }

  player.power = Math.max(6, Math.min(24, player.power));
  updateHud();
}

// =========================
// KNAPPAR
// =========================

angleDown.addEventListener("click", () => {
  if (projectile || gameOver || controlsLocked) return;
  players[currentPlayerIndex].angle -= 5;
  clampControls();
});

angleUp.addEventListener("click", () => {
  if (projectile || gameOver || controlsLocked) return;
  players[currentPlayerIndex].angle += 5;
  clampControls();
});

powerDown.addEventListener("click", () => {
  if (projectile || gameOver || controlsLocked) return;
  players[currentPlayerIndex].power -= 1;
  clampControls();
});

powerUp.addEventListener("click", () => {
  if (projectile || gameOver || controlsLocked) return;
  players[currentPlayerIndex].power += 1;
  clampControls();
});

fireBtn.addEventListener("click", shoot);

// Startknappen i menyn
startGameBtn.addEventListener("click", () => {
  selectedProjectileColor = projectileColorSelect.value;
  currentMapType = mapSelect.value;

  currentPlayerIndex = 0;
  projectile = null;
  gameOver = false;

  // återställ spelarna
  players[0].hp = 100;
  players[1].hp = 100;
  players[0].angle = 45;
  players[1].angle = 135;
  players[0].power = 14;
  players[1].power = 14;

  createTerrain(currentMapType);
  placePlayersOnGround();
  updateHud();

  disableControls();
  startMenu.classList.add("hidden");
  startCountdown();
});

// =========================
// SPELLOOP
// =========================

// animate körs om och om igen
function animate() {
  updateProjectile();
  updateFallingPlayers();
  checkOutOfBounds();
  checkWin();
  draw();

  requestAnimationFrame(animate);
}

// Startar upp grundläget
function init() {
  disableControls();
  startMenu.classList.remove("hidden");
  createTerrain("rauk");
  placePlayersOnGround();
  updateHud();
  log("Välj bana och glassfärg, sen starta spelet.");
  draw();
  animate();
}

// Vänta tills båda baggbilderna är laddade innan spelet startar
blueBaggeImg.onload = () => {
  if (redBaggeImg.complete) init();
};

redBaggeImg.onload = () => {
  if (blueBaggeImg.complete) init();
};