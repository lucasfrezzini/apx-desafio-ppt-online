import { state } from "@/state/state";
import { goTo } from "@/router/router";

export function initLogin() {
  const currentState = state.getState();

  const login = document.createElement("section");
  login.classList.add("login");

  login.innerHTML = `
  <header>
    <h1>
      Piedra<br/> Papel <span>ó</span><br/> Tijera
    </h1>
  </header>
  <div class="fieldgroup">
    <input placeholder="Ingresa tu nombre" type="text" name="name">
    <input placeholder="Ingresa tu correo" type="email" name="email">
    <p class="alert hidden"></p>
    <button-el id="signup">Iniciar sesión</button-el>
  </div>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(login);
  const buttonSignup = document.querySelector("button-el[id='signup']")!;

  const inputName: HTMLInputElement =
    document.querySelector("input[name='name']")!;
  const inputEmail: HTMLInputElement = document.querySelector(
    "input[name='email']"
  )!;
  const errorEl = document.querySelector("p.alert")!;

  buttonSignup.addEventListener("click", async (event) => {
    event.preventDefault();
    const userInput = {
      name: inputName.value,
      email: inputEmail.value,
    };

    try {
      // Encontramos el ID del usuario
      const userIdRes = await state.getUserId(userInput);
      console.log(userIdRes);
      if (!userIdRes.success) {
        throw new Error(userIdRes.error.message);
      }
      // Autenticamos el usuario
      const authResult = await state.authUser(userIdRes.data.user.id);
      if (!authResult.success) {
        throw new Error(authResult.error.message);
      }
      const route = currentState.game.imOwner ? "/infoRoom" : "/setRoom";
      goTo(route);
    } catch (error: any) {
      errorEl.classList.remove("hidden");
      errorEl.textContent = error.message;
      setTimeout(() => {
        errorEl.classList.add("hidden");
      }, 5000);
    }
  });
}
