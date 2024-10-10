interface State {
  data: any;
  listeners: any;
  getState: any;
  setWinnerGame: any;
  setWinnerRound: any;
  addChoice: any;
  resetGame: any;
}

export const state: State = {
  data: {
    resultGame: "",
    playerWins: 0,
    pcWins: 0,
    playerChoice: "",
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setWinnerGame() {
    this.data.playerWins === 3
      ? (this.data.resultGame = "Ganaste")
      : (this.data.resultGame = "Perdiste");
  },
  setWinnerRound(winner: number) {
    if (winner == 1) {
      this.data.playerWins = this.data.playerWins + 1;
    } else {
      this.data.pcWins = this.data.pcWins + 1;
    }
  },
  addChoice(choice: string) {
    this.data.playerChoice = choice;
  },
  resetGame() {
    this.data.pcWins = 0;
    this.data.playerWins = 0;
    this.data.playerChoice = "";
  },
};
