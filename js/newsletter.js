// VARIABLES
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
    evento.preventDefault(); 

    // RESET FORMULARIO
    vistaForm.classList.remove("is-oculto");
    vistaExito.classList.add("is-oculto");
    formulario.reset();
    btnSuscribir.disabled = true;

    modal.classList.add("is-abierta");

    // BLOQUEO SCROLL
    document.body.style.overflow = "hidden";

    // PAUSA CARRUSEL EVENTOS
    document.body.classList.add("modal-abierto");

    // PAUSA SLIDESHOW HOME
    if (typeof pausarSeparador === "function") {
        pausarSeparador();
    }
}


// FUNCIÓN QUE CIERRA LA VENTANA MODAL
function modalCerrar() {
    modal.classList.remove("is-abierta");

    // RESTAURAR SCROLL
    document.body.style.overflow = "";

    // REANUDAR CARRUSEL
    document.body.classList.remove("modal-abierto");

    // REANUDAR SLIDESHOW
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
    evento.preventDefault(); 

    // OCULTAR FORMULARIO Y MOSTRAR MENSAJE BIENVENIDA
    vistaForm.classList.add("is-oculto");
    vistaExito.classList.remove("is-oculto");
}


// EVENTOS

// ABRIR CON TODOS LOS BOTONES .btn-trigger
for (var i = 0; i < botonesAbrir.length; i++) {
    botonesAbrir[i].addEventListener("click", abrirModal);
}

cerrarModal.addEventListener("click", modalCerrar);

// CAMPOS RELLENOS
inputNombre.addEventListener("input", validarFormulario);
inputApellidos.addEventListener("input", validarFormulario);
inputEmail.addEventListener("input", validarFormulario);
inputConfirmar.addEventListener("input", validarFormulario);

// ENVÍO FORMULARIO
formulario.addEventListener("submit", enviarSuscripcion);