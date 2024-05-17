export class Pieces {
    1 = { value: 1, pieces: [{ x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }], position: 1 }
    2 = { value: 2, pieces: [{ x: 7, y: 0 }, { x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }], position: 1 }
    3 = { value: 3, pieces: [{ x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 8, y: 1 }], position: 1 }
    4 = { value: 4, pieces: [{ x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 7, y: 1 }], position: 1 }

    turnRight(piece) {
        const { value, position, pieces } = piece;
        if (position === 1) {
            if (value === 1) {
                return {
                    value: 1,
                    pieces: [
                        { x: pieces[0].x, y: pieces[0].y - 1 },
                        { x: pieces[0].x, y: pieces[0].y },
                        { x: pieces[0].x, y: pieces[0].y + 1 },
                        { x: pieces[0].x, y: pieces[0].y + 2 }
                    ],
                    position: 2
                };
            } else if (value === 2) {
                return {
                    value: 2,
                    pieces: [
                        { x: pieces[0].x + 1, y: pieces[0].y - 1 },
                        { x: pieces[0].x, y: pieces[0].y - 1 },
                        { x: pieces[0].x - 1, y: pieces[0].y - 1 },
                        { x: pieces[0].x - 2, y: pieces[0].y - 1 }
                    ],
                    position: 2
                };
            } else if (value === 3) {
                return {
                    value: 3,
                    pieces: [
                        { x: pieces[0].x + 1, y: pieces[0].y - 1 },
                        { x: pieces[0].x, y: pieces[0].y - 1 },
                        { x: pieces[0].x - 1, y: pieces[0].y - 1 },
                        { x: pieces[0].x - 1, y: pieces[0].y }
                    ],
                    position: 2
                };
            } else if (value === 4) {
                return {
                    value: 4,
                    pieces: [
                        { x: pieces[0].x - 1, y: pieces[0].y - 1 },
                        { x: pieces[0].x - 1, y: pieces[0].y },
                        { x: pieces[0].x, y: pieces[0].y },
                        { x: pieces[0].x, y: pieces[0].y + 1 }
                    ],
                    position: 2
                };
            }
        } else if (position === 2) {
            if (value === 1) {
                return {
                    value: 1,
                    pieces: [
                        { x: pieces[0].x - 1, y: pieces[0].y },
                        { x: pieces[0].x, y: pieces[0].y },
                        { x: pieces[0].x + 1, y: pieces[0].y },
                        { x: pieces[0].x + 2, y: pieces[0].y }
                    ],
                    position: 1
                };
            } else if (value === 2) {
                return {
                    value: 2,
                    pieces: [
                        { x: pieces[0].x - 1, y: pieces[0].y + 1 },
                        { x: pieces[0].x - 1, y: pieces[0].y },
                        { x: pieces[0].x - 1, y: pieces[0].y - 1 },
                        { x: pieces[0].x - 1, y: pieces[0].y - 2 }
                    ],
                    position: 1
                };
            } else if (value === 3) {
                return {
                    value: 3,
                    pieces: [
                        { x: pieces[0].x - 1, y: pieces[0].y + 1 },
                        { x: pieces[0].x - 1, y: pieces[0].y },
                        { x: pieces[0].x - 1, y: pieces[0].y - 1 },
                        { x: pieces[0].x, y: pieces[0].y - 1 }
                    ],
                    position: 1
                };
            } else if (value === 4) {
                return {
                    value: 4,
                    pieces: [
                        { x: pieces[0].x + 1, y: pieces[0].y + 1 },
                        { x: pieces[0].x + 1, y: pieces[0].y },
                        { x: pieces[0].x, y: pieces[0].y },
                        { x: pieces[0].x, y: pieces[0].y - 1 }
                    ],
                    position: 1
                };
            }
        }
        return piece;
    }
}
