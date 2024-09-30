const gameBoard = document.querySelector('.game-board');
const resultMessage = document.querySelector('.result-message');
const resetButton = document.querySelector('.reset-button');

let currentPlayer = 'X';
let gameActive = true;

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

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (!cell.textContent && gameActive) {
        cell.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        const cellA = gameBoard.children[a];
        const cellB = gameBoard.children[b];
        const cellC = gameBoard.children[c];

        if (cellA.textContent && cellA.textContent === cellB.textContent && cellA.textContent === cellC.textContent) {
            gameActive = false;
            resultMessage.textContent = `${currentPlayer} wins!`;

            // Add win effect and popup
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            document.body.appendChild(confetti);

            const popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `<h2>${currentPlayer} wins!</h2>`;
            document.body.appendChild(popup);
        }
    });

    if (!gameActive && !resultMessage.textContent) {
        resultMessage.textContent = "It's a draw!";
    }
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    resultMessage.textContent = '';

    Array.from(gameBoard.children).forEach(cell => {
        cell.textContent = '';
    });

    // Remove confetti and popup
    const confetti = document.querySelector('.confetti');
    if (confetti) {
        confetti.remove();
    }
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}

gameBoard.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
