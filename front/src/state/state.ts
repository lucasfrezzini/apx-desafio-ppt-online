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
  setOwnerTrue() {
    const currentState = this.getState();
    currentState.game.imOwner = true;
    console.log("owner trueeees");
  },
  setOwnerFalse() {
    const currentState = this.getState();
    currentState.game.imOwner = false;
  },
  async getUserId(user: { name: string; email: string }): Promise<any> {
    try {
      const resAuth = await fetch(
        `${URL_BASE}/users?name=${user.name}&email=${user.email}`
      );
      const dataAuth = await resAuth.json();
      return dataAuth;
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
  async createUser(user: { name: string; email: string }): Promise<any> {
    const currentState = this.getState();
    const { name, email } = user;
    try {
      const res = await fetch(`${URL_BASE}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      const dataCreate = await res.json();
      console.log("Creacion", dataCreate);
      if (!dataCreate.success) {
        return dataCreate;
      } else {
        if (currentState.game.imOwner) {
          currentState.owner.id = dataCreate.data.id;
          currentState.owner.name = dataCreate.data.name;
          currentState.owner.email = dataCreate.data.email;
        } else {
          currentState.guest.id = dataCreate.data.id;
          currentState.guest.name = dataCreate.data.name;
          currentState.guest.email = dataCreate.data.email;
        }
        this.saveState();
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
  async authUser(userId: string): Promise<any> {
    const currentState = this.getState();

    try {
      const resAuth = await fetch(`${URL_BASE}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
        }),
      });
      const dataAuth = await resAuth.json();
      if (dataAuth.success) {
        // seteo el token a quien corresponde
        currentState[currentState.game.imOwner ? "owner" : "guest"].token =
          dataAuth.data.token;
        // seteo online a quien corresponde
        currentState.game.imOwner
          ? this.setOwnerOnline()
          : this.setGuestOnline();

        this.saveState();
      }
      return dataAuth;
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
  async setUserRoom(owner: boolean, roomId?: string): Promise<any> {
    console.log("setUserRoom", "entre a setUserRoom");
    try {
      const currentState = this.getState();
      let dataNewRoom;
      if (owner) {
        // creo un nuevo room para el owner
        const resNewRoom = await fetch(`${URL_BASE}/rooms/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentState.owner.id,
            token: currentState.owner.token,
          }),
        });
        dataNewRoom = await resNewRoom.json();
      } else {
        // agrego el guest al room
        const resNewRoom = await fetch(`${URL_BASE}/rooms/${roomId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentState.guest.id,
            token: currentState.guest.token,
          }),
        });
        dataNewRoom = await resNewRoom.json();
      }
      if (dataNewRoom.success) {
        currentState.roomId = dataNewRoom.data;
        this.saveState();
      }
      console.log("setUserRoom", dataNewRoom);
      return dataNewRoom;
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
    currentState.owner.start = true;
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
