document.addEventListener('DOMContentLoaded', function () {
    const boxes = document.querySelectorAll('.box');
    const resetButton = document.getElementById('reset-btn');
    const newGameButton = document.getElementById('new-btn');
    const messageContainer = document.querySelector('.msg-container');
    const messageText = document.getElementById('msg');

    let currentPlayer = 'X';
    let moves = 0;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    // Function to check if a player has won
    function checkWinner() {
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

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        if (moves === 9) {
            return 'tie';
        }

        return null;
    }

    // Function to handle click on a box
    function handleBoxClick(index) {
        if (!gameOver && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            boxes[index].textContent = currentPlayer;
            moves++;

            const winner = checkWinner();
            if (winner) {
                if (winner === 'tie') {
                    messageText.textContent = "It's a tie!";
                } else {
                    messageText.textContent = `${winner} wins!`;
                }
                messageContainer.classList.remove('hide');
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = 'X';
        moves = 0;
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        messageContainer.classList.add('hide');
        boxes.forEach((box) => {
            box.textContent = '';
        });
    }

    // Event listeners
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            handleBoxClick(index);
        });
    });

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    newGameButton.addEventListener('click', () => {
        resetGame();
    });
});
