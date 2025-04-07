const listPetCard = document.querySelectorAll(".pet-card");
const addAppointmentButton = document.querySelector(".add-appointment");

listPetCard.forEach((petCard) => {
  petCard.addEventListener("click", () => {
    // Criar o elemento principal (modal-Dashboard)
    const modalDashboard = document.createElement("div");
    modalDashboard.classList.add("modal-dashboard");

    // Criar o botão de fechar (close)
    const closeButton = document.createElement("div");
    closeButton.classList.add("close");
    closeButton.textContent = "X";
    modalDashboard.appendChild(closeButton);

    // Criar o perfil do pet (profile-pet-modal)
    const profilePetModal = document.createElement("div");
    profilePetModal.classList.add("profile-pet-modal");

    // Adicionar a imagem do pet
    const petImage = document.createElement("img");
    petImage.src = "../../assets/images/dog.png";
    petImage.alt = "Foto do pet";
    profilePetModal.appendChild(petImage);

    // Criar as informações do pet (pet-info-modal)
    const petInfoModal = document.createElement("div");
    petInfoModal.classList.add("pet-info-modal");

    const petName = document.createElement("h3");
    petName.textContent = "Tobias";
    petInfoModal.appendChild(petName);

    const petDetails = document.createElement("p");
    petDetails.innerHTML =
      "<span>Idade</span>-<span>Gênero</span>-<span>Peso</span>";
    petInfoModal.appendChild(petDetails);

    profilePetModal.appendChild(petInfoModal);

    // Adicionar raça e nome do dono
    const petBreed = document.createElement("h3");
    petBreed.textContent = "Labrador";
    profilePetModal.appendChild(petBreed);

    const ownerName = document.createElement("h3");
    ownerName.textContent = "Guilherme Oliveira Alves";
    profilePetModal.appendChild(ownerName);

    modalDashboard.appendChild(profilePetModal);

    // Criar a seção de registros do pet (record-of-pet)
    const recordOfPet = document.createElement("div");
    recordOfPet.classList.add("record-of-pet");

    // Criar o histórico de consultas (record-appointments)
    const recordAppointments = document.createElement("div");
    recordAppointments.classList.add("record-appointments");

    const appointmentsTitle = document.createElement("h3");
    appointmentsTitle.textContent = "Histórico de consultas";
    recordAppointments.appendChild(appointmentsTitle);

    const appointmentsRecord = document.createElement("div");
    appointmentsRecord.classList.add("record");

    // // Adicionar consultas ao histórico
    // for (let i = 0; i < 7; i++) {
    //   const appointment = document.createElement("p");
    //   appointment.innerHTML =
    //     "dd/mm/aaaaa - (consulta de *********) <span>Dr.Shinizi</span>";
    //   appointmentsRecord.appendChild(appointment);
    // }

    recordAppointments.appendChild(appointmentsRecord);
    recordOfPet.appendChild(recordAppointments);

    // Criar a seção de vacinas (record-vaccines)
    const recordVaccines = document.createElement("div");
    recordVaccines.classList.add("record-vaccines");

    const vaccinesTitle = document.createElement("h3");
    vaccinesTitle.textContent = "Vacinas tomadas";
    recordVaccines.appendChild(vaccinesTitle);

    const vaccinesRecord = document.createElement("div");
    vaccinesRecord.classList.add("record");

    // // Adicionar vacinas ao histórico
    // for (let i = 0; i < 7; i++) {
    //   const vaccine = document.createElement("p");
    //   vaccine.textContent = "Vacina da gripe dd/mm/aaaaa";
    //   vaccinesRecord.appendChild(vaccine);
    // }

    recordVaccines.appendChild(vaccinesRecord);
    recordOfPet.appendChild(recordVaccines);

    // Criar a seção de alergias (allergies)
    const allergiesSection = document.createElement("div");
    allergiesSection.classList.add("allergies");

    const allergiesTitle = document.createElement("h3");
    allergiesTitle.textContent = "Alergias";
    allergiesSection.appendChild(allergiesTitle);

    const allergiesRecord = document.createElement("div");
    allergiesRecord.classList.add("record");

    // // Adicionar alergias ao histórico
    // for (let i = 0; i < 7; i++) {
    //   const allergy = document.createElement("p");
    //   allergy.textContent = "Alergia a *****";
    //   allergiesRecord.appendChild(allergy);
    // }

    allergiesSection.appendChild(allergiesRecord);
    recordOfPet.appendChild(allergiesSection);

    modalDashboard.appendChild(recordOfPet);

    // Criar a seção de novo agendamento (new-appointment)
    const newAppointment = document.createElement("div");
    newAppointment.classList.add("new-appointment");

    // Título do novo agendamento
    const title = document.createElement("div");
    title.classList.add("title");

    const titleIcon = document.createElement("img");
    titleIcon.src = "../../assets/images/new-appointment.png";
    titleIcon.alt = "Ícone de novo agendamento";

    const titleText = document.createElement("h1");
    titleText.appendChild(titleIcon);
    titleText.appendChild(document.createTextNode("Novo Agendamento"));

    title.appendChild(titleText);
    newAppointment.appendChild(title);

    // Formulário de novo agendamento
    const form = document.createElement("form");

    const inputsContainer = document.createElement("div");
    inputsContainer.classList.add("inputs");

    // Campo de data
    const dateInputContainer = document.createElement("div");
    const dateLabel = document.createElement("p");
    dateLabel.textContent = "Data";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "date";
    dateInputContainer.appendChild(dateLabel);
    dateInputContainer.appendChild(dateInput);
    inputsContainer.appendChild(dateInputContainer);

    // Campo de tipo de consulta
    const typeInputContainer = document.createElement("div");
    const typeLabel = document.createElement("p");
    typeLabel.textContent = "Tipo de Consulta";
    const typeInput = document.createElement("input");
    typeInput.type = "text";
    typeInputContainer.appendChild(typeLabel);
    typeInputContainer.appendChild(typeInput);
    inputsContainer.appendChild(typeInputContainer);

    // Campo de doutor(a)
    const doctorInputContainer = document.createElement("div");
    const doctorLabel = document.createElement("p");
    doctorLabel.textContent = "Doutor(a)";
    const doctorInput = document.createElement("input");
    doctorInput.type = "text";
    doctorInputContainer.appendChild(doctorLabel);
    doctorInputContainer.appendChild(doctorInput);
    inputsContainer.appendChild(doctorInputContainer);

    form.appendChild(inputsContainer);

    // Botão de confirmar
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirmar";
    form.appendChild(confirmButton);

    newAppointment.appendChild(form);
    modalDashboard.appendChild(newAppointment);

    // Adicionar o modal-agenda ao corpo do documento
    document.body.appendChild(modalDashboard);

    const modalCloseButton = modalDashboard.querySelector(".close");
    modalCloseButton.addEventListener("click", () => {
      modalDashboard.remove();
    });
  });
});
