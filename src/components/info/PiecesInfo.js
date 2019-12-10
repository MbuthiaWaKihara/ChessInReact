//this constant introduces the app to the various chess pieces
//it also tells the app how to place them at first
export const initialPieceInfo = [
    {
        pieceId: 1,
        pieceName: 'Rook',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 5,
            fileName: 'a',
        }
    },
    {
        pieceId: 2,
        pieceName: 'Rook',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 5,
            fileNumber: 5,
            fileName: 'h',
        }
    },
    {
        pieceId: 3,
        pieceName: 'Rook',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 1,
            fileName: 'a',
        }
    },
    {
        pieceId: 4,
        pieceName: 'Rook',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 6,
            fileNumber: 6,
            fileName: 'h',
        }
    },
    {
        pieceId: 5,
        pieceName: 'Knight',
        pieceColor: 'white',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 2,
            fileName: 'b',
        }
    },
    {
        pieceId: 6,
        pieceName: 'Knight',
        pieceColor: 'white',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 7,
            fileName: 'g',
        }
    },
    {
        pieceId: 7,
        pieceName: 'Knight',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 3,
            fileNumber: 3,
            fileName: 'b',
        }
    },
    {
        pieceId: 8,
        pieceName: 'Knight',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 5,
            fileName: 'g',
        }
    },
    {
        pieceId: 9,
        pieceName: 'Bishop',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 3,
            fileNumber: 4,
            fileName: 'c',
        }
    },
    {
        pieceId: 10,
        pieceName: 'Bishop',
        pieceColor: 'white',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 6,
            fileName: 'f',
        }
    },
    {
        pieceId: 11,
        pieceName: 'Bishop',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 4,
            fileName: 'c',
        }
    },
    {
        pieceId: 12,
        pieceName: 'Bishop',
        pieceColor: 'black',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 6,
            fileName: 'f',
        }
    },
    {
        pieceId: 13,
        pieceName: 'Queen',
        pieceColor: 'white',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 4,
            fileName: 'd',
        }
    },
    {
        pieceId: 14,
        pieceName: 'Queen',
        pieceColor: 'black',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 4,
            fileName: 'd',
        }
    },
    {
        pieceId: 15,
        pieceName: 'King',
        pieceColor: 'white',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 5,
            fileName: 'e',
        }
    },
    {
        pieceId: 16,
        pieceName: 'King',
        pieceColor: 'black',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 5,
            fileName: 'e',
        }
    },
    {
        pieceId: 17,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 1,
            fileName: 'a',
        }
    },{
        pieceId: 18,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 2,
            fileName: 'b',
        }
    },{
        pieceId: 19,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 3,
            fileName: 'c',
        }
    },{
        pieceId: 20,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 4,
            fileName: 'd',
        }
    },{
        pieceId: 21,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 5,
            fileName: 'e',
        }
    },{
        pieceId: 22,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 6,
            fileName: 'f',
        }
    },{
        pieceId: 23,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 7,
            fileName: 'g',
        }
    },{
        pieceId: 24,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 1,
        positionOnBoard: {
            rankNumber: 4,
            fileNumber: 8,
            fileName: 'h',
        }
    },{
        pieceId: 25,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 1,
            fileName: 'a',
        }
    },{
        pieceId: 26,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 2,
            fileName: 'b',
        }
    },{
        pieceId: 27,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 3,
            fileName: 'c',
        }
    },{
        pieceId: 28,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 4,
            fileName: 'd',
        }
    },{
        pieceId: 29,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 5,
            fileName: 'e',
        }
    },{
        pieceId: 30,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 6,
            fileName: 'f',
        }
    },{
        pieceId: 31,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 7,
            fileName: 'g',
        }
    },{
        pieceId: 32,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: true,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 8,
            fileName: 'h',
        }
    },
];

