// QUITAR DELAYS EN TABLET Y MOBILE
if (window.innerWidth <= 768) {
    var elementosConDelay = document.querySelectorAll("[data-aos-delay]");
    for (var i = 0; i < elementosConDelay.length; i++) {
        elementosConDelay[i].removeAttribute("data-aos-delay");
    }
}

// INICIALIZAR AOS 
AOS.init({
   duration: 2000, 
   offset: 200, 
   once: true, 
});


// TYPED 
var elementoTyped = document.querySelector("#typed");
//LO EJECUTA SOLO SI existe # typed Y SI ESTÁ CARGADA LA LIBRERÍA EN LA PÁGINA DE HTML
if (elementoTyped && typeof Typed !== "undefined") {
    var typed = new Typed("#typed", {
        strings: ["VIVIRLO", "DISFRUTARLO", "CONOCERNOS", "COMPARTIRLO", "BAILARLO", "CELEBRARNOS"],
        loop: true,
        typeSpeed: 70, 
        shuffled: true, 
        backSpeed: 50, 
        backDelay: 1500 
    });
}