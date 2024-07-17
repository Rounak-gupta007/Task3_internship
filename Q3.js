document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let gameActive = true;
    const boardState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetGame);

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (boardState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        checkResult();
    }

    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        const roundDraw = !boardState.includes('');
        if (roundDraw) {
            statusText.textContent = 'Game ended in a draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    }

    function handleResetGame() {
        currentPlayer = 'X';
        gameActive = true;
        boardState.fill('');
        statusText.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    }
});
