const URL_BASE = "http://localhost:3000/api";

export const state = {
  data: {
    game: {
      finish: false,
      imOwner: false,
    },
    owner: {
      id: "",
      name: "",
      email: "",
      current_game_wins: 0,
      current_game_choice: "",
      online: false,
      start: false,
      history_wins: 0,
      token: {},
    },
    guest: {
      id: "",
      name: "",
      email: "",
      current_game_wins: 0,
      current_game_choice: "",
      online: false,
      start: false,
      history_wins: 0,
      token: {},
    },
    scoreboard: {
      owner: 0,
      guest: 0,
    },
    roomId: "",
    rtdbRoomId: "",
  },
  listeners: [() => {}],
  getState() {
    return this.data;
  },
  setState(newState: any) {
    this.data = newState;
  },
  saveStateLocal() {
    const currentState = this.getState();
    localStorage.setItem("stateData", JSON.stringify(currentState));
  },
  async saveStateRtdb(): Promise<any> {
    const currentState = this.getState();
    const player = currentState.game.imOwner ? "owner" : "guest";
    const rtdbRoomId = currentState.rtdbRoomId;
    const body = {
      id: currentState[player].id,
      token: currentState[player].token,
      state: {
        owner: currentState["owner"],
        guest: currentState["guest"],
        scoreboard: currentState.scoreboard,
      },
    };

    console.log("State BODY", body.state);
    try {
      const apiResponse = await fetch(`${URL_BASE}/rooms/${rtdbRoomId}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const dataResponse = await apiResponse.json();
      return dataResponse;
    } catch (error: any) {
      return {
        success: false,
        statusCode: 500,
        error: {
          message: "Error interno del servidor",
          type: "ServerError",
        },
      };
    }
  },
  isLogged() {},
  setOwnerTrue() {
    const currentState = this.getState();
    currentState.game.imOwner = true;
  },
  setOwnerFalse() {
    const currentState = this.getState();
    currentState.game.imOwner = false;
  },
  async getUserId(user: { name: string; email: string }): Promise<any> {
    try {
      const apiResponse = await fetch(
        `${URL_BASE}/users?name=${user.name}&email=${user.email}`
      );
      const dataResponse = await apiResponse.json();
      return dataResponse;
    } catch (error: any) {
      return {
        success: false,
        statusCode: 500,
        error: {
          message: "Error interno del servidor",
          type: "ServerError",
        },
      };
    }
  },
  async getRtdbId(roomId: string): Promise<any> {
    const currentState = this.getState();
    const player = currentState.game.imOwner
      ? currentState.owner
      : currentState.guest;
    const { id, token } = player;
    try {
      const apiResponse = await fetch(`${URL_BASE}/rooms/${roomId}/rtdb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          token,
        }),
      });
      const dataResponse = await apiResponse.json();
      return dataResponse;
    } catch (error: any) {
      return {
        success: false,
        statusCode: 500,
        error: {
          message: "Error interno del servidor",
          type: "ServerError",
        },
      };
    }
  },
  async createUser(user: { name: string; email: string }): Promise<any> {
    const currentState = this.getState();
    const { name, email } = user;
    try {
      const apiResponse = await fetch(`${URL_BASE}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      const dataResponse = await apiResponse.json();
      if (dataResponse.success) {
        if (currentState.game.imOwner) {
          currentState.owner.id = dataResponse.data.id;
          currentState.owner.name = dataResponse.data.name;
          currentState.owner.email = dataResponse.data.email;
        } else {
          currentState.guest.id = dataResponse.data.id;
          currentState.guest.name = dataResponse.data.name;
          currentState.guest.email = dataResponse.data.email;
        }
      }
      return dataResponse;
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
  async authUser(userId: string): Promise<any> {
    const currentState = this.getState();
    const player = currentState.game.imOwner ? "owner" : "guest";
    try {
      const apiResponse = await fetch(`${URL_BASE}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      });
      const dataResponse = await apiResponse.json();
      if (dataResponse.success) {
        // seteo el token a quien corresponde
        currentState[player].token = dataResponse.data.token;
        // seteo online a quien corresponde
        currentState.game.imOwner
          ? this.setOwnerOnline()
          : this.setGuestOnline();
      }
      return dataResponse;
    } catch (error: any) {
      return {
        success: false,
        statusCode: 500,
        error: {
          message: "Error interno del servidor",
          type: "ServerError",
        },
      };
    }
  },
  async setUserRoom(owner: boolean, roomId?: string): Promise<any> {
    try {
      const currentState = this.getState();
      let dataResponse;
      if (owner) {
        // creo un nuevo room para el owner
        const apiResponse = await fetch(`${URL_BASE}/rooms/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentState.owner.id,
            token: currentState.owner.token,
          }),
        });
        dataResponse = await apiResponse.json();
      } else {
        // agrego el guest al room

        console.log("No soy owner", roomId);
        const apiResponse = await fetch(`${URL_BASE}/rooms/${roomId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentState.guest.id,
            token: currentState.guest.token,
          }),
        });
        dataResponse = await apiResponse.json();
        console.log("dataResponse", dataResponse);
      }
      if (dataResponse.success) {
        console.log("dataResponse.data", dataResponse.data);

        currentState.roomId = dataResponse.data.roomId;
        currentState.rtdbRoomId = dataResponse.data.rtdbRoomId;
      }
      return dataResponse;
    } catch (error: any) {
      return {
        success: false,
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
    currentState.owner.online = true;
  },
  setGuestOnline() {
    const currentState = this.getState();
    currentState.guest.online = true;
  },
  isBothOnline() {
    const currentState = this.getState();
    return currentState.owner.online && currentState.guest.online;
  },
  setOwnerStart() {
    const currentState = this.getState();
    currentState.owner.start = true;
  },
  setGuestStart() {
    const currentState = this.getState();
    currentState.guest.start = true;
  },
  isBothStart() {
    const currentState = this.getState();
    return currentState.owner.start && currentState.guest.start;
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
    return winner;
  },
  addChoice(choice: string, player: number) {
    // TODO
    // this.data.player.current_game_choice = choice;
    return { choice, player };
  },
  resetGame() {
    //TODO
    // this.data.pcWins = 0;
    // this.data.playerWins = 0;
    // this.data.playerChoice = "";
  },
};
