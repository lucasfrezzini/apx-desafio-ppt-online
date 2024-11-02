import { state } from "@/state/state";
import { goTo } from "@/router/router";

export function initPlayerInfo() {
  const currentState = state.getState();

  const playerInfo = document.createElement("section");
  playerInfo.classList.add("playerInfo");

  playerInfo.innerHTML = `
  <header>
    <h1>
      Piedra<br/> Papel <span>ó</span><br/> Tijera
    </h1>
  </header>
  <div class="fieldgroup">
    <input placeholder="Ingresa tu nombre" type="text" name="name">
    <input placeholder="Ingresa tu correo" type="email" name="email">
    <p class="alert hidden"></p>
    <button-el id="signup">Crear usuario</button-el>
    <p class="alert">¿Ya tienes un usuario creado? <a href="#" onclick="goTo('/login'); return false;">Inicia sesión</a></p>
  </div>
  <bottom-hands></bottom-hands>
  `;

  document.querySelector("#app")!.replaceChildren(playerInfo);
  const buttonSignup = document.querySelector("button-el[id='signup']")!;
  const buttonLogin = document.querySelector("button-el[id='login']")!;

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
      const createUserResult = await state.createUser(userInput);
      if (!createUserResult.success) {
        throw new Error(createUserResult.error.message);
      }

      const authResult = await state.authUser();
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
