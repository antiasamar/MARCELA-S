// VARIABLES 
var slidesSep = $(".slideshow-separador .slide-sep"); 
var totalSep = slidesSep.length; 
var actualSep = 0; 

// GENERACIÓN DE LOS PUNTOS 
function generarPuntosSeparador() {
    var contenedorPuntosSep = $("#puntos-separador");
    contenedorPuntosSep.empty();
    
    for (var i = 0; i < totalSep; i++) {
        var claseActiva = (i === 0) ? "punto activo" : "punto";
        contenedorPuntosSep.append('<span class="' + claseActiva + '" data-indice="' + i + '"></span>');
    }
}

if (totalSep > 0) {
    generarPuntosSeparador();
}

var puntosSep = $("#puntos-separador .punto");

function mostrarSeparador(indiceSlide){
    slidesSep.eq(actualSep).fadeOut(); 
    puntosSep.eq(actualSep).removeClass("activo");

    actualSep = indiceSlide; 

    slidesSep.eq(actualSep).fadeIn(); 
    puntosSep.eq(actualSep).addClass("activo");
}

// MOVIMIENTO AUTOMÁTICO 
var automaticoSep = setInterval(function() {
    var n = actualSep + 1;
    if (n === totalSep) { n = 0; }
    mostrarSeparador(n);
}, 3000); 

// CAMBIAR AL PULSAR LOS PUNTOS
puntosSep.on("click", function(){
    var indice = $(this).data("indice");
    mostrarSeparador(indice);
    
    // REINICIO DE MOVIMIENTO AUTOMÁTICO
    clearInterval(automaticoSep);
    automaticoSep = setInterval(function() {
        var n = actualSep + 1;
        if (n === totalSep) { n = 0; }
        mostrarSeparador(n);
    }, 3000);
});