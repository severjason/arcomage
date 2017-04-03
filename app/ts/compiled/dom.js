var ArcomageGame;
(function (ArcomageGame) {
    "use strict";
    class DOM {
        constructor() {
            this.gameOverId = "game_over";
            this.gameOverTitleId = "game_over_title";
            this.gameOverMovesId = "game_over_moves";
            this.wrapperId = "wrapper";
            this.winText = "Congratulations!<br>You win!";
            this.loseText = "Sorry, pal!<br>You lose...";
        }
        showGameOverMessage(playerOneWin, playerOneMoves, playerOneScores, difficulty) {
            let text = (playerOneWin) ? this.winText : this.loseText;
            let background = (playerOneWin)
                ? "#010101 url('../images/background/victory.jpg') center no-repeat"
                : "#010101 url('../images/background/defeat.jpg') center no-repeat";
            let winScores = (playerOneWin) ? 1000 : -1000;
            let difficultyScores = difficulty * 1000;
            let finalScores = (playerOneScores + winScores + difficultyScores > 0)
                ? playerOneScores + winScores + difficultyScores
                : 0;
            let movesText = `Scores: ${finalScores} <br><br> Moves: ${playerOneMoves}`;
            let container = document.querySelector("#game_over > .container");
            container.style.background = background;
            document.getElementById(this.gameOverTitleId).innerHTML = text;
            document.getElementById(this.gameOverMovesId).innerHTML = movesText;
            setTimeout(() => {
                document.getElementById(this.gameOverId).style.display = "block";
                document.getElementById(this.wrapperId).classList.toggle("blur");
            }, 500);
        }
    }
    ArcomageGame.DOM = DOM;
})(ArcomageGame || (ArcomageGame = {}));
