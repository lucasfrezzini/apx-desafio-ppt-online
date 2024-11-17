import { ref, get } from "firebase/database";
import { database } from "@/db/database";
import { goTo } from "@/router/router";
import { state } from "@/state/state";
import { waitForTimeout } from "@/utils/utils";

function whoWins(owner: string, guest: string) {
  // 0 empate, 1 owner, 2 guest
  let win: number;
  if (owner === guest) {
    win = 0;
  } else if (
    (owner === "piedra" && guest === "tijera") ||
    (owner === "papel" && guest === "piedra") ||
    (owner === "tijera" && guest === "papel")
  ) {
    win = 1;
  } else {
    win = 2;
  }
  return win;
}

function getWinnerText(winner: any, imOwner: boolean) {
  if (winner != 0) {
    if (winner == 1 && imOwner) {
      return "Ganaste esta ronda";
    } else if (winner == 1 && !imOwner) {
      return "Perdiste esta ronda";
    } else if (winner == 2 && imOwner) {
      return "Perdiste esta ronda";
    } else if (winner == 2 && !imOwner) {
      return "Ganaste esta ronda";
    }
  } else {
    return "Empataron esta ronda";
  }
}

function initGame(
  imOwner: boolean,
  guestWins: number,
  ownerWins: number,
  winner: number,
  guestChoice: string,
  ownerChoice: string
) {
  const game = document.createElement("section");
  game.classList.add("game");

  // Si imOwner es true, significa que soy el owner y debo poner

  // Creamos las estrellas del Player segun corresponda
  const startTop = document.createElement("div");
  startTop.classList.add("lifes", "lifes-top");
  for (let i = 0; i < (imOwner ? guestWins : ownerWins); i++) {
    startTop.innerHTML += `<img src="https://lucasfrezzini.github.io/apx-desafio-ppt-online/star.png" />`;
  }

  // Creamos las estrellas del Player segun corresponda
  const startBottom = document.createElement("div");
  startBottom.classList.add("lifes", "lifes-bottom");
  for (let i = 0; i < (imOwner ? ownerWins : guestWins); i++) {
    startBottom.innerHTML += `<img src="https://lucasfrezzini.github.io/apx-desafio-ppt-online/star.png" />`;
  }

  // Agregamos las estrallas al DOM
  game.appendChild(startTop);
  game.appendChild(startBottom);

  game.innerHTML += `
  <img src="https://lucasfrezzini.github.io/apx-desafio-ppt-online/${
    imOwner ? guestChoice : ownerChoice
  }.svg" class="hand hand-machine" />
  <h2>${getWinnerText(winner, imOwner)}</h2>
  <img src="https://lucasfrezzini.github.io/apx-desafio-ppt-online/${
    imOwner ? ownerChoice : guestChoice
  }.svg" class="hand hand-player" />
  `;

  const bgEl = document.body.querySelector(".lines");
  if (winner != 0) {
    if (winner == 1 && imOwner) {
      bgEl!.classList.add("bg-win");
    } else if (winner == 1 && !imOwner) {
      bgEl!.classList.add("bg-lose");
    } else if (winner == 2 && imOwner) {
      bgEl!.classList.add("bg-lose");
    } else if (winner == 2 && !imOwner) {
      bgEl!.classList.add("bg-win");
    }
  }
  document.querySelector("#app")!.replaceChildren(game);
}

async function updateGameState(data: any) {
  const { owner, guest, scoreboard } = data || {};
  const currentState = state.getState();

  // Actualiza las propiedades guest, owner y scoreboard
  currentState.owner = {
    ...currentState.owner,
    ...owner,
  };
  currentState.guest = {
    ...currentState.guest,
    ...guest,
  };
  currentState.scoreboard = {
    ...currentState.scoreboard,
    ...scoreboard,
  };
}

export async function runGameOptions() {
  // Actualizamos el state con la ultima version de la rtdb
  const currentState = state.getState();
  const rtdbRoomId = currentState.rtdbRoomId;
  const dbRef = ref(database, `roomsPPT/${rtdbRoomId}`);
  const snapshot = await get(dbRef);
  const data = await snapshot.val();
  await updateGameState(data);

  state.setNewRound();

  const imOwner = currentState.game.imOwner;

  let ownerWins = currentState.owner.current_game_wins;
  let guestWins = currentState.guest.current_game_wins;

  const ownerChoice = currentState.owner.current_game_choice;
  const guestChoice = currentState.guest.current_game_choice;

  // Obtenemos el ganador de la ronda y sumamos las rondas a su state
  const winner: number = whoWins(ownerChoice, guestChoice);

  if (winner != 0) {
    if (winner == 1) {
      ownerWins++;
      state.addWinRound("owner");
    } else {
      guestWins++;
      state.addWinRound("guest");
    }
  }

  let saveStateRtdbResponse;
  currentState.game.imOwner
    ? (saveStateRtdbResponse = await state.saveOwnerRtdb())
    : (saveStateRtdbResponse = await state.saveGuestRtdb());

  if (!saveStateRtdbResponse.success) {
    throw new Error(saveStateRtdbResponse.error.message);
  }

  initGame(imOwner, guestWins, ownerWins, winner, guestChoice, ownerChoice);

  //Redireccionar a la siguiente ronda si corresponde o redireccionar a result
  await waitForTimeout(3000);
  const bgEl = document.body.querySelector(".lines");
  bgEl!.classList.remove("bg-win");
  bgEl!.classList.remove("bg-lose");
  if (winner != 0) {
    if (ownerWins == 3 || guestWins == 3) {
      state.setWinnerGame();
      goTo("/result");
    } else {
      goTo("/choice");
    }
  } else {
    goTo("/choice");
  }
}
