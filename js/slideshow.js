// PASO 1
var slides = $(".slide"); 
var botonNext = $("#siguiente"); 
var botonPrev = $("#anterior"); 
var total = slides.length; 
var actual = 0; 

// GENERACIÓN DINÁMICA DE LOS PUNTOS INDICADORES
function generarPuntos() {
    var contenedorPuntos = $("#puntos-container");
    contenedorPuntos.empty();
    
    for (var i = 0; i < total; i++) {
        var claseActiva = (i === 0) ? "punto activo" : "punto";
        contenedorPuntos.append('<span class="' + claseActiva + '" data-indice="' + i + '"></span>');
    }
}
generarPuntos();

var puntos = $(".punto");

// PASO 2
$("#contador").text((actual + 1) + " / " + total);

function mostrar(indiceSlide){
    slides.eq(actual).fadeOut(); 
    puntos.eq(actual).removeClass("activo");

    actual = indiceSlide; 

    slides.eq(actual).fadeIn(); 
    puntos.eq(actual).addClass("activo");

    $("#contador").text((actual + 1) + " / " + total);
}

// FUNCIONAMIENTO AUTOMÁTICO
var automatico = setInterval(siguiente, 3000); 
var espera; 

function pausar() {
    clearInterval(automatico); 
    clearTimeout(espera); 

    espera = setTimeout(function() {
        automatico = setInterval(siguiente, 3000); 
    }, 4000); 
}

function siguiente() {
    var n = actual + 1; 
    if (n === total) { n = 0; }
    mostrar(n); 
}

function anterior() {
    var n = actual - 1; 
    if (n < 0) { n = total - 1; }
    mostrar(n); 
}

// EVENTOS CON JQUERY (.ON)
botonNext.on("click", function(){
    siguiente(); 
    pausar(); 
}); 

botonPrev.on("click", function(){
    anterior(); 
    pausar(); 
}); 

puntos.on("click", function(){
    var indice = $(this).data("indice");
    mostrar(indice);
    pausar();
});

// PAUSAR EL CARRUSEL AL HACER HOVER SOBRE LA PANTALLA
var pantallaSlideshow = $(".slideshow__pantalla");

pantallaSlideshow.on("mouseenter", function() {
    clearInterval(automatico); // Detiene el cambio automático
    clearTimeout(espera);     // Limpia temporizadores pendientes por si acaso
});

pantallaSlideshow.on("mouseleave", function() {
    clearInterval(automatico); // Nos aseguramos de limpiar cualquier intervalo previo
    automatico = setInterval(siguiente, 3000); // Vuelve a arrancar los 3 segundos
});