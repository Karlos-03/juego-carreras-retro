// ** 1. Configuración inicial del Canvas y Contexto **
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ** 2. Definición de variables del juego **
const gameWidth = canvas.width;
const gameHeight = canvas.height;

// Propiedades de la carretera
const roadLaneWidth = gameWidth / 3;
const laneMarkingsWidth = 5;
const laneMarkingsHeight = 20;
const laneMarkingsGap = 30;

// Propiedades del jugador (auto)
const playerCarWidth = 40;
const playerCarHeight = 60;
let playerCarX = (gameWidth / 2) - (playerCarWidth / 2);
const playerCarY = gameHeight - playerCarHeight - 20;
const playerMoveSpeed = 5;

// Variables para el juego
let score = 0;
let level = 1;
let gameOver = false;
let gameSpeed = 3; // Velocidad inicial de los autos enemigos y la carretera

// Propiedades de los autos enemigos
const enemyCarWidth = 40;
const enemyCarHeight = 60;
let enemyCars = []; // Array para almacenar todos los autos enemigos
let lastEnemySpawnTime = 0;
const enemySpawnInterval = 1500; // Tiempo en milisegundos entre la aparición de autos (1.5 segundos)

// Referencias a los elementos de la UI
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton'); // Referencia al botón 'abajo'

// ** 3. Función para dibujar la carretera **
function drawRoad() {
    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = laneMarkingsWidth;

    // Dibujar las líneas centrales discontinuas
    for (let y = 0; y < gameHeight; y += laneMarkingsHeight + laneMarkingsGap) {
        ctx.fillRect(roadLaneWidth - (laneMarkingsWidth / 2), y, laneMarkingsWidth, laneMarkingsHeight);
        ctx.fillRect((roadLaneWidth * 2) - (laneMarkingsWidth / 2), y, laneMarkingsWidth, laneMarkingsHeight);
    }
}

// ** 4. Función para dibujar el auto del jugador **
function drawPlayerCar() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerCarX, playerCarY, playerCarWidth, playerCarHeight);
    ctx.strokeStyle = 'darkblue';
    ctx.lineWidth = 2;
    ctx.strokeRect(playerCarX, playerCarY, playerCarWidth, playerCarHeight);
}

// ** 5. Función para actualizar la UI **
function updateUI() {
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
}

// Funciones para autos enemigos
function drawEnemyCar(car) {
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
    ctx.strokeStyle = 'darkred';
    ctx.lineWidth = 2;
    ctx.strokeRect(car.x, car.y, car.width, car.height);
}

function spawnEnemyCar() {
    const colors = ['red', 'green', 'yellow', 'purple', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const randomLane = Math.floor(Math.random() * 3);
    let enemyX;

    if (randomLane === 0) {
        enemyX = (roadLaneWidth / 2) - (enemyCarWidth / 2);
    } else if (randomLane === 1) {
        enemyX = roadLaneWidth + (roadLaneWidth / 2) - (enemyCarWidth / 2);
    } else {
        enemyX = (roadLaneWidth * 2) + (roadLaneWidth / 2) - (enemyCarWidth / 2);
    }

    enemyCars.push({
        x: enemyX,
        y: -enemyCarHeight,
        width: enemyCarWidth,
        height: enemyCarHeight,
        color: randomColor
    });
}

function moveEnemyCars() {
    for (let i = 0; i < enemyCars.length; i++) {
        enemyCars[i].y += gameSpeed;

        if (enemyCars[i].y > gameHeight) {
            enemyCars.splice(i, 1);
            score += 10;
            if (score % 100 === 0 && score > 0) {
                level++;
                gameSpeed += 0.5;
            }
            i--;
        }
    }
}

// ** 6. Función principal de dibujo (render) **
function render() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    drawRoad();
    drawPlayerCar();
    enemyCars.forEach(drawEnemyCar); // Dibuja cada auto en el array
    updateUI();
}

// ** 7. Funciones de movimiento del jugador **
function movePlayerLeft() {
    playerCarX = Math.max(playerCarX - playerMoveSpeed, 0);
    // No llamamos a render aquí, ya que el gameloop se encargará de ello
}

function movePlayerRight() {
    playerCarX = Math.min(playerCarX + playerMoveSpeed, gameWidth - playerCarWidth);
    // No llamamos a render aquí, ya que el gameloop se encargará de ello
}

// ** 8. Bucle principal del juego (Game Loop) **
let animationFrameId;

function gameLoop(currentTime) {
    if (gameOver) {
        cancelAnimationFrame(animationFrameId);
        return;
    }

    if (currentTime - lastEnemySpawnTime > enemySpawnInterval) {
        spawnEnemyCar();
        lastEnemySpawnTime = currentTime;
    }

    moveEnemyCars();
    render();

    animationFrameId = requestAnimationFrame(gameLoop);
}

// ** 9. Manejo de eventos de los botones **
function setupButtonListeners() {
    leftButton.addEventListener('click', movePlayerLeft);
    rightButton.addEventListener('click', movePlayerRight);

    upButton.addEventListener('click', () => {
        console.log("Botón Arriba presionado (sin funcionalidad de juego definida aún).");
    });
    downButton.addEventListener('click', () => {
        console.log("Botón Abajo presionado (sin funcionalidad de juego definida aún).");
    });
}

// ** 10. Función de inicialización del juego **
function initGame() {
    setupButtonListeners();
    score = 0;
    level = 1;
    gameSpeed = 3;
    enemyCars = [];
    gameOver = false;

    animationFrameId = requestAnimationFrame(gameLoop);
}

// Inicia el juego cuando la página se carga
document.addEventListener('DOMContentLoaded', initGame);