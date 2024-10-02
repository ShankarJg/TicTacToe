document.addEventListener("DOMContentLoaded", () => {
    const board = Array(3).fill().map(() => Array(3).fill(''));
    let isPlayer1Turn = true;
    const gameBoardElement = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');

    function initializeBoard() {
        gameBoardElement.innerHTML = '';
        board.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.classList.add('border-dark', 'rounded');
                cell.dataset.row = rowIndex;
                cell.dataset.col = colIndex;
                cell.addEventListener('click', handleCellClick);
                gameBoardElement.appendChild(cell);
            });
        });
    }

    function handleCellClick(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (board[row][col] !== '') {
            alert("Cell is already taken. Choose another cell.");
            return;
        }

        const currentSymbol = isPlayer1Turn ? 'X' : 'O';
        board[row][col] = currentSymbol;
        event.target.textContent = currentSymbol;

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => alert(`${winner} wins!`), 100);
            return;
        }

        if (isBoardFull()) {
            setTimeout(() => alert("It's a tie!"), 100);
            return;
        }

        isPlayer1Turn = !isPlayer1Turn;
    }

    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }
            if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            }
        }
        if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }
        return null;
    }

    function isBoardFull() {
        return board.every(row => row.every(cell => cell !== ''));
    }

    function restartGame() {
        board.forEach((row, rowIndex) => row.fill(''));
        isPlayer1Turn = true;
        initializeBoard();
    }

    initializeBoard();
    restartButton.addEventListener('click', restartGame);
});
