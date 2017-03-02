class DOM {
    constructor() {
        this.gameOverId = "game_over";
        this.gameOverTitleId = "game_over_title";
        this.gameOverMovesId = "game_over_moves";
        this.winText = "Congratulations!<br>You win!";
        this.loseText = "Sorry, pal!<br>You lose...";
    }

    showGameOverMessage(playerOneWin, playerOneMoves) {
        let text = (playerOneWin) ? this.winText : this.loseText;
        let movesText = `Your moves: ${playerOneMoves}`;
        document.getElementById(this.gameOverTitleId).innerHTML = text;
        document.getElementById(this.gameOverMovesId).innerHTML = movesText;
        setTimeout(() => {
            document.getElementById(this.gameOverId).style.display = "block";
        }, 500);
    }
}
