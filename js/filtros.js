// VARIABLES 
var filtros = document.querySelectorAll(".filtro");
console.log(filtros);

// DETECTAR CLICK EN BOTONES
for (var k = 0; k < filtros.length; k++) {

    filtros[k].addEventListener("click", function() {

        // SABER QUÉ BOTÓN SE HA PULSADO
        var tipoEvento = this.getAttribute("data-dia"); 
        console.log("Filtro seleccionado: " + tipoEvento);

        // GESTIÓN DE CLASES ACTIVAS
        for (var i = 0; i < filtros.length; i++) {
            filtros[i].classList.remove("is-activo");
        }
        this.classList.add("is-activo");

        // LLAMAMOS A LA FUNCIÓN DE filtrarEventos
        filtrarEventos(tipoEvento);
    });
}

// FUNCIÓN PARA MOSTRAR/OCULTAR TARJETAS
function filtrarEventos(filtro) {
    var tarjetas = document.querySelectorAll(".eventos-container > a");

    for (var j = 0; j < tarjetas.length; j++) {
        var tarjeta = tarjetas[j];
        
        // BUSCAR EL DIV CON LA CLASE ASOCIADA AL BOTÓN
        var contenidoTarjeta = tarjeta.querySelector(".eventos-tarjeta");

        // DIFERENCIAR FILTRO TODOS DE CLASES CONCRETAS
        if (filtro === "Todos" || contenidoTarjeta.classList.contains(filtro.toLowerCase())) {
            tarjeta.classList.remove("oculto"); //SE MUESTRA
        } else {
            tarjeta.classList.add("oculto"); //SE OCULTA
        }
    }
}

// CARRUSEL EVENTOS PASADOS

var pistaPasados = document.getElementById("carruselPasados");

if (pistaPasados) {
    // DUPLICAR COLUMNAS PARA CREAR EFECTO DE LOOP INFINITO
    pistaPasados.innerHTML += pistaPasados.innerHTML;
}