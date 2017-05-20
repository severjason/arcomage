export class DOM {
    constructor() {
        this.gameOverId = "game-over";
        this.gameOverTitleId = "game-over-title";
        this.gameOverMovesId = "game-over-moves";
        this.wrapperId = "wrapper";
        this.winText = "Congratulations!<br>You win!";
        this.loseText = "Sorry, pal!<br>You lose...";
    }
    showGameOverMessage(playerOneWin, playerOneMoves, playerOneScores) {
        const text = (playerOneWin) ? this.winText : this.loseText;
        const background = (playerOneWin)
            ? "#010101 url('../images/background/victory.jpg') center no-repeat"
            : "#010101 url('../images/background/defeat.jpg') center no-repeat";
        const winScores = (playerOneWin) ? 1000 : -1000;
        const finalScores = (playerOneScores + winScores > 0)
            ? playerOneScores + winScores
            : 0;
        const movesText = `Scores: ${finalScores} <br><br> Moves: ${playerOneMoves}`;
        const container = document.querySelector("#game-over > .container");
        container.style.background = background;
        document.getElementById(this.gameOverTitleId).innerHTML = text;
        document.getElementById(this.gameOverMovesId).innerHTML = movesText;
        setTimeout(() => {
            document.getElementById(this.gameOverId).style.display = "block";
            document.getElementById(this.wrapperId).classList.toggle("blur");
        }, 500);
    }
}
