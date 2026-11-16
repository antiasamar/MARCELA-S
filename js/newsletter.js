// // SELECCIÓN DE ELEMENTOS DEL DOM
// var modal = document.querySelector("#modal-newsletter");
// var botonesAbrir = document.querySelectorAll(".btn-trigger");
// var cerrarModal = document.querySelector("#modal-cerrar");

// var vistaForm = document.querySelector("#modal-vista-form");
// var vistaExito = document.querySelector("#modal-vista-exito");
// var formulario = document.querySelector("#form-newsletter");

// var inputNombre = document.querySelector("#input-nombre");
// var inputApellidos = document.querySelector("#input-apellidos");
// var inputEmail = document.querySelector("#input-email");
// var inputConfirmar = document.querySelector("#input-confirmar");
// var btnSuscribir = document.querySelector("#btn-suscribir");


// // FUNCIÓN QUE ABRE LA VENTANA MODAL
// function abrirModal(evento) {
//     evento.preventDefault(); // Evita que los enlaces <a> salten al principio de la página

//     // Reseteamos las vistas y el formulario cada vez que se abre
//     vistaForm.classList.remove("is-oculto");
//     vistaExito.classList.add("is-oculto");
//     formulario.reset();
//     btnSuscribir.disabled = true;

//     modal.classList.add("is-abierta");

//     // Bloquea el scroll de la página de abajo
//     document.body.style.overflow = "hidden";

//     // Pausa el carrusel al abrir la modal
//     document.body.classList.add("modal-abierto");
// }


// // FUNCIÓN QUE CIERRA LA VENTANA MODAL
// function modalCerrar() {
//     modal.classList.remove("is-abierta");

//     // Restaura el scroll de la página de abajo
//     document.body.style.overflow = "";

//     // Reanuda el carrusel al cerrar la modal
//     document.body.classList.remove("modal-abierto");
// }


// // FUNCIÓN QUE COMPRUEBA SI TODOS LOS CAMPOS ESTÁN COMPLETOS
// function validarFormulario() {
//     var nombreValido = inputNombre.value.trim() !== "";
//     var apellidosValido = inputApellidos.value.trim() !== "";
//     var emailValido = inputEmail.value.trim() !== "" && inputEmail.value.indexOf("@") !== -1;
//     var confirmarValido = inputConfirmar.value.trim() !== "" && inputEmail.value.trim() === inputConfirmar.value.trim();

//     if (nombreValido && apellidosValido && emailValido && confirmarValido) {
//         btnSuscribir.disabled = false;
//     } else {
//         btnSuscribir.disabled = true;
//     }
// }


// // FUNCIÓN AL ENVIAR EL FORMULARIO
// function enviarSuscripcion(evento) {
//     evento.preventDefault(); // Evita que la página se recargue

//     // Ocultamos el formulario y mostramos el mensaje de bienvenida en la misma ventana
//     vistaForm.classList.add("is-oculto");
//     vistaExito.classList.remove("is-oculto");
// }


// // EVENTOS

// // Asignamos la función de abrir a todos los enlaces con .btn-trigger
// for (var i = 0; i < botonesAbrir.length; i++) {
//     botonesAbrir[i].addEventListener("click", abrirModal);
// }

// cerrarModal.addEventListener("click", modalCerrar);

// // Escuchamos cada vez que el usuario escribe en cualquiera de los 4 campos
// inputNombre.addEventListener("input", validarFormulario);
// inputApellidos.addEventListener("input", validarFormulario);
// inputEmail.addEventListener("input", validarFormulario);
// inputConfirmar.addEventListener("input", validarFormulario);

// // Escuchamos el envío del formulario
// formulario.addEventListener("submit", enviarSuscripcion);

// SELECCIÓN DE ELEMENTOS DEL DOM
var modal = document.querySelector("#modal-newsletter");
var botonesAbrir = document.querySelectorAll(".btn-trigger");
var cerrarModal = document.querySelector("#modal-cerrar");

var vistaForm = document.querySelector("#modal-vista-form");
var vistaExito = document.querySelector("#modal-vista-exito");
var formulario = document.querySelector("#form-newsletter");

var inputNombre = document.querySelector("#input-nombre");
var inputApellidos = document.querySelector("#input-apellidos");
var inputEmail = document.querySelector("#input-email");
var inputConfirmar = document.querySelector("#input-confirmar");
var btnSuscribir = document.querySelector("#btn-suscribir");


// FUNCIÓN QUE ABRE LA VENTANA MODAL
function abrirModal(evento) {
    evento.preventDefault(); // Evita que los enlaces <a> salten al principio de la página

    // Reseteamos las vistas y el formulario cada vez que se abre
    vistaForm.classList.remove("is-oculto");
    vistaExito.classList.add("is-oculto");
    formulario.reset();
    btnSuscribir.disabled = true;

    modal.classList.add("is-abierta");

    // Bloquea el scroll de la página de abajo
    document.body.style.overflow = "hidden";

    // Pausa el carrusel horizontal (Eventos)
    document.body.classList.add("modal-abierto");

    // Pausa el slideshow separador (Inicio)
    if (typeof pausarSeparador === "function") {
        pausarSeparador();
    }
}


// FUNCIÓN QUE CIERRA LA VENTANA MODAL
function modalCerrar() {
    modal.classList.remove("is-abierta");

    // Restaura el scroll de la página de abajo
    document.body.style.overflow = "";

    // Reanuda el carrusel horizontal (Eventos)
    document.body.classList.remove("modal-abierto");

    // Reinicia el slideshow separador desde la primera foto (Inicio)
    if (typeof mostrarSeparador === "function" && typeof iniciarSeparador === "function") {
        mostrarSeparador(0);
        iniciarSeparador();
    }
}


// FUNCIÓN QUE COMPRUEBA SI TODOS LOS CAMPOS ESTÁN COMPLETOS
function validarFormulario() {
    var nombreValido = inputNombre.value.trim() !== "";
    var apellidosValido = inputApellidos.value.trim() !== "";
    var emailValido = inputEmail.value.trim() !== "" && inputEmail.value.indexOf("@") !== -1;
    var confirmarValido = inputConfirmar.value.trim() !== "" && inputEmail.value.trim() === inputConfirmar.value.trim();

    if (nombreValido && apellidosValido && emailValido && confirmarValido) {
        btnSuscribir.disabled = false;
    } else {
        btnSuscribir.disabled = true;
    }
}


// FUNCIÓN AL ENVIAR EL FORMULARIO
function enviarSuscripcion(evento) {
    evento.preventDefault(); // Evita que la página se recargue

    // Ocultamos el formulario y mostramos el mensaje de bienvenida en la misma ventana
    vistaForm.classList.add("is-oculto");
    vistaExito.classList.remove("is-oculto");
}


// EVENTOS

// Asignamos la función de abrir a todos los enlaces con .btn-trigger
for (var i = 0; i < botonesAbrir.length; i++) {
    botonesAbrir[i].addEventListener("click", abrirModal);
}

cerrarModal.addEventListener("click", modalCerrar);

// Escuchamos cada vez que el usuario escribe en cualquiera de los 4 campos
inputNombre.addEventListener("input", validarFormulario);
inputApellidos.addEventListener("input", validarFormulario);
inputEmail.addEventListener("input", validarFormulario);
inputConfirmar.addEventListener("input", validarFormulario);

// Escuchamos el envío del formulario
formulario.addEventListener("submit", enviarSuscripcion);