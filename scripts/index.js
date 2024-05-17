import { Pieces } from "./factory.js";

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const pass = [0, 1, 2, 3, 4]

const arena = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
]

const colors = {
    0: "black",
    1: "red",
    2: "green",
    3: "blue",
    4: "yellow",
    10: "red",
    20: "green",
    30: "blue",
    40: "yellow",
};

let newPiece = new Pieces
let currentPiece = newPiece[Math.floor(Math.random(0) * 4)]

function draw() {
    for (let i = 0; i < arena.length; i++) {
        for (let j = 0; j < arena[i].length; j++) {
            ctx.fillStyle = colors[arena[i][j]]
            ctx.fillRect(j * 25, i * 25, 25, 25)
        }
    }
    for (let i = 0; i < currentPiece.pieces.length; i++) {
        arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x] = currentPiece.value;
    }

    requestAnimationFrame(draw)
}


draw()

let isRotating = false;
async function dropPiece(piece) {
    while (!isRotating && canMoveDown(piece)) {
        await new Promise(resolve => setTimeout(resolve, 100));
        movePieceDown(piece);
    }
    if (!isRotating) {
        newPiece = new Pieces()
        currentPiece = newPiece[Math.floor(Math.random(0) * 4) + 1]
        dropPiece(currentPiece);
    } else {
        isRotating = false;
    }
}


function canMoveDown(piece) {
    const allPieces = piece.pieces;
    for (let i = 0; i < allPieces.length; i++) {
        if (allPieces[i].y + 1 == arena.length || !(arena[allPieces[i].y + 1][allPieces[i].x] in pass)) {
            for (let i = 0; i < allPieces.length; i++) {
                arena[allPieces[i].y][allPieces[i].x] = piece.value * 10;
            }
            return false;
        }
    }
    return true;
}


function movePieceDown(Piece) {
    for (let i = 0; i < Piece.pieces.length; i++) {
        arena[Piece.pieces[i].y][Piece.pieces[i].x] = 0;
        if (Piece.pieces[i].y + 1 < arena.length) {
            arena[Piece.pieces[i].y + 1][Piece.pieces[i].x] = Piece.value;
            Piece.pieces[i].y++;
        }
    }
}

dropPiece(currentPiece)

document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        const limit = currentPiece.pieces.some(
            (piece) => piece.x == 0,
        );
        if (!limit) {
            for (let i = 0; i < currentPiece.pieces.length; i++) {
                arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x - 1] = currentPiece.value
                arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x] = 0
                currentPiece.pieces[i].x--
            }
        }
    }
    if (e.key == "ArrowRight") {
        const limit = currentPiece.pieces.some(
            (piece) => (piece.x == arena[0].length - 1 || !(arena[piece.y][piece.x + 1] in pass)),
        );
        console.log(limit);
        if (!limit) {
            for (let i = 0; i < currentPiece.pieces.length; i++) {
                arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x + 1] = currentPiece.value
                arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x] = 0
                currentPiece.pieces[i].x++
            }
        }
    }
    if (e.key == "ArrowUp") {
        if (!isRotating) {
            isRotating = true; 
            currentPiece = newPiece.turnRight(currentPiece);
            if (canMoveDown(currentPiece)) {
                dropPiece(currentPiece);
            }
            isRotating = false;
        }
    }
})