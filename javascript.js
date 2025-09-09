/* module pattern create game board and any components that go with it, set spot values */
const gameBoard = (function () {

    const board = Array(9).fill().map(() => cell());

        const getBoard = () => board;

        const placeMarker = (spot, player) => {

            if (board[spot].getValue() !== 0) {
                return false; //this move dooesn't work
            }

            console.log(spot + 1 + ' is where this turn is being played');
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
function gameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
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
            resetGame();
            return;

        } else if (board.getBoard().every(cell => cell.getValue() !== 0)) {
            console.log('this is a tie');
            resetGame();
            return;

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
                console.log('you won ' + spotA);    
                return spotA;
            } 
        };

         return null;

    };
    
    const resetGame = () => {
            board.getBoard().forEach(cell => cell.addMark(0));
            currentPlayer = players[0];
            console.clear();
            console.log('!!!this is a new game!!!')
            printNewTurn();
    }

    //call on start
    printNewTurn();
    return {playTurn};
    
}

const game = gameController();