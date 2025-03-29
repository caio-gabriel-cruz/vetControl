document.addEventListener("DOMContentLoaded", function () {
  const addProfilePet = document.querySelector(".add-pet");
  const modalAddProfilePet = document.querySelector(".modal-add-pet-profile");
  const main = document.querySelector("main");
  const dateInput = document.querySelector("input[type=date");
  const modalAddProfilePetClose = document.querySelector(
    ".modal-add-pet-profile .close"
  );
  const especiesGato = {
    0: "Selecione a Raça",
    1: "Persa",
    2: "Maine Coon",
    3: "Siamês",
    4: "Bengal",
    5: "Sphynx",
    6: "Ragdoll",
    7: "Birman",
    8: "Scottish Fold",
    9: "Britânico de Pelo Curto",
    10: "Sem raça definida",
  };
  const especiesCachorro = {
    0: "Selecione a Raça",
    1: "Labrador",
    2: "Poodle",
    3: "Bulldog",
    4: "Beagle",
    5: "Golden Retriever",
    6: "Chihuahua",
    7: "Shih Tzu",
    8: "Pastor Alemão",
    9: "Boxer",
    10: "Dachshund",
    11: "Yorkshire Terrier",
    12: "Cocker Spaniel",
    13: "Maltês",
    14: "Rottweiler",
    15: "Doberman",
    16: "Pinscher",
    17: "Husky Siberiano",
    17: "Sem raça definida",
  };
  const especiesPassaro = {
    0: "Selecione a Raça",
    1: "Papagaio",
    2: "Periquito",
    3: "Calopsita",
    4: "Ninfa",
    5: "Agapornis",
    6: "Canário",
    7: "Cacatua",
    8: "Curió",
    9: "Tico-tico",
    10: "Arara",
  };
  const especiesHamster = {
    0: "Selecione a Raça",
    1: "Porquinho-da-índia",
    2: "Hamster",
    3: "Coelho",
    4: "Gerbil",
    5: "Chinchila",
    6: "Degus",
    7: "Camundongo",
  };

  const dataAtual = new Date();
  let diaAtual = dataAtual.getDate();
  let mesAtual = dataAtual.getMonth() + 1;
  let anoAtual = dataAtual.getFullYear();
  mesAtual = mesAtual < 10 ? `0${mesAtual}` : mesAtual;
  diaAtual = diaAtual < 10 ? `0${diaAtual}` : diaAtual;
  dateInput.setAttribute("min", `${anoAtual}-${mesAtual}-${diaAtual}`);
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
  const petPeso = document.getElementById("petPeso");
  const telefone = document.getElementById("telefone");
  let especieSelected = 0;

  especies.forEach((especie) => {
    especie.addEventListener("click", () => {
      especies.forEach((especie) => {
        especie.classList.remove("selected");
      });
      especie.classList.toggle("selected");
      especieSelected = especie.id;

      petRaca.removeAttribute("disabled");
      switch (especieSelected) {
        case "especieGato":
          petRaca.innerHTML = "";
          for (const chave in especiesGato) {
            if (especiesGato.hasOwnProperty(chave)) {
              const option = document.createElement("option");
              option.value = chave; // Valor que será enviado
              option.textContent = especiesGato[chave]; // Texto a ser exibido
              petRaca.appendChild(option); // Adicionando a opção ao select
            }
          }
          break;
        case "especieCachorro":
          petRaca.innerHTML = "";
          for (const chave in especiesCachorro) {
            if (especiesCachorro.hasOwnProperty(chave)) {
              const option = document.createElement("option");
              option.value = chave; // Valor que será enviado
              option.textContent = especiesCachorro[chave]; // Texto a ser exibido
              petRaca.appendChild(option); // Adicionando a opção ao select
            }
          }
          break;
        case "especiePassaro":
          petRaca.innerHTML = "";
          for (const chave in especiesPassaro) {
            if (especiesPassaro.hasOwnProperty(chave)) {
              const option = document.createElement("option");
              option.value = chave; // Valor que será enviado
              option.textContent = especiesPassaro[chave]; // Texto a ser exibido
              petRaca.appendChild(option); // Adicionando a opção ao select
            }
          }
          break;
        case "especieHamster":
          petRaca.innerHTML = "";
          for (const chave in especiesHamster) {
            if (especiesHamster.hasOwnProperty(chave)) {
              const option = document.createElement("option");
              option.value = chave; // Valor que será enviado
              option.textContent = especiesHamster[chave]; // Texto a ser exibido
              petRaca.appendChild(option); // Adicionando a opção ao select
            }
          }
          break;
      }
    });
  });

  // formatação de petPeso
  let control = 1;
  petPeso.addEventListener("input", () => {
    petPeso.addEventListener("keydown", function (event) {
      if (event.key === "Backspace") {
        control = 2;
      }
    });
    petPeso.addEventListener("keydown", function (event) {
      if (event.key !== "Backspace") {
        control = 1;
      }
    });
    if (control == 1) {
      if (petPeso.value.length == 3) {
        petPeso.value += ".";
      }
    }
  });

  // formatação de telefone
  let controlTel = 1;
  telefone.addEventListener("input", () => {
    if (controlTel == 1) {
      if (telefone.value.length == 2) {
        telefone.value = `(${telefone.value}) `;
      }
      if (telefone.value.length == 10) {
        telefone.value += "-";
      }
    }
  });
  telefone.addEventListener("keydown", function (event) {
    if (event.key === "Backspace") {
      controlTel = 2;
    } else {
      controlTel = 1;
    }
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
    const petAlergias = document.getElementById("alergiasPet").value;
    const petVacinas = document.getElementById("petVacinas").value;
    const tipoConsulta = document.getElementById("tipoConsulta").value;
    const dataConsulta = document.getElementById("dataConsulta").value;
    const doutor = document.getElementById("doutor").value;
    let telefoneNum = document.getElementById("telefone").value;

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

    telefoneNum = telefoneNum.replace("-", "");
    telefoneNum = telefoneNum.replace("(", "");
    telefoneNum = telefoneNum.replace(") ", "");
    console.log(telefoneNum);
    if (/[a-zA-Z]/.test(telefoneNum)) {
      console.log("Campo nome contém caracteres inválidos");
      return null;
    } else {
      telefoneNum = parseFloat(telefoneNum);
      console.log(telefoneNum);
    }

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
    petRaca.setAttribute("disabled", "true");

    console.log(diaAtual, mesAtual);
  });
});
