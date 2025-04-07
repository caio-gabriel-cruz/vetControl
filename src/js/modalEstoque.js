const buttonAddItem = document.querySelector(".add-item");
const modalAddItem = document.querySelector(".modal-add-item");
const closeModal = document.querySelector(".close");

buttonAddItem.addEventListener("click", () => {
  modalAddItem.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modalAddItem.style.display = "none";
});
