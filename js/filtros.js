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
        var contenidoTarjeta = tarjeta.querySelector(".eventos-tarjeta");

        // DESACTIVAR AOS PARA QUE NO HAYA ANIMACIÓN AL FILTRAR
        tarjeta.removeAttribute("data-aos");
        tarjeta.removeAttribute("data-aos-delay");
        contenidoTarjeta.removeAttribute("data-aos");
        contenidoTarjeta.removeAttribute("data-aos-delay");

        // MOSTRAR U OCULTAR SEGÚN EL FILTRO
        if (filtro === "Todos" || contenidoTarjeta.classList.contains(filtro.toLowerCase())) {
            tarjeta.classList.remove("oculto");
        } else {
            tarjeta.classList.add("oculto");
        }
    }

    // RECALCULAR POSICIONES DEL RESTO DE LA PÁGINA (CARRUSEL Y FOOTER)
    if (typeof AOS !== "undefined") {
        AOS.refreshHard();
    }
}

// CARRUSEL EVENTOS PASADOS

var pistaPasados = document.getElementById("carruselPasados");

if (pistaPasados) {
    // DUPLICAR COLUMNAS PARA CREAR EFECTO DE LOOP INFINITO
    pistaPasados.innerHTML += pistaPasados.innerHTML;
}