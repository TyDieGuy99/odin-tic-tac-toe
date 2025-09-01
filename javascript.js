/* module pattern create game board and any components that go with it, set spot values */
const gameBoard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];
    
        for (var i = 0; i< rows; i++) {
            board[i] = [];
            for (var j = 0; j < columns; j++) {
                board[i].push(cell());
            }
        }

        const getBoard = () => board;

        const placeMarker = (column, player) => {

            const availableSpot = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

            if (!availableSpot.length) return;

            const openSpot = availableSpot.length - 1;
            board[openSpot][column].addMark(player);
        };

        const printBoard = () => {
            const boardWithSpotValues = board.map((row) => row.map((spot) => spot.getValue()))
            console.log(boardWithSpotValues);
        };

        return {getBoard, placeMarker, printBoard};
})();

function cell() {
    let value = 0;

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addMark, getValue};
}

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

    playTurn = (column) => {
        console.log('Placing ' + getCurrentPlayer().mark + ' for ' + getCurrentPlayer().name);
        board.placeMarker(column, getCurrentPlayer().mark);

        switchPlayerTurn();
        printNewTurn();
    };

    printNewTurn();
    return {playTurn};
    
}

const game = gameController();