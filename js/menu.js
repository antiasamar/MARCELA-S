//MENÚ RESPONSIVE

$(".menu-btn").on("click", function() {
    $(".menu").slideToggle(); 
    $(this).toggleClass("abierto"); 
}); 


$(".menu a").on("click", function() {
    $(".menu").slideUp(); 
    $(".menu-btn").removeClass("abierto")
})

