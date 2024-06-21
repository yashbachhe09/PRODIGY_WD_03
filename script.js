document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restart");
    
    let currentPlayer = "X";
    let board = Array(9).fill(null);
    let isGameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const index = event.target.getAttribute("data-index");

        if (!isGameActive || board[index]) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            messageElement.textContent = (`${currentPlayer} Wins!;
            isGameActive = false`);
        } else if (board.every(cell => cell)) {
            messageElement.textContent = "It's a Draw!";
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messageElement.textContent =(`Current Player: ${currentPlayer}`) ;
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });
    }

    function restartGame() {
        board.fill(null);
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        isGameActive = true;
        messageElement.textContent = (`Current Player: ${currentPlayer}`);
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);

    messageElement.textContent = (`Current Player: ${currentPlayer}`);
});