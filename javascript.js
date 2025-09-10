/* module pattern create game board and any components that go with it, set spot values */
const gameBoard = (function () {

    const board = Array(9).fill().map(() => cell());

        const getBoard = () => board;

        const placeMarker = (spot, player) => {

            if (board[spot].getValue() !== 0) {
                return false; //this move dooesn't work
            }

            console.log('The square being played on is', spot + 1);
            board[spot].addMark(player);
            return true; //this move is good
        };
        
        const printBoard = () => {
            const values = board.map((cell) => cell.getValue());

            for (let i = 0; i < 9; i += 3) {
                console.log(values.slice(i, i + 3). join(' | '));
            }
        };

        return {getBoard, placeMarker, printBoard};
})();

/* cell/mark factory */
function cell() {
    let value = 0;

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addMark, getValue};
}

/* factory for controller gamestate, player turns, win con */
function gameController(playerOneName, playerTwoName) {
    const board = gameBoard;

    const players = [
            {
                name: playerOneName,
                mark: 'X'
            },
            {
                name: playerTwoName,
                mark: 'O'
            }
    ];

    let currentPlayer = players[0];

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    const getCurrentPlayer = () => currentPlayer;

    const printNewTurn = () => {
        board.printBoard();
        console.log(getCurrentPlayer().name + ' is taking their turn now.');
    };

    const playTurn = (spot) => {
        const moveSuccessful = board.placeMarker(spot, getCurrentPlayer().mark);
        //check if current spot is taken
        if (!moveSuccessful) {
            console.log('bad move');
            return; //if spot is taken, don't switch players
        }

        if (winningCondition() !== null) {
            console.log('The Winner is ' + getCurrentPlayer.name);
            return getCurrentPlayer().name;

        } else if (board.getBoard().every(cell => cell.getValue() !== 0)) {
            console.log('this is a tie');
            return 'tie';

        }
        
        console.log('Placing ' + getCurrentPlayer().mark + ' for ' + getCurrentPlayer().name);

        switchPlayerTurn();
        printNewTurn();
        
    };

    const winningCondition = () => {
        const winningBoards = [
        [0, 1 ,2],
        [3, 4, 5],
        [6, 7 ,8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

        for (let winCombo of winningBoards) {
            const [a, b, c] = winCombo;
            const spotA = board.getBoard()[a].getValue();
            const spotB = board.getBoard()[b].getValue();
            const spotC = board.getBoard()[c].getValue();

            if (spotA === spotB && spotB === spotC && spotA !== 0) {
                return;
            } 
        };

         return null;

    };
    
    const resetGame = () => {
            board.getBoard().forEach(cell => cell.addMark(0));
            currentPlayer = players[0];
            console.log('!!!this is a new game!!!')
            printNewTurn();
    };

    //call on start
    printNewTurn();
    return {playTurn, getCurrentPlayer, winningCondition, resetGame};
    
}

function displayController () {

    let game = null;

    const gameBoardDisplay = document.getElementById('gameBoard');
    const placeMarkerBtns = gameBoardDisplay.querySelectorAll('button');
    const winnerDisplay = document.getElementById('winner');
    const playerDisplay = document.getElementById('currentPlayer');
    const resetBtnContainer = document.getElementById('resetBtn');
    const startBtn = document.getElementById('startBtn');

    placeMarkerBtns.forEach(button => {
        button.disabled = true;
    })

    startBtn.onclick = function() {
        const playerOne = document.getElementById('playerOne').value;
        const playerTwo = document.getElementById('playerTwo').value;
        game = gameController(playerOne, playerTwo);
        placeMarkerBtns.forEach(button => {
            button.disabled = false;
        });
        playerDisplay.innerText = "It is " + game.getCurrentPlayer().name + `'s turn.`;
    }

    placeMarkerBtns.forEach(button => {
        button.disabled = true;
        button.addEventListener('click', function() {
            if (this.innerText === '0') {
                this.innerText = game.getCurrentPlayer().mark;
                const result = game.playTurn(button.id);
                playerDisplay.innerText = "It is " + game.getCurrentPlayer().name + `'s turn.`;
                console.log(result);
                if (result && result !== 'tie') {
                    displayWinner(result);
                    resetBtn();
                } else if (result && result === 'tie') {
                    winnerDisplay.innerText = 'The game is a tie!';
                    resetBtn();
                }
            }
        })
    });
    
    const displayWinner = (winner) => {
        winnerDisplay.innerText = 'The winner is ' + winner;
    }

    const resetBtn = () => {
        const resetBtn = document.createElement('button');
        resetBtnContainer.appendChild(resetBtn);
        resetBtn.textContent = 'Play Again!';
        resetBtn.onclick = function() {
            game.resetGame();
            playerDisplay.innerText = "It is " + game.getCurrentPlayer().name + `'s turn.`;
            placeMarkerBtns.forEach(button => {
                button.innerText = '0';
            });
            winnerDisplay.innerText = 'temp';
            resetBtn.remove();
        }
        
    }

    

};
displayController();