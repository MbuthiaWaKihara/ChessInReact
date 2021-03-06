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
            fileNumber: 1,
        }
    },
    {
        pieceId: 2,
        pieceName: 'Rook',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 8,
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
        }
    },
    {
        pieceId: 4,
        pieceName: 'Rook',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 8,
        }
    },
    {
        pieceId: 5,
        pieceName: 'Knight',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 2,
        }
    },
    {
        pieceId: 6,
        pieceName: 'Knight',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 7,
        }
    },
    {
        pieceId: 7,
        pieceName: 'Knight',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 2,
        }
    },
    {
        pieceId: 8,
        pieceName: 'Knight',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 7,
        }
    },
    {
        pieceId: 9,
        pieceName: 'Bishop',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 3,
        }
    },
    {
        pieceId: 10,
        pieceName: 'Bishop',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 6,
        }
    },
    {
        pieceId: 11,
        pieceName: 'Bishop',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 3,
        }
    },
    {
        pieceId: 12,
        pieceName: 'Bishop',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 6,
        }
    },
    {
        pieceId: 13,
        pieceName: 'Queen',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 4,
        }
    },
    {
        pieceId: 14,
        pieceName: 'Queen',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 4,
        }
    },
    {
        pieceId: 15,
        pieceName: 'King',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 1,
            fileNumber: 5,
        }
    },
    {
        pieceId: 16,
        pieceName: 'King',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 8,
            fileNumber: 5,
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
        }
    },{
        pieceId: 18,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 2,
        }
    },{
        pieceId: 19,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 3,
        }
    },{
        pieceId: 20,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 4,
        }
    },{
        pieceId: 21,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 5,
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
        }
    },{
        pieceId: 24,
        pieceName: 'Pawn',
        pieceColor: 'white',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 2,
            fileNumber: 8,
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
        }
    },{
        pieceId: 27,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 3,
        }
    },{
        pieceId: 28,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 4,
        }
    },{
        pieceId: 29,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 5,
        }
    },{
        pieceId: 30,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 6,
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
        }
    },{
        pieceId: 32,
        pieceName: 'Pawn',
        pieceColor: 'black',
        hasBeenCaptured: false,
        noOfMoves: 0,
        positionOnBoard: {
            rankNumber: 7,
            fileNumber: 8,
        }
    },
];

