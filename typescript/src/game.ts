export class Game {

    messages: string = '';
    private players: Array<string> = [];
    private places: Array<number> = [];
    private purses: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    constructor() {

        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push(this.createRockQuestion(i));
          }
    }

    private createRockQuestion(index: number): string {
        return "Rock Question " + index;
    }

    public add(name: string): boolean {
        this.players.push(name);
        this.places[this.howManyPlayers() - 1] = 0;
        this.purses[this.howManyPlayers() - 1] = 0;
        this.inPenaltyBox[this.howManyPlayers() - 1] = false;

        this.printMessage(name + " was added");
        this.printMessage("They are player number " + this.players.length);

        return true;
    }

    private printMessage(message: string) {
        this.messages += message + '\n';
        console.log(message);
    }

    public howManyPlayers(): number {
        return this.players.length;
    }

    public roll(roll: number) {
        this.printMessage(this.players[this.currentPlayer] + " is the current player");
        this.printMessage("They have rolled a " + roll);
        if (this.inPenaltyBox[this.currentPlayer]) {

          if (roll % 2 != 0) {
            this.isGettingOutOfPenaltyBox = true;
            console.log(this.places);
            this.printMessage(this.players[this.currentPlayer] + " is getting out of the penalty box");
            this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
            if (this.places[this.currentPlayer] > 11) {
              this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
            }

            this.printMessage(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
            this.printMessage("The category is " + this.currentCategory());
            this.askQuestion();
          } else {
            this.printMessage(this.players[this.currentPlayer] + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {

          this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
          if (this.places[this.currentPlayer] > 11) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
          }

          this.printMessage(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
          this.printMessage("The category is " + this.currentCategory());
          this.askQuestion();
        }
    }

    public askQuestion(): void {
        if (this.currentCategory() == 'Pop')
            this.printMessage(this.popQuestions.shift());
        if (this.currentCategory() == 'Science')
            this.printMessage(this.scienceQuestions.shift());
        if (this.currentCategory() == 'Sports')
            this.printMessage(this.sportsQuestions.shift());
        if (this.currentCategory() == 'Rock')
            this.printMessage(this.rockQuestions.shift());
    }

    private currentCategory(): string {
        if (this.places[this.currentPlayer] == 0)
            return 'Pop';
        if (this.places[this.currentPlayer] == 4)
            return 'Pop';
        if (this.places[this.currentPlayer] == 8)
            return 'Pop';
        if (this.places[this.currentPlayer] == 1)
            return 'Science';
        if (this.places[this.currentPlayer] == 5)
            return 'Science';
        if (this.places[this.currentPlayer] == 9)
            return 'Science';
        if (this.places[this.currentPlayer] == 2)
            return 'Sports';
        if (this.places[this.currentPlayer] == 6)
            return 'Sports';
        if (this.places[this.currentPlayer] == 10)
            return 'Sports';
        return 'Rock';
    }

    private didPlayerWin(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        this.printMessage('Question was incorrectly answered');
        this.printMessage(this.players[this.currentPlayer] + " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
              this.printMessage('Answer was correct!!!!');
              this.purses[this.currentPlayer] += 1;
              this.printMessage(this.players[this.currentPlayer] + " now has " +
              this.purses[this.currentPlayer] + " Gold Coins.");

              var winner = this.didPlayerWin();
              this.currentPlayer += 1;
              if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;

              return winner;
            } else {
              this.currentPlayer += 1;
              if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
              return true;
            }


          } else {

            this.printMessage("Answer was correct!!!!");

            this.purses[this.currentPlayer] += 1;
            this.printMessage(this.players[this.currentPlayer] + " now has " +
                this.purses[this.currentPlayer] + " Gold Coins.");

            var winner = this.didPlayerWin();

            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;

            return winner;
          }
    }

}
