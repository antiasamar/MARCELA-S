/* =========================================================
   Cálculo del precio de las entradas (Completo y Corregido)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
    var MAXIMO_POR_TIPO = 6;

    var formulario = document.querySelector('#ticket-form') || document.querySelector('#formulario-compra');
    var entradas = document.querySelectorAll('.ticket-pill');

    var resumenLista = document.querySelector('#summary-items') || document.querySelector('#resumen-lista');
    var totalTexto = document.querySelector('#total-price') || document.querySelector('#total');
    var botonComprar = document.querySelector('#btn-continue') || document.querySelector('#boton-comprar');
    
    var campoNombre = document.querySelector('#nombre');
    var campoApellidos = document.querySelector('#apellidos');
    var campoEmail = document.querySelector('#email');
    var campoConfirmEmail = document.querySelector('#confirm-email');
    var emailErrorEl = document.querySelector('#email-error');
    var termsCheck = document.querySelector('#terms-check');
    var mensaje = document.querySelector('#mensaje');

    // Elementos del Modal
    var modal = document.getElementById('confirmation-modal');
    var closeModalBtn = document.getElementById('close-modal');
    var modalBuyerEmail = document.getElementById('modal-buyer-email');
    var modalEntriesEl = document.getElementById('modal-summary-entries');
    var modalTotalPriceEl = document.getElementById('modal-total-price');

    function formatearPrecio(numero) {
        return numero + '€';
    }

    function actualizarTotal() {
        var totalEntradas = 0;
        var totalAmount = 0;
        var lineasResumen = '';

        for (var i = 0; i < entradas.length; i++) {
            var entrada = entradas[i];
            var precio = parseFloat(entrada.getAttribute('data-price') || entrada.getAttribute('data-precio') || 0);
            var nombre = entrada.getAttribute('data-name') || entrada.getAttribute('data-nombre');
            
            var qtyDisplay = entrada.querySelector('.qty-value') || entrada.querySelector('.contador__cantidad');
            var cantidad = parseInt(qtyDisplay.textContent, 10) || 0;
            var subtotalEntrada = precio * cantidad;

            var btnMenos = entrada.querySelector('.btn-minus') || entrada.querySelector('.contador__boton--menos');
            var btnMas = entrada.querySelector('.btn-plus') || entrada.querySelector('.contador__boton--mas');

            if (btnMenos) btnMenos.disabled = (cantidad === 0);
            if (btnMas) btnMas.disabled = (cantidad >= MAXIMO_POR_TIPO);

            if (cantidad > 0) {
                // Genera cada línea en formato flex horizontal para separar nombre y precio
                lineasResumen += '<div style="display: flex; justify-content: space-between; width: 100%;"><span>x' + cantidad + ' ' + nombre + '</span><strong>' + formatearPrecio(subtotalEntrada) + '</strong></div>';
            }

            totalEntradas += cantidad;
            totalAmount += subtotalEntrada;
        }

        if (resumenLista) {
            if (totalEntradas === 0) {
                resumenLista.innerHTML = '<div style="display: flex; justify-content: space-between; width: 100%; opacity: 0.65;"><span>Ninguna entrada seleccionada</span><span>0€</span></div>';
            } else {
                resumenLista.innerHTML = lineasResumen;
            }
        }

        if (totalTexto) {
            totalTexto.textContent = formatearPrecio(totalAmount);
        }

        validarFormularioCompleto(totalEntradas);
    }

    function conectarContador(entrada) {
        var btnMenos = entrada.querySelector('.btn-minus') || entrada.querySelector('.contador__boton--menos');
        var btnMas = entrada.querySelector('.btn-plus') || entrada.querySelector('.contador__boton--mas');
        var qtyDisplay = entrada.querySelector('.qty-value') || entrada.querySelector('.contador__cantidad');

        if (btnMas) {
            btnMas.addEventListener('click', function (e) {
                e.preventDefault();
                var cantidad = parseInt(qtyDisplay.textContent, 10) || 0;
                if (cantidad < MAXIMO_POR_TIPO) {
                    qtyDisplay.textContent = cantidad + 1;
                    actualizarTotal();
                }
            });
        }

        if (btnMenos) {
            btnMenos.addEventListener('click', function (e) {
                e.preventDefault();
                var cantidad = parseInt(qtyDisplay.textContent, 10) || 0;
                if (cantidad > 0) {
                    qtyDisplay.textContent = cantidad - 1;
                    actualizarTotal();
                }
            });
        }
    }

    for (var i = 0; i < entradas.length; i++) {
        conectarContador(entradas[i]);
    }

    function validarFormularioCompleto(totalEntradasForzado) {
        var totalEntradas = totalEntradasForzado;
        if (totalEntradas === undefined) {
            totalEntradas = 0;
            for (var i = 0; i < entradas.length; i++) {
                var q = entradas[i].querySelector('.qty-value') || entradas[i].querySelector('.contador__cantidad');
                totalEntradas += parseInt(q.textContent, 10) || 0;
            }
        }
        var hasTickets = totalEntradas > 0;

        var nombreValid = campoNombre && campoNombre.value.trim().length > 0;
        var apellidosValid = campoApellidos && campoApellidos.value.trim().length > 0;

        var emailVal = campoEmail ? campoEmail.value.trim() : '';
        var confirmEmailVal = campoConfirmEmail ? campoConfirmEmail.value.trim() : '';
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var emailValid = emailRegex.test(emailVal);
        var emailsMatch = emailVal !== '' && emailVal === confirmEmailVal;

        if (campoConfirmEmail && emailErrorEl) {
            if (confirmEmailVal.length > 0 && !emailsMatch) {
                emailErrorEl.style.display = 'block';
                campoConfirmEmail.classList.add('input-invalid');
            } else {
                emailErrorEl.style.display = 'none';
                campoConfirmEmail.classList.remove('input-invalid');
            }
        }

        var termsAccepted = termsCheck ? termsCheck.checked : true;

        var isComplete = hasTickets && nombreValid && apellidosValid && emailValid && emailsMatch && termsAccepted;
        if (botonComprar) {
            botonComprar.disabled = !isComplete;
        }
        return isComplete;
    }

    var inputsValidacion = [campoNombre, campoApellidos, campoEmail, campoConfirmEmail, termsCheck];
    for (var j = 0; j < inputsValidacion.length; j++) {
        if (inputsValidacion[j]) {
            inputsValidacion[j].addEventListener('input', function () { validarFormularioCompleto(); });
            inputsValidacion[j].addEventListener('change', function () { validarFormularioCompleto(); });
        }
    }

    if (formulario) {
        formulario.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validarFormularioCompleto()) return;

            var emailVal = campoEmail ? campoEmail.value.trim() : '';
            if (modalBuyerEmail) {
                modalBuyerEmail.textContent = emailVal;
            }

            var textoEntradas = [];
            var totalPago = 0;

            for (var k = 0; k < entradas.length; k++) {
                var qDisp = entradas[k].querySelector('.qty-value') || entradas[k].querySelector('.contador__cantidad');
                var qty = parseInt(qDisp.textContent, 10) || 0;
                if (qty > 0) {
                    var precio = parseFloat(entradas[k].getAttribute('data-price') || entradas[k].getAttribute('data-precio') || 0);
                    var nom = entradas[k].getAttribute('data-name') || entradas[k].getAttribute('data-nombre');
                    totalPago += qty * precio;
                    textoEntradas.push(qty + 'x ' + nom);
                }
            }

            if (modalEntriesEl) {
                modalEntriesEl.textContent = textoEntradas.join(', ');
            }

            if (modalTotalPriceEl) {
                modalTotalPriceEl.textContent = formatearPrecio(totalPago);
            }

            if (modal) {
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                // Desactiva el scroll de la página al abrir la modal
                document.body.style.overflow = 'hidden';
            }
        });
    }

    function cerrarModal() {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            // Restaura el scroll de la página al cerrar la modal
            document.body.style.overflow = '';
        }
        for (var l = 0; l < entradas.length; l++) {
            var qDisp = entradas[l].querySelector('.qty-value') || entradas[l].querySelector('.contador__cantidad');
            if (qDisp) qDisp.textContent = '0';
        }
        if (campoNombre) campoNombre.value = '';
        if (campoApellidos) campoApellidos.value = '';
        if (campoEmail) campoEmail.value = '';
        if (campoConfirmEmail) campoConfirmEmail.value = '';
        if (termsCheck) termsCheck.checked = false;
        actualizarTotal();
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', cerrarModal);
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) cerrarModal();
        });
    }

    actualizarTotal();
});