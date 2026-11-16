// CARRUSEL ARTISTAS INVITADAS 

//JS ESPERA A QUE SE CARGE TODO EL HTML
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("artistasTrack");
    if (track) {
        // CONTENIDO ORIGINAL
        const contenidoOriginal = track.innerHTML;
        
        // DUPLICAR CONTENIDO PARA EFECTO LOOP INFINITO
        track.innerHTML = contenidoOriginal + contenidoOriginal + contenidoOriginal;
    }
});