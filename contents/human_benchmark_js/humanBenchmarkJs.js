const areaJuego = document.querySelector('#areaJuego');
const textoPrincipal = document.querySelector('#textoPrincipal');
const textoSecundario = document.querySelector('#textoSecundario');

const iconoRayo = document.querySelector('#iconoRayo');
const iconoReloj = document.querySelector('#iconoReloj');
const iconoError = document.querySelector('#iconoError');

let estadoJuego = 'inicio'; 
let tiempoInicio = 0;
let timerTimeout = null;

function mostrarIcono(tipo) {

    iconoRayo.classList.add('hidden');
    iconoReloj.classList.add('hidden');
    iconoError.classList.add('hidden');

    if (tipo === 'rayo') iconoRayo.classList.remove('hidden');
    if (tipo === 'reloj') iconoReloj.classList.remove('hidden');
    if (tipo === 'error') iconoError.classList.remove('hidden');
}

function actualizarVista(colorClase, titulo, descripcion, icono) {
    areaJuego.className = `w-full h-full flex flex-col items-center justify-center text-center cursor-pointer p-6 ${colorClase}`;
    
    textoPrincipal.textContent = titulo;
    textoSecundario.innerHTML = descripcion;
    
    if (icono) mostrarIcono(icono);
}

function ponerInicio() {
    actualizarVista(
        'bg-blue-600', 
        'Test de Reflejos', 
        'Cuando la pantalla se ponga verde, haz click lo más rápido posible.<br><br>Haz click para empezar.',
        'rayo'
    );
}

function ponerEspera() {
    estadoJuego = 'esperando';

    actualizarVista(
        'bg-red-600', 
        'Espera al verde...', 
        'Aún no...',
        'reloj'
    );

    const tiempoRandom = Math.floor(Math.random() * 3000) + 2000; // Calcular tiempo aleatorio entre 2 y 5 segundos

    timerTimeout = setTimeout(() => {
        ponerVerde();
    }, tiempoRandom);
}

function ponerVerde() {
    estadoJuego = 'listo';
    tiempoInicio = Date.now();
    
    actualizarVista(
        'bg-green-500', 
        '¡CLICK!', 
        '¡Dale ahora!',
        'rayo'
    );
}

function ponerResultado(tiempo) {
    estadoJuego = 'resultado';

    actualizarVista(
        'bg-blue-600', 
        `${tiempo} ms`, 
        `Tu tiempo de reacción em milisegundos.<br>Haz click para intentar de nuevo.`,
        'rayo'
    );
}

function ponerFallo() {
    estadoJuego = 'fallo';
    clearTimeout(timerTimeout); // Cancelamos el temporizador para que no se ponga verde después

    actualizarVista(
        'bg-blue-600', 
        '¡Demasiado pronto!', 
        'Has pulsado antes de que se pusiera verde.<br>Haz click para intentar de nuevo.',
        'error'
    );
}

areaJuego.addEventListener('mousedown', () => {
    switch (estadoJuego) {
        case 'inicio':
            ponerEspera();
            break;

        case 'esperando':
            ponerFallo();
            break;

        case 'listo':
            const tiempoFinal = Date.now();
            const reaccion = tiempoFinal - tiempoInicio;
            ponerResultado(reaccion);
            break;

        case 'resultado':
            ponerEspera();
            break;

        case 'fallo':
            ponerEspera();
            break;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    ponerInicio();
})