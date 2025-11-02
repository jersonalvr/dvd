// Obtener el elemento del logo
const dvdLogo = document.getElementById('dvd-logo');
const container = document.querySelector('.container');

// Colores disponibles para el logo
const colors = [
    '#ff0000', // Rojo
    '#00ff00', // Verde
    '#0000ff', // Azul
    '#ffff00', // Amarillo
    '#ff00ff', // Magenta
    '#00ffff', // Cyan
    '#ff8800', // Naranja
    '#8800ff', // Púrpura
    '#ff0088', // Rosa
    '#00ff88'  // Verde agua
];

// Variables de posición y velocidad
let x = Math.random() * (container.clientWidth - dvdLogo.offsetWidth);
let y = Math.random() * (container.clientHeight - dvdLogo.offsetHeight);
let dx = 1; // Velocidad horizontal
let dy = 1; // Velocidad vertical
let currentColorIndex = 0;

// Función para cambiar el color del SVG
function changeColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    // Aplicar el color usando filter CSS
    const color = colors[currentColorIndex];
    // Convertir el color a un filtro que cambie el tono
    dvdLogo.style.filter = `drop-shadow(0 4px 15px ${color})`;
    // Cambiar el color directamente en el SVG
    dvdLogo.style.filter = `brightness(0) saturate(100%) invert(${currentColorIndex % 2 === 0 ? '50%' : '70%'}) sepia(100%) saturate(500%) hue-rotate(${currentColorIndex * 36}deg)`;
}

// Función de animación
function animate() {
    // Obtener dimensiones actuales del contenedor y el logo
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const logoWidth = dvdLogo.offsetWidth;
    const logoHeight = dvdLogo.offsetHeight;

    // Actualizar posición
    x += dx;
    y += dy;

    // Detectar colisión con los bordes y cambiar color
    if (x + logoWidth >= containerWidth) {
        x = containerWidth - logoWidth;
        dx = -dx;
        changeColor();
    } else if (x <= 0) {
        x = 0;
        dx = -dx;
        changeColor();
    }

    if (y + logoHeight >= containerHeight) {
        y = containerHeight - logoHeight;
        dy = -dy;
        changeColor();
    } else if (y <= 0) {
        y = 0;
        dy = -dy;
        changeColor();
    }

    // Aplicar la nueva posición
    dvdLogo.style.left = x + 'px';
    dvdLogo.style.top = y + 'px';

    // Continuar la animación
    requestAnimationFrame(animate);
}

// Ajustar posición cuando se redimensiona la ventana
window.addEventListener('resize', () => {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const logoWidth = dvdLogo.offsetWidth;
    const logoHeight = dvdLogo.offsetHeight;

    // Asegurar que el logo permanezca dentro de los límites
    if (x + logoWidth > containerWidth) {
        x = containerWidth - logoWidth;
    }
    if (y + logoHeight > containerHeight) {
        y = containerHeight - logoHeight;
    }
});

// Iniciar la animación
animate();
