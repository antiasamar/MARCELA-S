document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservaForm");
  const submitBtn = document.getElementById("submitBtn");
  
  const comensalesSelect = document.getElementById("comensales");
  const horaSelect = document.getElementById("hora");
  const zonaSelect = document.getElementById("zona");
  const nombreInput = document.getElementById("nombre");
  const apellidosInput = document.getElementById("apellidos");
  const emailInput = document.getElementById("email");
  const confirmEmailInput = document.getElementById("confirm-email");

  const dayCells = document.querySelectorAll(".day-cell:not(.disabled)");
  let selectedDate = ""; // Inicia vacío obligando al usuario a seleccionar un día

  const modal = document.getElementById("confirmation-modal");
  const closeModalBtn = document.getElementById("close-modal");
  
  const resFecha = document.getElementById("resumen-fecha");
  const resHora = document.getElementById("resumen-hora");
  const resComensales = document.getElementById("resumen-comensales");
  const resEmail = document.getElementById("resumen-email");

  // Selección de fecha en calendario de forma interactiva
  dayCells.forEach(cell => {
    cell.addEventListener("click", (e) => {
      e.preventDefault();
      dayCells.forEach(c => c.classList.remove("selected"));
      cell.classList.add("selected");
      
      const dayNum = cell.getAttribute("data-day").padStart(2, '0');
      selectedDate = `${dayNum}/12/2026`;
      validateForm();
    });
  });

  // Escuchar cambios para la validación estricta
  const inputsToWatch = [
    comensalesSelect, horaSelect, zonaSelect, 
    nombreInput, apellidosInput, emailInput, confirmEmailInput
  ];

  inputsToWatch.forEach(input => {
    input.addEventListener("input", validateForm);
    input.addEventListener("change", validateForm);
  });

  function validateForm() {
    const allFilled = selectedDate &&
                      comensalesSelect.value && 
                      horaSelect.value && 
                      zonaSelect.value && 
                      nombreInput.value.trim() && 
                      apellidosInput.value.trim() && 
                      emailInput.value.trim() && 
                      confirmEmailInput.value.trim() && 
                      (emailInput.value.trim() === confirmEmailInput.value.trim());

    if (allFilled) {
      submitBtn.classList.add("enabled");
      submitBtn.removeAttribute("disabled");
    } else {
      submitBtn.classList.remove("enabled");
      submitBtn.setAttribute("disabled", "true");
    }
  }

  // Enviar formulario y abrir modal con datos volcados
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    resFecha.textContent = selectedDate;
    resHora.textContent = horaSelect.value;
    resComensales.textContent = comensalesSelect.value;
    resEmail.textContent = emailInput.value;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  });

  // Cerrar modal
  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }
  });
});