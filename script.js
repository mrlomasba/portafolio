// --- Lógica del Efecto Matrix ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
let columns;
const fontSize = 16;
let drops = [];
const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ1234567890@#$%^&*()';

function setCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / fontSize);
    
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#32CD32'; // Verde neón
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
    
    requestAnimationFrame(drawMatrix);
}

// --- Lógica del Carrusel de Proyectos ---
function setupProjectCarousel() {
    const carrusel = document.getElementById('proyectos-carrusel');
    const navLeft = document.getElementById('nav-left');
    const navRight = document.getElementById('nav-right');
    
    if (!carrusel || !navLeft || !navRight) return;

    // Función para determinar el ancho de desplazamiento
    function getScrollAmount() {
        const firstItem = carrusel.querySelector('.list-item-card');
        if (!firstItem) return carrusel.clientWidth; 
        
        const itemWidth = firstItem.offsetWidth;
        const style = window.getComputedStyle(firstItem);
        const marginRight = parseFloat(style.marginRight);

        // Devuelve el ancho del item más el margen para asegurar que el snap es correcto
        return itemWidth + marginRight;
    }

    navRight.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();
        carrusel.scrollLeft += scrollAmount;
    });

    navLeft.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();
        carrusel.scrollLeft -= scrollAmount;
    });
}

// --- Datos y Lógica para el Carrusel de Habilidades (Existente) ---
const skillsData = [
    // Módulos Web (Software)
    { name: "React.js", src: 'react.png', type: 'web' },
    { name: "Node.js", src: 'node.png', type: 'web' },
    { name: "PostgreSQL", src: 'postgres.png', type: 'web' },
    { name: "TypeScript", src: 'types.png', type: 'web' },
    { name: "Tailwind", src: 'tailwind.png', type: 'web' },
    { name: "JavaScript", src: 'javascript.jpeg', type: 'web' },
    { name: "HTML", src: 'html.png', type: 'web' },
    { name: "CSS", src: 'css.png', type: 'web' },
    
    // Módulos Industriales
    { name: "Soldadura", src: 'soldadura.png', type: 'industrial' }, 
    { name: "SAP/ERP", src: 'sap.png', type: 'industrial' },
];

function createSkillItem(skill) {
    const item = document.createElement('div');
    item.className = 'skill-icon-item';
    
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    
    const borderColor = skill.type === 'industrial' ? 'var(--secondary-accent)' : 'var(--primary-color)';
    const boxShadow = skill.type === 'industrial' ? '0 0 5px rgba(252, 211, 77, 0.5)' : 'var(--glow-shadow-sm)';
    
    iconContainer.style.border = `2px solid ${borderColor}`;
    iconContainer.style.boxShadow = boxShadow;

    const skillImg = document.createElement('img');
    
    const imageUrl = skill.src.startsWith('URL_DE_') 
        ? `https://placehold.co/100x100/404040/FFFFFF?text=${skill.name.substring(0, 5).toUpperCase()}` 
        : skill.src;

    skillImg.src = imageUrl; 
    skillImg.alt = `Logo de ${skill.name}`;
    
    skillImg.onerror = function() {
        this.onerror=null; 
        this.alt = skill.name;
        this.outerHTML = `<div class="w-full h-full flex items-center justify-center text-sm font-mono bg-[var(--bg-card-transparent)] text-[var(--text-light)]">${skill.name.substring(0, 5).toUpperCase()}</div>`;
    };
    
    iconContainer.appendChild(skillImg);
    item.appendChild(iconContainer);
    
    const name = document.createElement('span');
    name.className = 'mt-2 text-base font-mono text-center'; 
    name.textContent = skill.name;
    name.classList.add(skill.type === 'industrial' ? 'industrial-text' : 'accent-text');

    item.appendChild(name);
    return item;
}

function populateSkillTrack() {
    const track = document.getElementById('skill-track');
    
    const fullSkillsList = [...skillsData, ...skillsData];

    fullSkillsList.forEach(skill => {
        track.appendChild(createSkillItem(skill));
    });
}

// --- Inicialización ---
window.addEventListener('resize', setCanvasSize);

document.addEventListener('DOMContentLoaded', () => {
    setCanvasSize();
    drawMatrix();
    populateSkillTrack();
    setupProjectCarousel(); 
    
    // Actualizar el año
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
