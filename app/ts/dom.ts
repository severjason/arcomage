namespace ArcomageGame {
    "use strict";

    export class DOM {

        public gameOverId: string;
        public gameOverTitleId: string;
        public gameOverMovesId: string;
        public winText: string;
        public loseText: string;
        public wrapperId: string;

        constructor() {
            this.gameOverId = "game-over";
            this.gameOverTitleId = "game-over-title";
            this.gameOverMovesId = "game-over-moves";
            this.wrapperId = "wrapper";
            this.winText = "Congratulations!<br>You win!";
            this.loseText = "Sorry, pal!<br>You lose...";
        }

        public showGameOverMessage(
            playerOneWin: boolean,
            playerOneMoves: number,
            playerOneScores: number): void {
            let text: string = (playerOneWin) ? this.winText : this.loseText;
            let background: string = (playerOneWin)
                ? "#010101 url('../images/background/victory.jpg') center no-repeat"
                : "#010101 url('../images/background/defeat.jpg') center no-repeat";
            let winScores = (playerOneWin) ? 1000 : -1000;
            let finalScores: number = (playerOneScores + winScores > 0)
                ? playerOneScores + winScores
                : 0;
            let movesText: string = `Scores: ${finalScores} <br><br> Moves: ${playerOneMoves}`;
            let container = <HTMLElement> document.querySelector("#game_over > .container");
            container.style.background = background;
            document.getElementById(this.gameOverTitleId).innerHTML = text;
            document.getElementById(this.gameOverMovesId).innerHTML = movesText;
            setTimeout(() => {
                document.getElementById(this.gameOverId).style.display = "block";
                document.getElementById(this.wrapperId).classList.toggle("blur");
            }, 500);
        }
    }
}
