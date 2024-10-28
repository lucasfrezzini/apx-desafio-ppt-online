export const state = {
  data: {
    game: {
      winner: "",
      finish: false,
      players: [""],
      imOwner: false,
    },
    playerOwner: {
      id: "1234",
      name: "Tano",
      current_game_wins: 0,
      current_game_choice: "",
      online: false,
      start: false,
      history_wins: 0,
    },
    playerGuest: {
      id: "1222",
      name: "Guest",
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

  isLogged() {},
  setOwner() {
    const currentState = this.getState();
    currentState.game.imOwner = true;
  },

  setNewPlayer(name: string): boolean {
    const currentState = this.getState();
    //TODO conectar al endpoint /newplayer
    //TODO setear nuevo jugador
    return true;
  },
  // ? ONLINE is true if both players are online in teh same room
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
