$(function() { // Equivalente al DOMContentLoaded

    const $contenedorElementos = $("#contenedorElementos");
    const $btnAgregar = $("#btnAgregar");
    const $btnFondo = $("#btnFondo");

    const imagenes = [
        { ruta: "img/sceptile.png", titulo: "Sceptile" },
        { ruta: "img/rayquaza.png", titulo: "Rayquaza" },
        { ruta: "img/bulbasaur.png", titulo: "Bulbasaur" },
        { ruta: "img/electrofuria.png", titulo: "Electrofuria" },
    ];

    $btnAgregar.on("click", function() {
        
        const imagenAleatoria = Math.floor(Math.random() * imagenes.length);
        const imagen = imagenes[imagenAleatoria];

        const elemento = `
        <div class="tarjetaItem bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div class="tema-bg h-48 overflow-hidden relative group">
                <img src="${imagen.ruta}" 
                     alt="${imagen.titulo}" 
                     class="object-cover transition-transform duration-500 group-hover:scale-110">
            </div>
            
            <div class="p-4 flex flex-col gap-2 mt-auto">
                <h3 class="text-center font-bold text-gray-700 capitalize">${imagen.titulo}</h3>
                <button class="btnCambiar w-full py-2 px-4 bg-amber-50 text-amber-600 font-semibold rounded-lg hover:bg-amber-100 transition-colors border border-amber-200">
                    Cambiar
                </button>
                <button class="btnBorrar w-full py-2 px-4 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors border border-red-200">
                    Borrar
                </button>
            </div>
        </div>
        `;

        $contenedorElementos.append(elemento);
    });

    $btnFondo.on("click", function() {
        const colorInput = $("#colorInput").val(); // .val() igual que .value()
        
        $(":root").css("--color-primario", colorInput);
    });

    // jQuery $(padre).on("evento", "selectorHijo", funcion)
    
    // BORRAR
    $contenedorElementos.on("click", ".btnBorrar", function() {
        $(this).closest(".tarjetaItem").remove(); // $(this) se refiere al botón que pulsaste
    });

    // CAMBIAR
    $contenedorElementos.on("click", ".btnCambiar", function() {
        const $tarjeta = $(this).closest(".tarjetaItem");
        
        const $imgTag = $tarjeta.find("img"); // .find() busca descendientes
        const $h3Tag = $tarjeta.find("h3");

        const rutaActual = $imgTag.attr("src"); // .attr() obtiene o define atributos
        let nuevaImagen;

        do {
            const indice = Math.floor(Math.random() * imagenes.length);
            nuevaImagen = imagenes[indice];
        } while (nuevaImagen.ruta === rutaActual && imagenes.length > 1);

        $imgTag.attr("src", nuevaImagen.ruta);
        $imgTag.attr("alt", nuevaImagen.titulo);
        $h3Tag.text(nuevaImagen.titulo);
    });

});