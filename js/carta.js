

    // 1. ACORDEÓN 
    $(".acordeon__titulo").on("click", function() {

        var contenido = $(this).next();

        // CERRAR LOS DEMÁS APARTADOS
        $(".acordeon__contenido").not(contenido).slideUp();
        $(".acordeon__titulo").not(this).removeClass("abierto");

        // ABRIR APARTADOS
        contenido.slideToggle();
        $(this).toggleClass("abierto");
    });


    // 2. HOVER IN Y HOVER OUT PARA LAS FOTOS DE LOS PLATOS
    $(".plato").hover(
        
        // HOVER IN
        function() {
            var idFoto = $(this).attr("data-foto");
            $(idFoto).stop(true, true).fadeIn(200);
        }, 

        // HOVE ROUT
        function() {
            var idFoto = $(this).attr("data-foto");
            $(idFoto).stop(true, true).fadeOut(200);
        }
    );

