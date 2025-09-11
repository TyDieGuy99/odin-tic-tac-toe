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
                mark: 'X',
                color: '#0edee6'
            },
            {
                name: playerTwoName,
                mark: 'O',
                color: '#73bfa6'
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
    const gameStatus = document.getElementById('gameStatus');
    const playBtn = document.getElementById('playBtn');

    placeMarkerBtns.forEach(button => {
        button.disabled = true;
    })

    playBtn.onclick = function() {
        let playerOne = document.getElementById('playerOne').value;
        if (playerOne=== "") {
            playerOne= 'Player One';
        }
        let playerTwo = document.getElementById('playerTwo').value;
        if (playerTwo === "") {
            playerTwo = 'Player Two';
        }
        document.getElementById('playerOneLabel').innerText = playerOne + ': X'
        document.getElementById('playerTwoLabel').innerText = playerTwo + ': O'
        game = gameController(playerOne, playerTwo);
        placeMarkerBtns.forEach(button => {
            button.disabled = false;
        });
        gameStatus.innerText = "It is " + game.getCurrentPlayer().name + `'s turn.`;
        document.getElementById('playerOne').disabled = true;
        document.getElementById('playerTwo').disabled = true;
        playBtn.disabled = true;
    }

    placeMarkerBtns.forEach(button => {
        button.disabled = true;
        button.addEventListener('click', function() {
            if (this.innerText === '-') {
                this.innerText = game.getCurrentPlayer().mark;
                this.style.color = game.getCurrentPlayer().color;
                const result = game.playTurn(button.id);
                gameStatus.innerText = "It is " + game.getCurrentPlayer().name + `'s turn.`;
                console.log(result);
                if (result && result !== 'tie') {
                    placeMarkerBtns.forEach(button => {
                        button.disabled = true;
                    });
                    displayWinner(result);
                    resetGame();
                } else if (result && result === 'tie') {
                    gameStatus.innerText = 'The game is a tie!';
                    placeMarkerBtns.forEach(button => {
                        button.disabled = true;
                    });
                    resetGame();
                }
            }
        })
    });
    
    const displayWinner = (winner) => {
        gameStatus.innerText = 'The winner is ' + winner;
        
    }

    const resetGame = () => {
        playBtn.textContent = 'Play Again!';
        playBtn.disabled = false;
        playBtn.onclick = function() {
            game.resetGame();
            gameStatus.innerText = "It is " + game.getCurrentPlayer().name + `'s turn.`;
            playBtn.disabled = true;
            placeMarkerBtns.forEach(button => {
                button.innerText = '-';
                button.disabled = false;
                button.style.color = 'black';
            });
        }
        
    }
};
displayController();