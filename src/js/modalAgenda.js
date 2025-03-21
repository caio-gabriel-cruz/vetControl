document.addEventListener("DOMContentLoaded", function () {
  const addProfilePet = document.querySelector(".add-pet");
  const modalAddProfilePet = document.querySelector(".modal-add-pet-profile");
  const main = document.querySelector("main");
  const dateInput = document.querySelector('input[type=date');
  const modalAddProfilePetClose = document.querySelector(
    ".modal-add-pet-profile .close"
  );
  const dataAtual = new Date;
  let diaAtual = dataAtual.getDate();
  let mesAtual = dataAtual.getMonth() + 1;
  let anoAtual = dataAtual.getFullYear();
  mesAtual = mesAtual < 10 ? `0${mesAtual}` : mesAtual;
  diaAtual = diaAtual < 10 ? `0${diaAtual}` : diaAtual;
  dateInput.setAttribute('max', `${anoAtual}-${mesAtual}-${diaAtual}`);
  const formAddPet = modalAddProfilePet.querySelector("form");


    // Exibe o modal ao clicar no botão de adicionar pet
    addProfilePet.addEventListener("click", () => {
      console.log("click");
      modalAddProfilePet.style.display = "block";
      main.classList.add("invisible");
    });

  // Função carrega os dados dos cards
  function carregaDados() {
    const appointmentsList = document.querySelector(".appointments-list");
    if (!appointmentsList) return; // Verifica se o elemento existe
    appointmentsList.innerHTML = ""; // Limpa a lista

    // Recupera os cards
    const pets = JSON.parse(localStorage.getItem("pets")) || [];

    // Cria os cards
    pets.forEach((pet) => {
      const appointmentCard = document.createElement("div");
      appointmentCard.classList.add("appointment");

      const petInfoDiv = document.createElement("div");
      petInfoDiv.classList.add("pet-info");

      const appointmentImg = document.createElement("img");
      appointmentImg.alt = "";
      // Se a espécie for "gato" (independentemente de maiúsculas/minúsculas), usa a imagem do gato
      appointmentImg.src =
        pet.especie === "gato"
          ? "../../assets/images/cat.png"
          : "../../assets/images/dog.png";

      const h2Appointment = document.createElement("h2");
      h2Appointment.textContent = `${pet.petNome} (${pet.petRaca})`;

      const pTutorAppointment = document.createElement("p");
      pTutorAppointment.textContent = `Tutor: ${pet.tutorNome}`;

      petInfoDiv.appendChild(appointmentImg);
      petInfoDiv.appendChild(h2Appointment);
      petInfoDiv.appendChild(pTutorAppointment);

      appointmentCard.appendChild(petInfoDiv);

      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("buttons");

      const buttonConfirmado = document.createElement("button");
      buttonConfirmado.textContent = "Confirmado";

      const buttonServico = document.createElement("button");
      buttonServico.textContent = pet.tipoConsulta;

      buttonsDiv.appendChild(buttonConfirmado);
      buttonsDiv.appendChild(buttonServico);

      appointmentCard.appendChild(buttonsDiv);

      const dateInfoDiv = document.createElement("div");
      dateInfoDiv.classList.add("date-info");

      const divData = document.createElement("div");
      const spanDataLabel = document.createElement("span");
      spanDataLabel.textContent = "Data:";
      const spanData = document.createElement("span");
      spanData.textContent = pet.dataConsulta;
      divData.appendChild(spanDataLabel);
      divData.appendChild(spanData);

      const divDoutor = document.createElement("div");
      const spanDoutorLabel = document.createElement("span");
      spanDoutorLabel.textContent = "Doutor(a):";
      const spanDoutor = document.createElement("span");
      spanDoutor.textContent = pet.doutor;
      divDoutor.appendChild(spanDoutorLabel);
      divDoutor.appendChild(spanDoutor);

      dateInfoDiv.appendChild(divData);
      dateInfoDiv.appendChild(divDoutor);

      appointmentCard.appendChild(dateInfoDiv);

      appointmentsList.appendChild(appointmentCard);
    });
  }

  // Função para salvar os dados no LS
  function salvaDados(pet) {
    let pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.push(pet);
    localStorage.setItem("pets", JSON.stringify(pets));
  }

  // Função para validar os nomes
  const validaNome = (nome) => {
    if (/\d/.test(nome)) {
      console.log("Campo nome contém caracteres inválidos");
      return null;
    }

    if (nome.length < 3) {
      console.log("Campo nome vazio");
      return null;
    }

    return nome;
  };

  // Função para validar o CPF
  function validaCpf(cpfValue) {
    if (cpfValue.length !== 11) {
      console.log("CPF inválido");
      return false;
    }

    function proximoDigitoVerificador(cpfIncompleto) {
      let somatoria = 0;

      for (let i = 0; i < cpfIncompleto.length; i++) {
        let digitoAtual = cpfIncompleto.charAt(i);
        let constante = cpfIncompleto.length + 1 - i;
        somatoria += Number(digitoAtual) * constante;
      }
      const resto = somatoria % 11;

      return resto < 2 ? "0" : (11 - resto).toString();
    }

    let primeiroDigitoVerificador = proximoDigitoVerificador(
      cpfValue.substring(0, 9)
    );
    let segundoDigitoVerificador = proximoDigitoVerificador(
      cpfValue.substring(0, 9) + primeiroDigitoVerificador
    );

    let cpfCorreto =
      cpfValue.substring(0, 9) +
      primeiroDigitoVerificador +
      segundoDigitoVerificador;

    if (cpfValue !== cpfCorreto) {
      console.log("CPF inválido");
      return false;
    } else {
      console.log("CPF válido");
      return true;
    }
  }
  const especies = document.querySelectorAll(".especie");
  const petRaca = document.getElementById("petRaca");
  let especieSelected = 0;

  especies.forEach((especie) => {
    especie.addEventListener("click", () => {
      especies.forEach((especie) => {
        especie.classList.remove("selected");
      });
      especie.classList.toggle("selected");
      especieSelected = especie.id;

      petRaca.removeAttribute('disabled');
    });
  });

  // Botão submit
  formAddPet.addEventListener("submit", function (e) {
    e.preventDefault();

    // Dados input
    const tutorNome = document.getElementById("tutorNome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;
    const petNome = document.getElementById("petNome").value;
    const petAnoNascimento = document.getElementById("petAnoNascimento").value;
    const petAlergias = document.getElementById("petAlergias").value;
    const petVacinas = document.getElementById("petVacinas").value;
    const tipoConsulta = document.getElementById("tipoConsulta").value;
    const dataConsulta = inputDate.value;
    const doutor = document.getElementById("doutor").value;

    // valida especie
    if (especieSelected === 0) {
      console.log("sem selecionar");
      event.preventDefault;
      return null;
    }

    console.log(especieSelected);

    const possuiNomePetValidado = validaNome(petNome);
    const possuiNomeTutorValidado = validaNome(tutorNome);

    if (!possuiNomePetValidado || !possuiNomeTutorValidado) return null;

    // Valida o CPF
    if (!validaCpf(cpf)) {
      console.log("CPF inválido");
      return;
    }
    especies.forEach((especie) => {
      especie.classList.remove("selected");
    });

    // Salva os dados no LS
    salvaDados({
      especieSelected,
      tutorNome,
      cpf,
      telefone,
      endereco,
      petNome,
      petAnoNascimento,
      petRaca,
      petAlergias,
      petVacinas,
      tipoConsulta,
      dataConsulta,
      doutor,
    });

    // Carrega/atualiza os dados
    carregaDados();

    // Fecha o modal
    formAddPet.reset();
    modalAddProfilePet.style.display = "none";
    main.classList.remove("invisible");
  });

  // Carrega após carregar a página
  carregaDados();
  // Fecha o modal quando clica no "X"
  modalAddProfilePetClose.addEventListener("click", () => {
    modalAddProfilePet.style.display = "none";
    main.classList.remove("invisible");
    especies.forEach((especie) => {
      especie.classList.remove("selected");
    });
    petRaca.setAttribute('disabled', 'true');

    console.log(diaAtual, mesAtual)
  });
});
