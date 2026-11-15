document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("artistasTrack");
    if (track) {
        // Guardamos el contenido original
        const contenidoOriginal = track.innerHTML;
        
        // Duplicamos el contenido varias veces para garantizar que cubra pantallas 2K / ultra-anchas
        track.innerHTML = contenidoOriginal + contenidoOriginal + contenidoOriginal;
    }
});