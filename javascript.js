/* module pattern create game board and any components that go with it, set spot values */
const gameBoard = (function () {

    const board = Array(9).fill().map(() => cell());

        const getBoard = () => board;

        const placeMarker = (spot, player) => {

            if (board[spot].getValue() === 0) {
                console.log(board[spot] + ' is where this turn is being played');
                board[spot].addMark(player);
            }
            else {
                console.log('this was an invalid move');
                return; 
            }
        };
        
        const printBoard = () => {
            const values = board.map((cell) => cell.getValue());
        
            for (let i = 0; i < 9; i += 3) {
                console.log(values.slice(i, i, 3).join(' | '));
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

    };
    const getCurrentPlayer = () => currentPlayer;

    const printNewTurn = () => {
        board.printBoard();
        console.log(getCurrentPlayer().name + ' is taking their turn now.');
    };

    playTurn = (spot) => {
        console.log('Placing ' + getCurrentPlayer().mark + ' for ' + getCurrentPlayer().name);
        board.placeMarker(spot, getCurrentPlayer().mark);

        switchPlayerTurn();
        printNewTurn();
    };

    printNewTurn();
    return {playTurn};
    
}

const game = gameController();