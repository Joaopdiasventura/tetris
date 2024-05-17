import { pieces } from "./factory.js";

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

let currentPiece = { value: 2, pieces: [{ x: 7, y: 0 }, { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }] }

function draw() {
    for (let i = 0; i < arena.length; i++) {
        for (let j = 0; j < arena[i].length; j++) {
            let color;
            switch (arena[i][j]) {
                case 1:
                    color = "red"
                    break;
                case 2:
                    color = "green"
                    break;
                case 3:
                    color = "blue"
                    break;
                case 4:
                    color = "yellow"
                    break;
                case 10:
                    color = "red"
                    break;
                case 20:
                    color = "green"
                    break;
                case 30:
                    color = "blue"
                    break;
                case 40:
                    color = "yellow"
                    break;
                default:
                    color = "black"
                    break;
            }
            ctx.fillStyle = color
            ctx.fillRect(j * 25, i * 25, 25, 25)
        }
    }
    for (let i = 0; i < currentPiece.pieces.length; i++) {
        arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x] = currentPiece.value;
    }

    requestAnimationFrame(draw)
}


draw()

async function dropPiece(piece) {
    while (canMoveDown(piece)) {
        await new Promise(resolve => setTimeout(resolve, 100));
        movePieceDown(currentPiece);
    }
    currentPiece = pieces[0]
    dropPiece(currentPiece)
}

function canMoveDown(piece) {
    const allPieces = piece.pieces;
    for (let i = 0; i < allPieces.length; i++) {
        if (!(arena[allPieces[i].y + 1][allPieces[i].x] in pass)) {
            for (let j = 0; j < allPieces.length; j++) {
                arena[allPieces[i].y][allPieces[i].x] = piece.value * 10
            }
            return false
        }
    }
    return true;
}

function movePieceDown(Piece) {
    for (let i = 0; i < Piece.pieces.length; i++) {
        arena[Piece.pieces[i].y][Piece.pieces[i].x] = 0;
        arena[Piece.pieces[i].y + 1][Piece.pieces[i].x] = Piece.value;
        Piece.pieces[i].y++;
    }
}

dropPiece(currentPiece)

document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        for (let i = 0; i < currentPiece.pieces.length; i++) {
            arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x - 1] = currentPiece.value
            arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x] = 0
            currentPiece.pieces[i].x--
        }
    }
    if (e.key == "ArrowRight") {
        for (let i = 0; i < currentPiece.pieces.length; i++) {
            arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x + 1] = currentPiece.value
            arena[currentPiece.pieces[i].y][currentPiece.pieces[i].x] = 0
            currentPiece.pieces[i].x++
        }
    }
})