//MENÚ RESPONSIVE

// ABRIR MENU 
$(".menu-btn").on("click", function() {
    $(".menu").slideToggle(); 
    $(this).toggleClass("abierto"); 
}); 

// CERRAR MENU
$(".menu a").on("click", function() {
    $(".menu").slideUp(); 
    $(".menu-btn").removeClass("abierto")
})

