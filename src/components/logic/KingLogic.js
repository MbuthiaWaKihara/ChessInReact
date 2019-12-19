import {determineChessboardSituation} from './BoardLogic';
import {generatePossibleMoves} from './PiecesLogic';

//this function generates possible moves for the king
//it also tracks the safety of the king based on possible moves of other pieces
//it returns the possible moves of the kings and a boolean that tracks situations when either of the kings is in danger

export const kingTracker = (possibleMoves, chessboardSituation, isLayoutDefault) => {
    let kingInfo = [];
    let kingPossibleMoves = [];
    let isKingInCheck = {status:false, id:null, attackers: []};

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


                        let attackers = [];//save the ids of the attackers of the king
                        //is the king in check?
                        possibleMoves.forEach(
                            (piece, pieceIndex) => {
                                piece.moves.forEach(
                                    (move, moveId) => {
                                       if(piece.pieceName !== 'Pawn'){
                                            if(move.substring(0,3) === `${rankInfo.rankNumber}.${fileInfo.fileNumber}`
                                            && piece.pieceColor !== fileInfo.pieceColor){
                                                isKingInCheck = {status:true, id:fileInfo.pieceId, attackers: [...attackers, piece.pieceId]};
                                            }
                                       }else{
                                            if(move.substring(0,3) === `${rankInfo.rankNumber}.${fileInfo.fileNumber}`
                                            && piece.pieceColor !== fileInfo.pieceColor && move.search("X") !== -1){
                                                isKingInCheck = {status:true, id:fileInfo.pieceId, attackers: [...attackers, piece.pieceId]};
                                            }
                                       }
                                    }
                                );
                            }
                        );

                        //a king can move a single square in any direction provided that square exists, 
                        //has no piece and is not a possible move for an opponent piece

                        //for cases where the opponent piece is a pawn, a king can be able to move in front of the pawn
                        //even though the square is among the pawn's possible moves


                        //up the board
                        if(chessboardSituation[rankIndex - 1]
                            && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].hasPiece){
                                //check if this square is under attack by an opponent piece
                                let isUnderPressure = false;
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                       piece.moves.forEach(
                                           (move, moveIndex) => {
                                                if(move.substring(0,3) === `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].fileNumber}` 
                                                && piece.pieceColor !== pieceColor
                                                && piece.pieceName !== 'Pawn'){
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
                                                    if(move.substring(0,3) === `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].fileNumber}` 
                                                    && piece.pieceColor !== pieceColor
                                                    && piece.pieceName !== 'Pawn'){
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
                                                        if(move.substring(0,3) === `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].fileNumber}` 
                                                        && piece.pieceColor !== pieceColor
                                                        && piece.pieceName !== 'Pawn'){
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
                                                    if(move.substring(0,3) === `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].fileNumber}` 
                                                    && piece.pieceColor !== pieceColor
                                                    && piece.pieceName !== 'Pawn'){
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
                                                        if(move.substring(0,3) === `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].fileNumber}` 
                                                        && piece.pieceColor !== pieceColor
                                                        && piece.pieceName !== 'Pawn'){
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
                                                            if(move.substring(0,3) === `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].fileNumber}` 
                                                            && piece.pieceColor !== pieceColor
                                                            && piece.pieceName !== 'Pawn'){
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
                                                        if(move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].fileNumber}` 
                                                        && piece.pieceColor !== pieceColor
                                                        && piece.pieceName !== 'Pawn'){
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
                                                            if(move.substring(0,3) === `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].fileNumber}` 
                                                            && piece.pieceColor !== pieceColor
                                                            && piece.pieceName !== 'Pawn'){
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
                                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2].fileNumber}.Cs.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 3].pieceId}`
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
                                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2].fileNumber}.Cs.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 3].pieceId}`
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
                                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 2].fileNumber}.Cl.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 4].pieceId}`
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
                                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 2].fileNumber}.Cl.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 4].pieceId}`
                                                        ];
                                                    }
                                                }
                                        }

                                        kingPossibleMoves = [
                                            ...kingPossibleMoves, 
                                            {
                                                pieceName: 'King',
                                                pieceId,
                                                pieceColor,
                                                pieceMoves,
                                                pieceFile,
                                                pieceRank,
                                                positionOnBoard: {
                                                    rankNumber: pieceRank,
                                                    fileNumber: pieceFile
                                                },
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

//this function will refine the king possible moves to ensure that the kings
//cannot get a square adjacent to each other 
export const refineKingMoves = (kingPossibleMoves) => {
    let newKingPossibleMoves = [];

    let firstKingMoves = [];
    let secondKingMoves = [];

    let initialFirst = kingPossibleMoves[0].moves;
    let initialOther = kingPossibleMoves[1].moves;

    initialFirst.forEach(
        (move, moveIndex) => {
            if(!initialOther.includes(move)){
                firstKingMoves.push(move);
            }
        }
    );

    initialOther.forEach(
        (move, moveIndex) => {
            if(!initialFirst.includes(move)){
                secondKingMoves.push(move);
            }
        }
    );
    

    newKingPossibleMoves.push({...kingPossibleMoves[0], moves:firstKingMoves});
    newKingPossibleMoves.push({...kingPossibleMoves[1], moves:secondKingMoves});

    return newKingPossibleMoves;
}

//this function puts the king moves generated by both king tracker and refine king moves
//to a final test. It ensures these moves are legitimate king moves for the current situation
export const canMyKingBeHere = (move, currentPieceInfo, chessboardLayout, isLayoutDefault, history, kingColor) => {

    let kingCanBeHere = true;
    //get the rank and file in question from the king moves
    let targetRank = parseInt(move.substring(0,1));
    let targetFile = parseInt(move.substring(2,3));

    //from the piece information, let the piece at the target rank and file, if any
    //be captured

    //again from the piece information, change the position of the king in question to
    //the target rank and target file
    let copyPieceInfo = JSON.parse(JSON.stringify(currentPieceInfo));

    currentPieceInfo.forEach(
        (piece, pieceIndex) => {
            if(piece.positionOnBoard.rankNumber === targetRank && piece.positionOnBoard.fileNumber === targetFile){
                if(!piece.hasBeenCaptured){
                    copyPieceInfo[pieceIndex].hasBeenCaptured = true;
                }
            }

            if(piece.pieceName === 'King' && piece.pieceColor === kingColor){
                copyPieceInfo[pieceIndex].positionOnBoard.rankNumber = targetRank;
                copyPieceInfo[pieceIndex].positionOnBoard.fileNumber = targetFile;
            }
        }
    );

    //create a chessboard array that will be used to generate a situation
    let chessboardInfo = [];
    let associatedFilesHolder = [];

    //first form a chessboard array (an array of 8 members with each member having an array property with 8 members 8X8)
    for(let currentRank = 0; currentRank < 8; currentRank++){

        //prepare an array that holds info about the files associated with current rank
        for(let fileCounter = 0; fileCounter < 8; fileCounter++){
       
            associatedFilesHolder = [
                ...associatedFilesHolder,
                {
                    fileNumber: chessboardLayout.fileNumbers[fileCounter],
                    fileName: chessboardLayout.filesPlacement[fileCounter],
                }
            ];
        }

        chessboardInfo = [
            ...chessboardInfo,
            {
                rankNumber: chessboardLayout.ranksPlacement[currentRank],
                associatedFiles: [
                    ...associatedFilesHolder
                ]
            }
        ];

        associatedFilesHolder = [];
    }

    //create a situation based on these info
    const chessboardSituation = determineChessboardSituation(chessboardInfo, copyPieceInfo);
    //generate possible moves based on this situation
    let possibleMoves = generatePossibleMoves(chessboardSituation, isLayoutDefault, history);

    //if the king's position is a possible move for any of the pieces(but the forward going pawn),
    //then the king cannot be there
    possibleMoves.forEach(
        (piece, pieceIndex) => {
            if(piece.pieceName !== 'Pawn'){
                piece.moves.forEach(
                    (move, moveIndex) => {
                        if(move.substring(0,3) === `${targetRank}.${targetFile}`){
                            kingCanBeHere = false;
                        }
                    }
                );
            }else{
                piece.moves.forEach(
                    (move, moveIndex) => {
                        if(move.substring(0,3) === `${targetRank}.${targetFile}` && move.search("X") !== -1){
                            kingCanBeHere = false;
                        }
                    }
                );
            }
        }
    );

     //if the king is next to the other king, then this situation shuould never happen on the board
     chessboardSituation.forEach(
        (rankInfo, rankIndex) => {
            rankInfo.associatedFilesSituation.forEach(
                (fileInfo, fileIndex) => {
                    if(fileInfo.hasPiece && fileInfo.pieceName === 'King' && fileInfo.pieceColor !== kingColor){
                        //up the board
                        if(chessboardSituation[rankIndex - 1]
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex]
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].hasPiece
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].pieceName === 'King'){
                                kingCanBeHere = false;
                            }

                         //down the board
                         if(chessboardSituation[rankIndex + 1]
                            && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex]
                            && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].hasPiece
                            && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].pieceName === 'King'){
                                kingCanBeHere = false;
                            }

                        //left of the board
                        if(chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1]
                            && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].hasPiece
                            && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceName === 'King'){
                                kingCanBeHere = false;
                            }

                        //right of the board
                        if(chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1]
                            && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].hasPiece
                            && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceName === 'King'){
                                kingCanBeHere = false;
                            }
                        
                        //first diagonal up
                        if(chessboardSituation[rankIndex - 1]
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1 ]
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].hasPiece
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].pieceName === 'King'){
                                kingCanBeHere = false;
                            }

                        //other diagonal up
                        if(chessboardSituation[rankIndex - 1]
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1 ]
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].hasPiece
                            && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].pieceName === 'King'){
                                kingCanBeHere = false;
                            }

                         //first diagonal down
                         if(chessboardSituation[rankIndex + 1]
                            && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1 ]
                            && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].hasPiece
                            && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].pieceName === 'King'){
                                kingCanBeHere = false;
                            }

                        //other diagonal down
                        if(chessboardSituation[rankIndex + 1]
                            && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1 ]
                            && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].hasPiece
                            && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].pieceName === 'King'){
                                kingCanBeHere = false;
                            }
                        

                    }
                }
            );
        }
    );

    return kingCanBeHere;

}