//this function generates possible moves for the king
//it also tracks the safety of the king based on possible moves of other pieces
//it returns the possible moves of the kings and a boolean that tracks situations when either of the kings is in danger

export const kingTracker = (possibleMoves, chessboardSituation, isLayoutDefault) => {
    let kingInfo = [];
    let kingPossibleMoves = [];
    let isKingInCheck = {status:false, id:null};

    chessboardSituation.forEach(
        (rankInfo, rankIndex) => {
            rankInfo.associatedFilesSituation.forEach(
                (fileInfo, fileIndex) => {
                    if(fileInfo.hasPiece && fileInfo.pieceName === 'King'){//we generate possible moves for this piece
                        let pieceId = fileInfo.pieceId;
                        let pieceColor = fileInfo.pieceColor;
                        let pieceMoves = fileInfo.pieceMoves;
                        let pieceRank = fileInfo.positionOnBoard.rankNumber;
                        let pieceFile = fileInfo.positionOnBoard.fileNumber;
                        let moves = [];

                        //is the king in check?
                        possibleMoves.forEach(
                            (piece, pieceId) => {
                                piece.moves.forEach(
                                    (move, moveId) => {
                                        if(move.substring(0,3) === `${rankInfo.rankNumber}.${fileInfo.fileNumber}`
                                        && piece.pieceColor !== fileInfo.pieceColor){
                                            isKingInCheck = {status:true, id:fileInfo.pieceId};
                                        }
                                    }
                                );
                            }
                        );

                        //a king can move a single square in any direction provided that square exists, 
                        //has no piece and is not a possible move for an opponent piece

                        //up the board
                        if(chessboardSituation[rankIndex - 1]
                            && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].hasPiece){
                                //check if this square is under attack by an opponent piece
                                let isUnderPressure = false;
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                       piece.moves.forEach(
                                           (move, moveIndex) => {
                                                if(move.substring(0,3) === `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].fileNumber}` && piece.pieceColor !== pieceColor){
                                                    isUnderPressure = true;
                                                }
                                           }
                                       );
                                    }
                                );

                                if(!isUnderPressure){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].fileNumber}`
                                    ];
                                }

                            }

                            //up the board left
                            if(chessboardSituation[rankIndex - 1]
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1]
                                && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].hasPiece){
                                    //check if this square is under attack by an opponent piece
                                    let isUnderPressure = false;
                                    possibleMoves.forEach(
                                        (piece, pieceIndex) => {
                                        piece.moves.forEach(
                                            (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].fileNumber}` && piece.pieceColor !== pieceColor){
                                                        isUnderPressure = true;
                                                    }
                                            }
                                        );
                                        }
                                    );

                                    if(!isUnderPressure){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].fileNumber}`
                                        ];
                                    }

                                }

                                //up the board right
                                if(chessboardSituation[rankIndex - 1]
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1]
                                    && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].hasPiece){
                                        //check if this square is under attack by an opponent piece
                                        let isUnderPressure = false;
                                        possibleMoves.forEach(
                                            (piece, pieceIndex) => {
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                        if(move.substring(0,3) === `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].fileNumber}` && piece.pieceColor !== pieceColor){
                                                            isUnderPressure = true;
                                                        }
                                                }
                                            );
                                            }
                                        );

                                        if(!isUnderPressure){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].fileNumber}`
                                            ];
                                        }

                                    }

                            //down the board
                            if(chessboardSituation[rankIndex + 1]
                                && !chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].hasPiece){
                                    //check if this square is under attack by an opponent piece
                                    let isUnderPressure = false;
                                    possibleMoves.forEach(
                                        (piece, pieceIndex) => {
                                        piece.moves.forEach(
                                            (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].fileNumber}` && piece.pieceColor !== pieceColor){
                                                        isUnderPressure = true;
                                                    }
                                            }
                                        );
                                        }
                                    );

                                    if(!isUnderPressure){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].fileNumber}`
                                        ];
                                    }

                                }

                                //down the board left
                                if(chessboardSituation[rankIndex + 1]
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1]
                                    && !chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].hasPiece){
                                        //check if this square is under attack by an opponent piece
                                        let isUnderPressure = false;
                                        possibleMoves.forEach(
                                            (piece, pieceIndex) => {
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                        if(move.substring(0,3) === `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].fileNumber}` && piece.pieceColor !== pieceColor){
                                                            isUnderPressure = true;
                                                        }
                                                }
                                            );
                                            }
                                        );

                                        if(!isUnderPressure){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].fileNumber}`
                                            ];
                                        }

                                    }

                                    //up the board right
                                    if(chessboardSituation[rankIndex + 1]
                                        && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1]
                                        && !chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].hasPiece){
                                            //check if this square is under attack by an opponent piece
                                            let isUnderPressure = false;
                                            possibleMoves.forEach(
                                                (piece, pieceIndex) => {
                                                piece.moves.forEach(
                                                    (move, moveIndex) => {
                                                            if(move.substring(0,3) === `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].fileNumber}` && piece.pieceColor !== pieceColor){
                                                                isUnderPressure = true;
                                                            }
                                                    }
                                                );
                                                }
                                            );

                                            if(!isUnderPressure){
                                                moves = [
                                                    ...moves,
                                                    `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].fileNumber}`
                                                ];
                                            }

                                        }

                                 //towards the left
                                if(chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1]
                                    && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].hasPiece){
                                        //check if this square is under attack by an opponent piece
                                        let isUnderPressure = false;
                                        possibleMoves.forEach(
                                            (piece, pieceIndex) => {
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                        if(move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].fileNumber}` && piece.pieceColor !== pieceColor){
                                                            isUnderPressure = true;
                                                        }
                                                }
                                            );
                                            }
                                        );

                                        if(!isUnderPressure){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].fileNumber}`
                                            ];
                                        }

                                    }

                                      //towards the right
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1]
                                        && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].hasPiece){
                                            //check if this square is under attack by an opponent piece
                                            let isUnderPressure = false;
                                            possibleMoves.forEach(
                                                (piece, pieceIndex) => {
                                                piece.moves.forEach(
                                                    (move, moveIndex) => {
                                                            if(move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].fileNumber}` && piece.pieceColor !== pieceColor){
                                                                isUnderPressure = true;
                                                            }
                                                    }
                                                );
                                                }
                                            );

                                            if(!isUnderPressure){
                                                moves = [
                                                    ...moves,
                                                    `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].fileNumber}`
                                                ];
                                            }

                                        }

                        
                        //CAPTURES
                        //a king can capture an opponent piece from any direction provided that square exists, 
                        // and has an opponent piece 

                        //up the board
                        if(chessboardSituation[rankIndex - 1]
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].hasPiece
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].pieceColor !== pieceColor){ 
                               
                                moves = [
                                    ...moves,
                                    `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].fileNumber}.X`
                                ];
                            }

                            //up the board left
                            if(chessboardSituation[rankIndex - 1]
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1]
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].hasPiece
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].pieceColor !== pieceColor){
                                    
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].fileNumber}.X`
                                    ];
                                }

                                //up the board right
                                if(chessboardSituation[rankIndex - 1]
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1]
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].hasPiece
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].pieceColor !== pieceColor){
                                                           
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].fileNumber}.X`
                                        ];
                                    }

                            //down the board
                            if(chessboardSituation[rankIndex + 1]
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].hasPiece
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].pieceColor !== pieceColor){
                                    
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].fileNumber}.X`
                                    ];
                                }

                                //down the board left
                                if(chessboardSituation[rankIndex + 1]
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1]
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].hasPiece
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].pieceColor !== pieceColor){
                                                                        
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].fileNumber}.X`
                                        ];
                                    }

                                    //up the board right
                                    if(chessboardSituation[rankIndex + 1]
                                        && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1]
                                        && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].hasPiece
                                        && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].pieceColor !== pieceColor){
                                        
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].fileNumber}.X`
                                            ];
                                        }

                                 //towards the left
                                if(chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1]
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].hasPiece
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceColor !== pieceColor){
                                    
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].fileNumber}.X`
                                        ];
                                    }

                                      //towards the right
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1]
                                        && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].hasPiece
                                        && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceColor !== pieceColor){

                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].fileNumber}.X`
                                            ];
                                        }

                    
                                        //CASTLING
                                        //can the king castle?
                                        //castling short
                                        if(isLayoutDefault){
                                            //castling short is always towards the right
                                            if(pieceMoves === 0
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 3]
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 3].pieceName === 'Rook'
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 3].pieceColor === pieceColor
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 3].pieceMoves === 0){
                                                   //check if this square is under attack by an opponent piece
                                                    let isUnderPressure = false;
                                                    possibleMoves.forEach(
                                                        (piece, pieceIndex) => {
                                                        piece.moves.forEach(
                                                            (move, moveIndex) => {
                                                                    if((move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].fileNumber}`
                                                                    ||move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2].fileNumber}`) 
                                                                    && piece.pieceColor !== pieceColor){
                                                                        isUnderPressure = true;
                                                                    }
                                                            }
                                                        );
                                                        }
                                                    );

                                                    if(!isUnderPressure){
                                                        moves = [
                                                            ...moves,
                                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2].fileNumber}.C.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 3].pieceId}`
                                                        ];
                                                    }
                                                }
                                        }else{
                                            if(pieceMoves === 0
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 3]
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 3].pieceName === 'Rook'
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 3].pieceColor === pieceColor
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 3].pieceMoves === 0){
                                                    //check if this square is under attack by an opponent piece
                                                    let isUnderPressure = false;
                                                    possibleMoves.forEach(
                                                        (piece, pieceIndex) => {
                                                        piece.moves.forEach(
                                                            (move, moveIndex) => {
                                                                    if((move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].fileNumber}`
                                                                    ||move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2].fileNumber}`) 
                                                                    && piece.pieceColor !== pieceColor){
                                                                        isUnderPressure = true;
                                                                    }
                                                            }
                                                        );
                                                        }
                                                    );
                                                    if(!isUnderPressure){
                                                        moves = [
                                                            ...moves,
                                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2].fileNumber}.C.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 3].pieceId}`
                                                        ];
                                                    }
                                                }
                                        }

                                        //castling long
                                        if(!isLayoutDefault){
                                            //castling long is always towards the right
                                            if(pieceMoves === 0
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 3]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 3].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 4]
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 4].pieceName === 'Rook'
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 4].pieceColor === pieceColor
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 4].pieceMoves === 0){
                                                    let isUnderPressure = false;
                                                    possibleMoves.forEach(
                                                        (piece, pieceIndex) => {
                                                        piece.moves.forEach(
                                                            (move, moveIndex) => {
                                                                    if((move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].fileNumber}`
                                                                    ||move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2].fileNumber}`
                                                                    ||move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 3].fileNumber}`) 
                                                                    && piece.pieceColor !== pieceColor){
                                                                        isUnderPressure = true;
                                                                    }
                                                            }
                                                        );
                                                        }
                                                    );
                                                    if(!isUnderPressure){
                                                        moves = [
                                                            ...moves,
                                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2].fileNumber}.C.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 4].pieceId}`
                                                        ];
                                                    }
                                                }
                                        }else{
                                            if(pieceMoves === 0
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 3]
                                                && !chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 3].hasPiece
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 4]
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 4].pieceName === 'Rook'
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 4].pieceColor === pieceColor
                                                && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 4].pieceMoves === 0){
                                                    //check if this square is under attack by an opponent piece
                                                    let isUnderPressure = false;
                                                    possibleMoves.forEach(
                                                        (piece, pieceIndex) => {
                                                        piece.moves.forEach(
                                                            (move, moveIndex) => {
                                                                    if((move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].fileNumber}`
                                                                    ||move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2].fileNumber}`
                                                                    ||move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 3].fileNumber}`) 
                                                                    && piece.pieceColor !== pieceColor){
                                                                        isUnderPressure = true;
                                                                    }
                                                            }
                                                        );
                                                        }
                                                    );
                                                    if(!isUnderPressure){
                                                        moves = [
                                                            ...moves,
                                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2].fileNumber}.C.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 4].pieceId}`
                                                        ];
                                                    }
                                                }
                                        }

                                        kingPossibleMoves = [
                                            ...kingPossibleMoves, 
                                            {
                                                pieceId,
                                                pieceColor,
                                                pieceMoves,
                                                pieceFile,
                                                pieceRank,
                                                moves,
                                            }
                                        ];
                
                                        moves = [];

                        //piece is king is here
                    }
                }
            );
        }
    );

    kingInfo[0] = isKingInCheck;
    kingInfo[1] = kingPossibleMoves;

    return kingInfo;
}
