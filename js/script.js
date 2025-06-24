// ** 1. Configuración inicial del Canvas y Contexto **
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d'); // Obtenemos el contexto 2D para dibujar

// ** 2. Definición de variables del juego **
const gameWidth = canvas.width;
const gameHeight = canvas.height;

// Propiedades de la carretera
const roadLaneWidth = gameWidth / 3; // Dividimos el ancho total en 3 carriles
const laneMarkingsWidth = 5; // Ancho de las líneas discontinuas de la carretera
const laneMarkingsHeight = 20; // Altura de los segmentos de las líneas
const laneMarkingsGap = 30; // Espacio entre los segmentos de las líneas

// Propiedades del jugador (auto)
const playerCarWidth = 40;
const playerCarHeight = 60;
let playerCarX = (gameWidth / 2) - (playerCarWidth / 2); // Posición inicial X (centrado en el carril central)
const playerCarY = gameHeight - playerCarHeight - 20; // Posición inicial Y (cerca del borde inferior)

// Velocidad de movimiento gradual del auto (esto es clave para tu requisito)
const playerMoveSpeed = 5; // Cantidad de píxeles que se mueve por cada 'clic' o paso gradual

// Variables para el juego
let score = 0;
let level = 1;
let gameOver = false;

// Referencias a los elementos de la UI
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const upButton = document.getElementById('upButton'); // Por si se usa para acelerar más adelante

// ** 3. Función para dibujar la carretera **
function drawRoad() {
    // Fondo de la carretera (asfalto)
    ctx.fillStyle = '#444'; // Gris oscuro para el asfalto
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    // Líneas de los carriles (blancas discontinuas)
    ctx.fillStyle = '#fff'; // Blanco para las líneas
    ctx.strokeStyle = '#fff'; // Color del borde (opcional, pero buena práctica)
    ctx.lineWidth = laneMarkingsWidth;

    // Dibujar las líneas centrales discontinuas
    for (let y = 0; y < gameHeight; y += laneMarkingsHeight + laneMarkingsGap) {
        // Línea del carril izquierdo
        ctx.fillRect(roadLaneWidth - (laneMarkingsWidth / 2), y, laneMarkingsWidth, laneMarkingsHeight);
        // Línea del carril derecho
        ctx.fillRect((roadLaneWidth * 2) - (laneMarkingsWidth / 2), y, laneMarkingsWidth, laneMarkingsHeight);
    }
}

// ** 4. Función para dibujar el auto del jugador **
function drawPlayerCar() {
    ctx.fillStyle = 'blue'; // Color del auto del jugador
    ctx.fillRect(playerCarX, playerCarY, playerCarWidth, playerCarHeight);
    // Opcional: dibujar un contorno para que se vea más como un auto
    ctx.strokeStyle = 'darkblue';
    ctx.lineWidth = 2;
    ctx.strokeRect(playerCarX, playerCarY, playerCarWidth, playerCarHeight);
}

// ** 5. Función para actualizar la UI **
function updateUI() {
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
}

// ** 6. Función principal de dibujo (render) **
function render() {
    ctx.clearRect(0, 0, gameWidth, gameHeight); // Limpia el canvas en cada fotograma
    drawRoad();
    drawPlayerCar();
    updateUI(); // Actualiza la puntuación y el nivel
}

// ** 7. Función de inicialización del juego **
function initGame() {
    // Aquí pondremos losEventListeners para los botones en el siguiente paso
    render(); // Dibuja el estado inicial del juego
}

// Inicia el juego cuando la página se carga
document.addEventListener('DOMContentLoaded', initGame);

// ** 8. Funciones de movimiento (para el siguiente paso) **
// Estas funciones se llamarán cuando se presionen los botones
function movePlayerLeft() {
    // Limita el movimiento para que no se salga del carril más a la izquierda
    playerCarX = Math.max(playerCarX - playerMoveSpeed, 0);
    render(); // Vuelve a dibujar el juego después del movimiento
}

function movePlayerRight() {
    // Limita el movimiento para que no se salga del carril más a la derecha
    playerCarX = Math.min(playerCarX + playerMoveSpeed, gameWidth - playerCarWidth);
    render(); // Vuelve a dibujar el juego después del movimiento
}
// ** NUEVA SECCIÓN: 8. Manejo de eventos de los botones **
// ----------------------------------------------------
function setupButtonListeners() {
    leftButton.addEventListener('click', movePlayerLeft);
    rightButton.addEventListener('click', movePlayerRight);

    // Los botones 'arriba' y 'abajo' no tienen funcionalidad aún en este juego,
    // pero los incluimos para completar la cruceta si decides darles uso.
    upButton.addEventListener('click', () => {
        console.log("Botón Arriba presionado (sin funcionalidad de juego definida aún).");
        // Aquí podrías añadir una función para acelerar el desplazamiento de la carretera, por ejemplo.
    });
    downButton.addEventListener('click', () => {
        console.log("Botón Abajo presionado (sin funcionalidad de juego definida aún).");
        // Aquí podrías añadir una función para frenar, por ejemplo.
    });
}

// ** 9. Función de inicialización del juego (modificada) **
function initGame() {
    setupButtonListeners(); // Configura los listeners de los botones al iniciar el juego
    render(); // Dibuja el estado inicial del juego
}

// Inicia el juego cuando la página se carga
document.addEventListener('DOMContentLoaded', initGame);