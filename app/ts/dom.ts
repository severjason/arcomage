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
            this.gameOverId = "game_over";
            this.gameOverTitleId = "game_over_title";
            this.gameOverMovesId = "game_over_moves";
            this.wrapperId = "wrapper";
            this.winText = "Congratulations!<br>You win!";
            this.loseText = "Sorry, pal!<br>You lose...";
        }

        public showGameOverMessage(playerOneWin: boolean, playerOneMoves: number, playerOneScores: number): void {
            let text: string = (playerOneWin) ? this.winText : this.loseText;
            let background: string = (playerOneWin)
                ? "#2c3e50 url('../images/background/victory.jpg') center no-repeat"
                : "#2c3e50 url('../images/background/defeat.jpg') center no-repeat";
            let finalScores: number = (playerOneScores > 0) ? playerOneScores + (1000 - playerOneMoves * 10) : 0;
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
