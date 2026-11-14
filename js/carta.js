

    // 1. ACORDEÓN (Lógica de clase explicada en clase)
    $(".acordeon__titulo").on("click", function() {

        var contenido = $(this).next();

        // Cerrar los demás apartados
        $(".acordeon__contenido").not(contenido).slideUp();
        $(".acordeon__titulo").not(this).removeClass("abierto");

        // Abrir o cerrar el actual
        contenido.slideToggle();
        $(this).toggleClass("abierto");
    });


    // 2. HOVER IN Y HOVER OUT PARA LAS FOTOS DE LOS PLATOS
    $(".plato").hover(
        // Hover In
        function() {
            var idFoto = $(this).attr("data-foto");
            $(idFoto).stop(true, true).fadeIn(200);
        }, 
        // Hover Out
        function() {
            var idFoto = $(this).attr("data-foto");
            $(idFoto).stop(true, true).fadeOut(200);
        }
    );

