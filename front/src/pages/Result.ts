import { goTo } from "@/router/router";
import { state } from "@/state/state";

function getWinnerText(gameData: any) {
  const { winner, imOwner } = gameData;
  if (winner === "owner") {
    return imOwner ? "Ganaste" : "Perdiste";
  } else {
    return imOwner ? "Perdiste" : "Ganaste";
  }
}

export function initResult() {
  // Traemos la info del state y renderizamos
  const currentState = state.getState();
  const { game, owner, guest, scoreboard } = currentState;

  // Actualizamos el historial de partidas
  game.winner === "owner"
    ? (owner.history_wins += 1)
    : (guest.history_wins += 1);

  // Obtenemos el texto del ganador
  const resultGame = getWinnerText(game);

  let classOverlay = "overlay__win";

  const result = document.createElement("div");
  result.classList.add("overlay", classOverlay);

  result.innerHTML = `
  <div class="container overlay__container">
    <div class="score">
      <h3>${resultGame}</h3>
      <h4>RESULTADO PARTIDA</h4>
      <div>
      <h4>${owner.name}: ${scoreboard.owner}</h4>
      <h4>${guest.name}: ${scoreboard.guest}</h4>
      </div>
      <h4>HISTORIAL PARTIDAS</h4>
      <div>
      <h4>${owner.name}: ${owner.history_wins}</h4>
      <h4>${guest.name}: ${guest.history_wins}</h4>
      </div>
    </div>
    <button-el>Volver a jugar</button-el> 
    </div>
    `;

  document.querySelector(".lines")!.appendChild(result);

  const resetGameEl = document.querySelector("button-el")!;
  resetGameEl.addEventListener("click", async (event) => {
    event.preventDefault();
    state.resetGame();
    await state.saveStateRtdb();
    const overlayEl = document.querySelector(".overlay")!;
    overlayEl.remove();
    goTo("/choice");
  });
}
