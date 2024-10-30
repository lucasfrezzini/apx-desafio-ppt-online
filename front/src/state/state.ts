const URL_BASE = "http://localhost:3000/api/";

export const state = {
  data: {
    game: {
      finish: false,
      imOwner: false,
    },
    owner: {
      id: "",
      name: "",
      username: "",
      current_game_wins: 0,
      current_game_choice: "",
      online: false,
      start: false,
      history_wins: 0,
    },
    guest: {
      id: "",
      name: "",
      username: "",
      current_game_wins: 0,
      current_game_choice: "",
      online: false,
      start: false,
      history_wins: 0,
    },
    scoreboard: {
      owner: 0,
      guest: 0,
    },
    roomId: "",
    rtdbRoomID: "",
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setState(newState: any) {
    this.data = newState;
  },
  saveState() {
    localStorage.setItem("stateData", JSON.stringify(this.data));
    console.log("localStorage actualizado", this.data);
  },
  isLogged() {},
  setOwner() {
    const currentState = this.getState();
    currentState.game.imOwner = true;
  },

  async setNewPlayer(name: string): Promise<any> {
    const currentState = this.getState();
    const username = name.replaceAll(" ", "").toLowerCase();
    try {
      const res = await fetch(`${URL_BASE}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        return data;
      } else {
        if (currentState.game.imOwner) {
          currentState.owner.id = data.id;
          currentState.owner.name = data.name;
          currentState.owner.username = data.username;
        } else {
          currentState.guest.id = data.id;
          currentState.guest.name = data.name;
          currentState.guest.username = data.username;
        }
        return {
          success: true,
        };
      }
    } catch (error: any) {
      return {
        succcess: false,
        statusCode: 500,
        error: {
          message: "Error interno del servidor",
          type: "ServerError",
        },
      };
    }
  },
  // ? ONLINE is true if both players are online in the same room
  // ? START is true if both players start the game
  setOwnerOnline() {
    const currentState = this.getState();
    currentState.playerOwner.online = true;
  },
  setGuestOnline() {
    const currentState = this.getState();
    currentState.playerGuest.online = true;
  },
  isBothOnline() {
    const currentState = this.getState();
    return currentState.playerOwner.online && currentState.playerGuest.online;
  },
  setOwnerStart() {
    const currentState = this.getState();
    currentState.playerOwner.start = true;
  },
  setGuestStart() {
    const currentState = this.getState();
    currentState.playerGuest.start = true;
  },
  isBothStart() {
    const currentState = this.getState();
    return currentState.playerOwner.start && currentState.playerGuest.start;
  },

  // ? Game complex logic
  setWinnerGame() {
    // this.data.playerOwner.current_game_wins === 3
    //   ? (this.data.resultGame.winner = "Ganaste")
    //   : (this.data.resultGame.winner = "Perdiste");
  },
  setWinnerRound(winner: number) {
    // if (winner == 1) {
    //   this.data.playerOwner.current_game_wins =
    //     this.data.playerOwner.current_game_wins + 1;
    // } else {
    //   this.data.playerGuest.current_game_wins =
    //     this.data.playerGuest.current_game_wins + 1;
    // }
  },
  addChoice(choice: string, player: number) {
    // TODO
    // this.data.player.current_game_choice = choice;
  },
  resetGame() {
    //TODO
    // this.data.pcWins = 0;
    // this.data.playerWins = 0;
    // this.data.playerChoice = "";
  },
};
