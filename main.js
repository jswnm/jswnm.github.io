document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  header.addEventListener("dblclick", () => {
    header.classList.toggle("alt");
  });
});
