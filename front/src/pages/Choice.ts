export function initChoice() {
  const choice = document.createElement("section");
  choice.classList.add("choice");

  choice.innerHTML = `
  <counter-time></counter-time>
  <p class="alert hidden">¡Tenes que elegir!</p>
  <bottom-hands is-big></bottom-hands>
  `;

  setTimeout(() => {
    const alert = document.querySelector(".alert");
    alert?.classList.remove("hidden");
  }, 4000);

  document.querySelector("#app")!.replaceChildren(choice);
}
