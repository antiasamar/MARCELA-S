// INICIALIZAR AOS 
AOS.init({
   duration: 2000, 
   offset: 300, //desplaza a que altura del viewport empeiza la animacion
   once: true, //las animaciones solo se reproducen una vez
});


// TYPED 
var typed = new Typed("#typed", {
      strings: ["VIVIRLO", "","DISFRUTARLO","CONOCERNOS", "COMPARTIRLO", "BAILARLO", "CELEBRARNOS"],
      loop: true,
      typeSpeed: 70, 
      shuffled: true, //orden aleatorio
      backSpeed: 50, 
      backDelay: 1500, 
})