const buttonAddItem = document.querySelector(".add-item");
const modalAddItem = document.querySelector(".modal-add-item");
const closeModal = document.querySelector(".close");
const newItemName = document.getElementById("newItemName");
const newItemCategory = document.getElementById("newItemCategory");
const newItemPrice = document.getElementById("newItemPrice");
const newItemQuantity = document.getElementById("newItemQuantity");
const addStockItem = document.getElementById("addStockItem");
const buttonsEdit = document.querySelectorAll(".item button");

closeModal.addEventListener("click", () => {
  modalAddItem.style.display = "none";
});

buttonAddItem.addEventListener("click", () => {
  modalAddItem.style.display = "block";
});

addStockItem.addEventListener("submit", () => {
  if (/\d/.test(newItemName.value)) {
    console.log("Campo nome contém caracteres inválidos");
    event.preventDefault();
    return null;
  }
});
newItemCategory.value = 3;

buttonsEdit.forEach((button) => {
  button.addEventListener("click", () => {
    let item = button.parentNode.parentNode;
    let nome = item.querySelector(".nome p").innerHTML;
    let categoria = item.querySelector(".categoria p").innerHTML;
    let preco = item.querySelector(".preco p").innerHTML;
    preco = preco.replace("R$", "");
    preco = preco.replace(",", ".");
    preco = parseInt(preco);
    let quantidade = item.querySelector(".quantidade p").innerHTML;
    quantidade = parseInt(quantidade);
    switch (categoria) {
      case "Vacina":
        categoria = 1;
        break;
      case "Ração":
        categoria = 2;
        break;
      case "Medicamento":
        categoria = 3;
        break;
    }

    const modal = document.createElement("div");
    modal.className = "modal-edit-item stock";

    const closeBtn = document.createElement("div");
    closeBtn.className = "close";
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", () => {
      modal.remove();
    });

    const titulo = document.createElement("h2");
    titulo.textContent = "Editar item do estoque";

    const form = document.createElement("form");
    form.id = "editStockItem";
    form.action = "";

    const tableEdit = document.createElement("div");
    tableEdit.className = "table-edit";

    // Função auxiliar para criar colunas
    function criarColuna(labelText, inputType, inputId, isSelect = false) {
      const coluna = document.createElement("div");
      coluna.className = "colunm-item";

      const label = document.createElement("p");
      label.textContent = labelText;

      if (isSelect) {
        const select = document.createElement("select");
        select.id = inputId;

        const op1 = document.createElement("option");
        op1.value = "";
        op1.textContent = "Selecione a categoria";

        const op2 = document.createElement("option");
        op2.value = "1";
        op2.textContent = "Vacina";

        const op3 = document.createElement("option");
        op3.value = "2";
        op3.textContent = "Ração";

        const op4 = document.createElement("option");
        op4.value = "3";
        op4.textContent = "Medicamento";

        select.append(op1, op2, op3, op4);
        coluna.append(label, select);
      } else {
        const input = document.createElement("input");
        input.type = inputType;
        input.id = inputId;

        coluna.append(label, input);
      }

      return coluna;
    }

    const nomeColuna = criarColuna("Nome", "text", "editItemName");
    const categoriaColuna = criarColuna(
      "Categoria",
      "",
      "editItemCategory",
      true
    );
    const precoColuna = criarColuna("Preço", "number", "editItemPrice");
    const qtdColuna = criarColuna("Quantidade", "number", "editItemQuantity");

    // Remove a borda da última coluna
    qtdColuna.style.border = "none";

    tableEdit.append(nomeColuna, categoriaColuna, precoColuna, qtdColuna);

    const btnSubmit = document.createElement("button");
    btnSubmit.type = "submit";
    btnSubmit.textContent = "Confirmar";

    form.append(tableEdit, btnSubmit);

    modal.append(closeBtn, titulo, form);

    // Adiciona o modal ao body (ou a outro container)
    document.body.appendChild(modal);
    nomeColuna.querySelector("input").value = nome;
    categoriaColuna.querySelector("select").value = categoria;
    precoColuna.querySelector("input").value = preco;
    qtdColuna.querySelector("input").value = quantidade;
  });
});
