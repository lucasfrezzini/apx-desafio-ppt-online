import { goTo } from "@/router/router";
import { state } from "@/state/state";

function whoWins(owner: string, guest: string) {
  //? 0 empate, 1 owner, 2 guest
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

const stringsWin = [
  "Empataron esta ronda",
  "Ganaste esta ronda",
  "Perdiste esta ronda",
];

export function runGameOptions() {
  const currentState = state.getState();
  // let { guestWins, ownerWins } = currentState;
  // let ownerWins = currentState.owner.current_game_wins;
  let ownerWins = 3;
  let guestWins = currentState.guest.current_game_wins;

  const ownerChoice = currentState.owner.current_game_choice;
  const guestChoice = currentState.guest.current_game_choice;
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

  initGame(guestWins, ownerWins, winner, guestChoice, ownerChoice);

  setTimeout(() => {
    const bgEl = document.body.querySelector(".lines");
    bgEl!.classList.remove("bg-win");
    bgEl!.classList.remove("bg-lose");
    //TODO: actualizar wins/lifes y redireccionar si hay ganador de 3 rondas
    if (winner != 0) {
      state.setWinnerRound(winner);
      if (ownerWins == 3 || guestWins == 3) {
        state.setWinnerGame();
        goTo("/result");
      } else {
        goTo("/choice");
      }
    } else {
      goTo("/choice");
    }
  }, 3000);
}

function initGame(
  guestWins: number,
  ownerWins: number,
  winner: number,
  guestChoice: string,
  ownerChoice: string
) {
  const game = document.createElement("section");
  game.classList.add("game");

  //TODO creamos las estrellas de la PC
  const startTop = document.createElement("div");
  startTop.classList.add("lifes", "lifes-top");
  for (let i = 0; i < guestWins; i++) {
    startTop.innerHTML += `<img src="/star.png" />`;
  }

  //TODO creamos las estrellas del Player
  const startBottom = document.createElement("div");
  startBottom.classList.add("lifes", "lifes-bottom");
  for (let i = 0; i < ownerWins; i++) {
    startBottom.innerHTML += `<img src="/star.png" />`;
  }

  //TODO las agregamos al DOM
  game.appendChild(startTop);
  game.appendChild(startBottom);

  game.innerHTML += `
  <img src="/${guestChoice}.svg" class="hand hand-machine" />
  <h2>${stringsWin[winner]}</h2>
  <img src="/${ownerChoice || "papel"}.svg" class="hand hand-player" />
  `;

  const bgEl = document.body.querySelector(".lines");
  if (winner == 1) {
    bgEl!.classList.add("bg-win");
    bgEl!.classList.remove("bg-lose");
  } else if (winner == 2) {
    bgEl!.classList.add("bg-lose");
    bgEl!.classList.remove("bg-win");
  }
  document.querySelector("#app")!.replaceChildren(game);
}
