// 1. Seleccionamos todos los botones de filtro
var filtros = document.querySelectorAll(".filtro");
console.log(filtros);

// 2. Recorremos los botones para detectar el clic
for (var k = 0; k < filtros.length; k++) {

    filtros[k].addEventListener("click", function() {

        // Obtenemos el valor del filtro (ej. "Todos", "Cultura", "Espectaculo", "Fiesta")
        var tipoEvento = this.getAttribute("data-dia"); 
        console.log("Filtro seleccionado: " + tipoEvento);

        // Gestionamos las clases activas en los botones
        for (var i = 0; i < filtros.length; i++) {
            filtros[i].classList.remove("is-activo");
        }
        this.classList.add("is-activo");

        // Llamamos a la función que filtra las tarjetas
        filtrarEventos(tipoEvento);
    });
}

// 3. Función para mostrar u ocultar las tarjetas de forma limpia
function filtrarEventos(filtro) {
    // Seleccionamos los enlaces <a> que son hijos directos del grid
    var tarjetas = document.querySelectorAll(".eventos-container > a");

    for (var j = 0; j < tarjetas.length; j++) {
        var tarjeta = tarjetas[j];
        
        // Buscamos el div interno que contiene la clase del tipo (ej. .espectaculo, .cultura, .fiesta)
        var contenidoTarjeta = tarjeta.querySelector(".eventos-tarjeta");

        // Si el filtro es "Todos" o la tarjeta contiene la clase correspondiente al filtro
        if (filtro === "Todos" || contenidoTarjeta.classList.contains(filtro.toLowerCase())) {
            tarjeta.classList.remove("oculto"); // Se muestra y respeta el Grid y el centrado
        } else {
            tarjeta.classList.add("oculto");    // Se oculta por completo sin romper nada
        }
    }
}