import { pieces } from "./factory.js";

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

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
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
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

async function dropPiece() {
    while (true) {
        canMoveDown(currentPiece)
        await new Promise(resolve => setTimeout(resolve, 100));
        movePieceDown(currentPiece);
    }
}

function canMoveDown(Piece) {
    Piece.pieces.reverse()
    for (let i = 0; i < Piece.pieces.length; i++) {
        console.log(arena[Piece.pieces[i].y + 1][Piece.pieces[i].x] && arena[Piece.pieces[i].y + 1][Piece.pieces[i].x] < 1 ||
            Piece.pieces[i].y >= arena.length);
        if (arena[Piece.pieces[i].y + 1][Piece.pieces[i].x]) {
            alert("opa")
            for (let j = 0; j < Piece.pieces.length; j++) {
                arena[Piece.pieces[i].y][Piece.pieces[i].x] = Piece.value / 10
            }
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


dropPiece()

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