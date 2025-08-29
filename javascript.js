const gameBoard = (function () {
    let board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    const getSquare = (index1, index2) => {
        return board[index1][index2];
    };

    const setSquare = (index1, index2) => {
        board[index1][index2] = mark;
    };

    return {board, getSquare, setSquare};
})();

function createPlayer (name, mark) {
    const playerName = name;
    const playerMark = mark;
    return {playerName, playerMark};
};

function gameState () {

};

const player1 = createPlayer('tom', 'X');
const player2 = createPlayer('bill', 'O');

console.log('everything works!');
console.log(player1);
console.log(player2);

