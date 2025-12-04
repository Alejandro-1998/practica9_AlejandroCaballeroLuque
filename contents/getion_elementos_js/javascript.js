const btnAgregar = document.querySelector("#btnAgregar")
const btnFondo = document.querySelector("#btnFondo")
const contenedorElementos = document.querySelector("#contenedorElementos")

const imagenes = [
    { ruta: "img/sceptile.png", titulo: "Sceptile" },
    { ruta: "img/rayquaza.png", titulo: "Rayquaza" },
    { ruta: "img/bulbasaur.png", titulo: "Bulbasaur" },
    { ruta: "img/electrofuria.png", titulo: "Electrofuria" },
]

btnAgregar.addEventListener("click", () => {

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

    contenedorElementos.insertAdjacentHTML('beforeend', elemento);
})

btnFondo.addEventListener("click", () => {

    const colorInput = document.querySelector("#colorInput").value
    const root = document.documentElement

    root.style.setProperty('--color-primario', colorInput);
})

contenedorElementos.addEventListener("click", (elemento) => {

    // BORRAR
    const btnBorrar = elemento.target.closest(".btnBorrar") // Verifica si se ha clicado en un elemento con la clase 'btnBorrar'

    if (btnBorrar) {
        const tarjetaItem = btnBorrar.closest(".tarjetaItem")

        if (tarjetaItem) {
            tarjetaItem.remove()
        }
    }

    // CAMBIAR
    const btnCambiar = elemento.target.closest(".btnCambiar")

    if (btnCambiar) {
        const tarjetaItem = btnCambiar.closest(".tarjetaItem");
        const imagenTag = tarjetaItem.querySelector("img");
        const tituloTag = tarjetaItem.querySelector("h3");

        const rutaActual = imagenTag.getAttribute("src");
        let nuevaImagen;

        do {
            const indice = Math.floor(Math.random() * imagenes.length);
            nuevaImagen = imagenes[indice];

        } while (nuevaImagen.ruta === rutaActual && imagenes.length > 1)

        imagenTag.src = nuevaImagen.ruta;
        imagenTag.alt = nuevaImagen.titulo;
        tituloTag.textContent = nuevaImagen.titulo;
    }
})