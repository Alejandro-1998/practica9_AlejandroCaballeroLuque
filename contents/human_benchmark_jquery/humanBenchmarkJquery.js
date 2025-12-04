$(function() {

    const $areaJuego = $('#areaJuego');
    const $textoPrincipal = $('#textoPrincipal');
    const $textoSecundario = $('#textoSecundario');

    const $iconoRayo = $('#iconoRayo');
    const $iconoReloj = $('#iconoReloj');
    const $iconoError = $('#iconoError');

    let estadoJuego = 'inicio';
    let tiempoInicio = 0;
    let timerTimeout = null;

    
    function mostrarIcono(tipo) {
        $iconoRayo.addClass('hidden');
        $iconoReloj.addClass('hidden');
        $iconoError.addClass('hidden');

        $(tipo).removeClass('hidden');
    }

    function actualizarVista(colorClase, titulo, descripcion, tipo) {
        // jQuery .attr('class', ...) reemplaza todas las clases.
        $areaJuego.attr('class', `w-full h-full flex flex-col items-center justify-center text-center cursor-pointer p-6 ${colorClase}`);
        
        $textoPrincipal.text(titulo);
        $textoSecundario.html(descripcion); // .html() permite etiquetas <br>
        
        if (tipo) mostrarIcono(tipo);
    }

    function ponerInicio() {
        actualizarVista(
            'bg-blue-600', 
            'Test de Reflejos', 
            'Cuando la pantalla se ponga verde, haz click lo más rápido posible.<br><br>Haz click para empezar.',
            '#iconoRayo'
        );
    }

    function ponerEspera() {
        estadoJuego = 'esperando';
        actualizarVista(
            'bg-red-600', 
            'Espera al verde...', 
            'Aún no...',
            '#iconoReloj'
        );

        const tiempoRandom = Math.floor(Math.random() * 3000) + 2000;

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
            '#iconoRayo'
        );
    }

    function ponerResultado(tiempo) {
        estadoJuego = 'resultado';

        actualizarVista(
            'bg-blue-600', 
            `${tiempo} ms`, 
            `Tu tiempo de reacción em milisegundos.<br>Haz click para intentar de nuevo.`,
            '#iconoRayo'
        );
    }

    function ponerFallo() {
        estadoJuego = 'fallo';
        clearTimeout(timerTimeout); 

        actualizarVista(
            'bg-blue-600', 
            '¡Demasiado pronto!', 
            'Has pulsado antes de que se pusiera verde.<br>Haz click para intentar de nuevo.',
            '#iconoError'
        );
    }

    $areaJuego.on('mousedown', function() {
        
        if (estadoJuego === 'inicio') {
            ponerEspera();
        } 
        else if (estadoJuego === 'esperando') {
            ponerFallo();
        } 
        else if (estadoJuego === 'listo') {
            const tiempoFinal = Date.now();
            const reaccion = tiempoFinal - tiempoInicio;
            ponerResultado(reaccion);
        } 
        else if (estadoJuego === 'resultado' || estadoJuego === 'fallo') {
            ponerEspera();
        }
    });

    ponerInicio();
});