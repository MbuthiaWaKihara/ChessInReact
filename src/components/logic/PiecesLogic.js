
//this method will generate an array of possible moves for every piece currently on the board
//the method relies on the current board situation
export const generatePossibleMoves = (chessboardSituation, isLayoutDefault, history) => {
    let possibleMoves = [];

    chessboardSituation.forEach(
        (rankInfo, rankIndex) => {
            rankInfo.associatedFilesSituation.forEach(
                (fileInfo, fileIndex) => {
                    
                    if(fileInfo.hasPiece){//the piece in this square is candidate for having possible moves
                        let pieceId = fileInfo.pieceId;
                        let pieceName = fileInfo.pieceName;
                        let pieceColor = fileInfo.pieceColor;
                        let pieceMoves = fileInfo.pieceMoves;
                        let pieceRank = fileInfo.positionOnBoard.rankNumber;
                        let pieceFile = fileInfo.positionOnBoard.fileNumber;
                        let moves = [];

                        if(pieceName === 'Pawn' && pieceColor === 'white'){//START PAWN POSSIBLE MOVES GENERATION
                            if(isLayoutDefault){
                                //the pawn can move two squares infront on condition that it has not been moved before and that square has no piece and the square before it has no piece
                                if(pieceMoves === 0 
                                    && !chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex].hasPiece 
                                    && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex -2].rankNumber}.${chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex].fileNumber}`
                                    ];
                                }
                                //the pawn can move a square infront on condition that the square exists and it doesn't have a piece
                                if(chessboardSituation[rankIndex - 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex] 
                                    && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex-1].associatedFilesSituation[fileIndex].fileNumber}`
                                    ];
                                }

                                //the pawn can move a square in the front rank and any of the front side files on condition that those squares exist and they have a black piece
                                if((chessboardSituation[rankIndex - 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].hasPiece) 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].pieceColor === 'black'){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].fileNumber}.X`
                                    ];
                                }
                                if((chessboardSituation[rankIndex - 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].hasPiece) 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].pieceColor === 'black'){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].fileNumber}.X`
                                    ];
                                }

                                //the pawn can capture a black pawn en passant on condition that the white pawn is in rank index 3 and the to be captured pawn
                                //is in an adjacent file and it just moved there
                                //left
                                if(rankIndex === 3
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1]
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].hasPiece
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceName === 'Pawn'
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceMoves === 1){
                                        //check if the pawn adjacent to the potential en passant capturer is the last thing moved there
                                        if(history[history.length - 1][history[history.length - 1].length -1].id ===  chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceId){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].fileNumber}.E.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceId}`
                                            ];
                                        }
                                    }
                                //right
                                if(rankIndex === 3
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1]
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].hasPiece
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceName === 'Pawn'
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceMoves === 1){
                                        //check if the pawn adjacent to the potential en passant capturer is the last thing moved there
                                        if(history[history.length - 1][history[history.length - 1].length -1].id ===  chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceId){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].fileNumber}.E.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceId}`
                                            ];
                                        }
                                    }

                            }else{
                                //the pawn can move two squares infront on condition that it has not been moved before and that square has no piece
                                if(pieceMoves === 0 
                                    && !chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex].hasPiece 
                                    && !chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex +2].rankNumber}.${chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex].fileNumber}`
                                    ];
                                }
                                 //the pawn can move a square infront on condition that the square exists and it doesn't have a piece
                                 if(chessboardSituation[rankIndex + 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex] 
                                    && !chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex+1].associatedFilesSituation[fileIndex].fileNumber}`
                                    ];
                                }
                                //the pawn can move a square in the front rank and any of the front side files on condition that those squares exist and they have a black piece
                                if((chessboardSituation[rankIndex + 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].hasPiece) 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].pieceColor === 'black'){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].fileNumber}.X`
                                    ];
                                }
                                if((chessboardSituation[rankIndex + 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].hasPiece) 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].pieceColor === 'black'){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].fileNumber}.X`
                                    ];
                                }

                                //the pawn can capture a black pawn en passant on condition that the white pawn is in rank index 4 and the to be captured pawn
                                //is in an adjacent file and it just moved there
                                //left
                                if(rankIndex === 4
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1]
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].hasPiece
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceName === 'Pawn'
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceMoves === 1){
                                        //check if the pawn adjacent to the potential en passant capturer is the last thing moved there
                                        if(history[history.length - 1][history[history.length - 1].length -1].id ===  chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceId){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].fileNumber}.E.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceId}`
                                            ];
                                        }
                                    }
                                //right
                                if(rankIndex === 4
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1]
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].hasPiece
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceName === 'Pawn'
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceMoves === 1){
                                        //check if the pawn adjacent to the potential en passant capturer is the last thing moved there
                                        if(history[history.length - 1][history[history.length - 1].length -1].id ===  chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceId){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].fileNumber}.E.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceId}`
                                            ];
                                        }
                                    }
                            }

                            possibleMoves = [
                                ...possibleMoves, 
                                {
                                    pieceId,
                                    pieceName,
                                    pieceColor,
                                    pieceMoves,
                                    pieceFile,
                                    pieceRank,
                                    moves,
                                }
                            ];
    
                            moves = [];
                        }else if(pieceName === 'Pawn' && pieceColor === 'black'){
                            if(!isLayoutDefault){
                                //the pawn can move two squares infront on condition that it has not been moved before and that square has no piece
                                if(pieceMoves === 0 
                                    && !chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex].hasPiece 
                                    && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex -2].rankNumber}.${chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex].fileNumber}`
                                    ];
                                }
                                //the pawn can move a square infront on condition that the square exists and it doesn't have a piece
                                if(chessboardSituation[rankIndex - 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex] 
                                    && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex-1].associatedFilesSituation[fileIndex].fileNumber}`
                                    ];
                                }
                                //the pawn can move a square in the front rank and any of the front side files on condition that those squares exist and they have a black piece
                                if((chessboardSituation[rankIndex - 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].hasPiece) 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].pieceColor === 'white'){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].fileNumber}.X`
                                    ];
                                }
                                if((chessboardSituation[rankIndex - 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1] 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].hasPiece) 
                                    && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].pieceColor === 'white'){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].fileNumber}.X`
                                    ];
                                }

                                //the pawn can capture a white pawn en passant on condition that the black pawn is in rank index 3 and the to be captured pawn
                                //is in an adjacent file and it just moved there
                                //left
                                if(rankIndex === 3
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1]
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].hasPiece
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceName === 'Pawn'
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceMoves === 1){
                                        //check if the pawn adjacent to the potential en passant capturer is the last thing moved there
                                        if(history[history.length - 1][history[history.length - 1].length -1].id ===  chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceId){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 1].fileNumber}.E.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceId}`
                                            ];
                                        }
                                    }
                                //right
                                if(rankIndex === 3
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1]
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].hasPiece
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceName === 'Pawn'
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceMoves === 1){
                                        //check if the pawn adjacent to the potential en passant capturer is the last thing moved there
                                        if(history[history.length - 1][history[history.length - 1].length -1].id ===  chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceId){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 1].fileNumber}.E.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceId}`
                                            ];
                                        }
                                    }
                            }else{
                                //the pawn can move two squares infront on condition that it has not been moved before and that square has no piece
                                if(pieceMoves === 0 
                                    && !chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex].hasPiece 
                                    && !chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex +2].rankNumber}.${chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex].fileNumber}`
                                    ];
                                }
                                 //the pawn can move a square infront on condition that the square exists and it doesn't have a piece
                                 if(chessboardSituation[rankIndex + 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex] 
                                    && !chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex+1].associatedFilesSituation[fileIndex].fileNumber}`
                                    ];
                                }
                                //the pawn can move a square any of the front side files on condition that those squares exist and they have a black piece
                                if((chessboardSituation[rankIndex + 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].hasPiece) 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].pieceColor === 'white'){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].fileNumber}.X`
                                    ];
                                }
                                if((chessboardSituation[rankIndex + 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1] 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].hasPiece) 
                                    && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].pieceColor === 'white'){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].fileNumber}.X`
                                    ];
                                }

                                //the pawn can capture a white pawn en passant on condition that the black pawn is in rank index 4 and the to be captured pawn
                                //is in an adjacent file and it just moved there
                                //left
                                if(rankIndex === 4
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1]
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].hasPiece
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceName === 'Pawn'
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceMoves === 1){
                                        //check if the pawn adjacent to the potential en passant capturer is the last thing moved there
                                        if(history[history.length - 1][history[history.length - 1].length -1].id ===  chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceId){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 1].fileNumber}.E.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex - 1].pieceId}`
                                            ];
                                        }
                                    }
                                //right
                                if(rankIndex === 4
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1]
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].hasPiece
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceName === 'Pawn'
                                    && chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceMoves === 1){
                                        //check if the pawn adjacent to the potential en passant capturer is the last thing moved there
                                        if(history[history.length - 1][history[history.length - 1].length -1].id ===  chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceId){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 1].fileNumber}.E.${chessboardSituation[rankIndex].associatedFilesSituation[fileIndex + 1].pieceId}`
                                            ];
                                        }
                                    }
                            }

                            possibleMoves = [
                                ...possibleMoves, 
                                {
                                    pieceId,
                                    pieceName,
                                    pieceColor,
                                    pieceMoves,
                                    pieceFile,
                                    pieceRank,
                                    moves,
                                }
                            ];
    
                            moves = [];
                        }//END PAWN POSSIBLE MOVES GENERATION

                        if(pieceName === 'Rook'){//START ROOK POSSIBLE MOVES GENERATION
                            //upside
                            if(rankIndex !== 0){
                                //how far is the rook from the top of the board?
                                let currentRank = rankIndex;
                                while(currentRank !== 0){
                                    currentRank--;
                                    //if at any time the rook finds a piece of the same color as itself as it moves upwards, it cannot move any more
                                    if(chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece 
                                        && chessboardSituation[currentRank].associatedFilesSituation[fileIndex].pieceColor === pieceColor){
                                        break;
                                    }
                                    //the rook can move to the next square upwards on condition that that square has no piece
                                    if(!chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[fileIndex].fileNumber}`
                                        ];
                                    }

                                    //the rook can move to the next square upwards if the square is occupied by a piece of different color
                                    //but the rook cannot move upwards any further after that
                                    if(chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece 
                                        && chessboardSituation[currentRank].associatedFilesSituation[fileIndex].pieceColor !== pieceColor){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[fileIndex].fileNumber}.X`
                                        ];
                                        break;
                                    }
                                }
                            }

                            //downside
                            if(rankIndex !== 7){
                                //how far is the rook from the bottom of the board?
                                let currentRank = rankIndex;
                                while(currentRank !== 7){
                                    currentRank++;
                                    //if at any time the rook finds a piece of the same color as itself as it moves downwards, it cannot move any more
                                    if(chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece 
                                        && chessboardSituation[currentRank].associatedFilesSituation[fileIndex].pieceColor === pieceColor){
                                        break;
                                    }
                                    //the rook can move to the next square downwards on condition that that square has no piece
                                    if(!chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[fileIndex].fileNumber}`
                                        ];
                                    }

                                    //the rook can move to the next square downwords if the square is occupied by a piece of different color
                                    //but the rook cannot move downwords any further after that
                                    if(chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece 
                                        && chessboardSituation[currentRank].associatedFilesSituation[fileIndex].pieceColor !== pieceColor){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[fileIndex].fileNumber}.X`
                                        ];
                                        break;
                                    }
                                }
                            }

                            //leftside
                            if(fileIndex !== 0){
                                //how far is the rook from the left edge of the board?
                                let currentFile = fileIndex;
                                while(currentFile !== 0){
                                    currentFile--;
                                    //if at any time the rook finds a piece of the same color as itself as it moves towards the left, it cannot move any more
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece 
                                        && chessboardSituation[rankIndex].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                        break;
                                    }
                                    //the rook can move to the next square towards the left on condition that that square has no piece
                                    if(!chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[currentFile].fileNumber}`
                                        ];
                                    }

                                    //the rook can move to the next square towards the side if the square is occupied by a piece of different color
                                    //but the rook cannot move towards the side any further after that
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece 
                                        && chessboardSituation[rankIndex].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[currentFile].fileNumber}.X`
                                        ];
                                        break;
                                    }
                                }
                            }

                            //right side
                            if(fileIndex !== 7){
                                //how far is the rook from the right edge of the board?
                                let currentFile = fileIndex;
                                while(currentFile !== 7){
                                    currentFile++;
                                    //if at any time the rook finds a piece of the same color as itself as it moves towards the left, it cannot move any more
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece 
                                        && chessboardSituation[rankIndex].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                        break;
                                    }
                                    //the rook can move to the next square towards the left on condition that that square has no piece
                                    if(!chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[currentFile].fileNumber}`
                                        ];
                                    }

                                    //the rook can move to the next square towards the side if the square is occupied by a piece of different color
                                    //but the rook cannot move towards the side any further after that
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece 
                                        && chessboardSituation[rankIndex].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[currentFile].fileNumber}.X`
                                        ];
                                        break;
                                    }
                                }
                            }

                            possibleMoves = [
                                ...possibleMoves, 
                                {
                                    pieceId,
                                    pieceName,
                                    pieceColor,
                                    pieceMoves,
                                    pieceFile,
                                    pieceRank,
                                    moves,
                                }
                            ];
    
                            moves = [];

                        }//END ROOK POSSIBLE MOVES GENERATION

                        if(pieceName === 'Bishop'){//START BISHOP POSSIBLE MOVES GENERATION

                            if(rankIndex !== 0){//if the bishop is not at the top of the board, we can generate main diagonal up or other diagonal up

                                if(fileIndex !== 0){//we generate main diagonal up

                                    //how far is the bishop from either rankIndex zero or fileIndex zero?
                                    let currentRank = rankIndex;
                                    let currentFile = fileIndex;

                                    while(currentRank !== 0 && currentFile !== 0){
                                        currentRank--;
                                        currentFile--;

                                        //if at any time the bishop finds a piece with the same color as itself while moving along main diagonal up, it cannot move any more
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                            break;
                                        }

                                        //the bishop can move to the next square along main diagonal up provided that square has no piece
                                        if(!chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}`
                                            ];
                                        }

                                        //the bishop can move to the next square along main diagonal up if the square has an opponent piece
                                        //however, after this, the bishop cannot move anymore
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}.X`
                                            ];
                                            break
                                        }

                                    }
                                }

                                if(fileIndex !== 7){//we generate other diagonal up
                                    
                                    //how far is the bishop from either rankIndex zero or fileIndex seven?
                                    let currentRank = rankIndex;
                                    let currentFile = fileIndex;

                                    while(currentRank !== 0 && currentFile !== 7){
                                        currentRank--;
                                        currentFile++;

                                        //if at any time the bishop finds a piece with the same color as itself while moving along other diagonal up, it cannot move any more
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                            break;
                                        }

                                        //the bishop can move to the next square along other diagonal up provided that square has no piece
                                        if(!chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}`
                                            ];
                                        }

                                        //the bishop can move to the next square along other diagonal up if the square has an opponent piece
                                        //however, after this, the bishop cannot move anymore
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}.X`
                                            ];
                                            break
                                        }

                                    }
                                }
                            }

                            if(rankIndex !== 7){//if the bishop is not at the bottom of the board, we can generate main diagonal down or other diagonal down

                                if(fileIndex !== 0){//we generate other diagonal down

                                    //how far is the bishop from either rankIndex seven or fileIndex zero?
                                    let currentRank = rankIndex;
                                    let currentFile = fileIndex;

                                    while(currentRank !== 7 && currentFile !== 0){
                                        currentRank++;
                                        currentFile--;

                                        //if at any time the bishop finds a piece with the same color as itself while moving along main diagonal up, it cannot move any more
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                            break;
                                        }

                                        //the bishop can move to the next square along main diagonal up provided that square has no piece
                                        if(!chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}`
                                            ];
                                        }

                                        //the bishop can move to the next square along main diagonal up if the square has an opponent piece
                                        //however, after this, the bishop cannot move anymore
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}.X`
                                            ];
                                            break
                                        }

                                    }
                                }

                                if(fileIndex !== 7){//we generate main diagonal down
                                    
                                    //how far is the bishop from either rankIndex seven or fileIndex seven?
                                    let currentRank = rankIndex;
                                    let currentFile = fileIndex;

                                    while(currentRank !== 7 && currentFile !== 7){
                                        currentRank++;
                                        currentFile++;

                                        //if at any time the bishop finds a piece with the same color as itself while moving along other diagonal up, it cannot move any more
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                            break;
                                        }

                                        //the bishop can move to the next square along other diagonal up provided that square has no piece
                                        if(!chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}`
                                            ];
                                        }

                                        //the bishop can move to the next square along other diagonal up if the square has an opponent piece
                                        //however, after this, the bishop cannot move anymore
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}.X`
                                            ];
                                            break
                                        }

                                    }
                                }
                            }

                            possibleMoves = [
                                ...possibleMoves, 
                                {
                                    pieceId,
                                    pieceName,
                                    pieceColor,
                                    pieceMoves,
                                    pieceFile,
                                    pieceRank,
                                    moves,
                                }
                            ];
    
                            moves = [];

                        }//END BISHOP POSSIBLE MOVES GENERATION

                        if(pieceName === 'Queen'){//START QUEEN POSSIBLE MOVES GENERATION
                            
                            //the queen behaves like a combination of the rook and the bishop
                            //CODE PASTED DIRECTLY. comments may not be relevant to the queen. Planning on changing this
                            //THE ROOK::
                            //upside
                            if(rankIndex !== 0){
                                //how far is the rook from the top of the board?
                                let currentRank = rankIndex;
                                while(currentRank !== 0){
                                    currentRank--;
                                    //if at any time the rook finds a piece of the same color as itself as it moves upwards, it cannot move any more
                                    if(chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece 
                                        && chessboardSituation[currentRank].associatedFilesSituation[fileIndex].pieceColor === pieceColor){
                                        break;
                                    }
                                    //the rook can move to the next square upwards on condition that that square has no piece
                                    if(!chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[fileIndex].fileNumber}`
                                        ];
                                    }

                                    //the rook can move to the next square upwards if the square is occupied by a piece of different color
                                    //but the rook cannot move upwards any further after that
                                    if(chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece 
                                        && chessboardSituation[currentRank].associatedFilesSituation[fileIndex].pieceColor !== pieceColor){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[fileIndex].fileNumber}.X`
                                        ];
                                        break;
                                    }
                                }
                            }

                            //downside
                            if(rankIndex !== 7){
                                //how far is the rook from the bottom of the board?
                                let currentRank = rankIndex;
                                while(currentRank !== 7){
                                    currentRank++;
                                    //if at any time the rook finds a piece of the same color as itself as it moves downwards, it cannot move any more
                                    if(chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece 
                                        && chessboardSituation[currentRank].associatedFilesSituation[fileIndex].pieceColor === pieceColor){
                                        break;
                                    }
                                    //the rook can move to the next square downwards on condition that that square has no piece
                                    if(!chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[fileIndex].fileNumber}`
                                        ];
                                    }

                                    //the rook can move to the next square downwords if the square is occupied by a piece of different color
                                    //but the rook cannot move downwords any further after that
                                    if(chessboardSituation[currentRank].associatedFilesSituation[fileIndex].hasPiece 
                                        && chessboardSituation[currentRank].associatedFilesSituation[fileIndex].pieceColor !== pieceColor){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[fileIndex].fileNumber}.X`
                                        ];
                                        break;
                                    }
                                }
                            }

                            //leftside
                            if(fileIndex !== 0){
                                //how far is the rook from the left edge of the board?
                                let currentFile = fileIndex;
                                while(currentFile !== 0){
                                    currentFile--;
                                    //if at any time the rook finds a piece of the same color as itself as it moves towards the left, it cannot move any more
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece 
                                        && chessboardSituation[rankIndex].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                        break;
                                    }
                                    //the rook can move to the next square towards the left on condition that that square has no piece
                                    if(!chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[currentFile].fileNumber}`
                                        ];
                                    }

                                    //the rook can move to the next square towards the side if the square is occupied by a piece of different color
                                    //but the rook cannot move towards the side any further after that
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece 
                                        && chessboardSituation[rankIndex].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[currentFile].fileNumber}.X`
                                        ];
                                        break;
                                    }
                                }
                            }

                            //right side
                            if(fileIndex !== 7){
                                //how far is the rook from the right edge of the board?
                                let currentFile = fileIndex;
                                while(currentFile !== 7){
                                    currentFile++;
                                    //if at any time the rook finds a piece of the same color as itself as it moves towards the left, it cannot move any more
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece 
                                        && chessboardSituation[rankIndex].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                        break;
                                    }
                                    //the rook can move to the next square towards the left on condition that that square has no piece
                                    if(!chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[currentFile].fileNumber}`
                                        ];
                                    }

                                    //the rook can move to the next square towards the side if the square is occupied by a piece of different color
                                    //but the rook cannot move towards the side any further after that
                                    if(chessboardSituation[rankIndex].associatedFilesSituation[currentFile].hasPiece 
                                        && chessboardSituation[rankIndex].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                        moves = [
                                            ...moves,
                                            `${chessboardSituation[rankIndex].rankNumber}.${chessboardSituation[rankIndex].associatedFilesSituation[currentFile].fileNumber}.X`
                                        ];
                                        break;
                                    }
                                }
                            }
                            //END THE ROOK::

                            //THE BISHOP::
                            if(rankIndex !== 0){//if the bishop is not at the top of the board, we can generate main diagonal up or other diagonal up

                                if(fileIndex !== 0){//we generate main diagonal up

                                    //how far is the bishop from either rankIndex zero or fileIndex zero?
                                    let currentRank = rankIndex;
                                    let currentFile = fileIndex;

                                    while(currentRank !== 0 && currentFile !== 0){
                                        currentRank--;
                                        currentFile--;

                                        //if at any time the bishop finds a piece with the same color as itself while moving along main diagonal up, it cannot move any more
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                            break;
                                        }

                                        //the bishop can move to the next square along main diagonal up provided that square has no piece
                                        if(!chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}`
                                            ];
                                        }

                                        //the bishop can move to the next square along main diagonal up if the square has an opponent piece
                                        //however, after this, the bishop cannot move anymore
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}.X`
                                            ];
                                            break
                                        }

                                    }
                                }

                                if(fileIndex !== 7){//we generate other diagonal up
                                    
                                    //how far is the bishop from either rankIndex zero or fileIndex seven?
                                    let currentRank = rankIndex;
                                    let currentFile = fileIndex;

                                    while(currentRank !== 0 && currentFile !== 7){
                                        currentRank--;
                                        currentFile++;

                                        //if at any time the bishop finds a piece with the same color as itself while moving along other diagonal up, it cannot move any more
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                            break;
                                        }

                                        //the bishop can move to the next square along other diagonal up provided that square has no piece
                                        if(!chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}`
                                            ];
                                        }

                                        //the bishop can move to the next square along other diagonal up if the square has an opponent piece
                                        //however, after this, the bishop cannot move anymore
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}.X`
                                            ];
                                            break
                                        }

                                    }
                                }
                            }

                            if(rankIndex !== 7){//if the bishop is not at the bottom of the board, we can generate main diagonal down or other diagonal down

                                if(fileIndex !== 0){//we generate other diagonal down

                                    //how far is the bishop from either rankIndex seven or fileIndex zero?
                                    let currentRank = rankIndex;
                                    let currentFile = fileIndex;

                                    while(currentRank !== 7 && currentFile !== 0){
                                        currentRank++;
                                        currentFile--;

                                        //if at any time the bishop finds a piece with the same color as itself while moving along main diagonal up, it cannot move any more
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                            break;
                                        }

                                        //the bishop can move to the next square along main diagonal up provided that square has no piece
                                        if(!chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}`
                                            ];
                                        }

                                        //the bishop can move to the next square along main diagonal up if the square has an opponent piece
                                        //however, after this, the bishop cannot move anymore
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}.X`
                                            ];
                                            break
                                        }

                                    }
                                }

                                if(fileIndex !== 7){//we generate main diagonal down
                                    
                                    //how far is the bishop from either rankIndex seven or fileIndex seven?
                                    let currentRank = rankIndex;
                                    let currentFile = fileIndex;

                                    while(currentRank !== 7 && currentFile !== 7){
                                        currentRank++;
                                        currentFile++;

                                        //if at any time the bishop finds a piece with the same color as itself while moving along other diagonal up, it cannot move any more
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor === pieceColor){
                                            break;
                                        }

                                        //the bishop can move to the next square along other diagonal up provided that square has no piece
                                        if(!chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}`
                                            ];
                                        }

                                        //the bishop can move to the next square along other diagonal up if the square has an opponent piece
                                        //however, after this, the bishop cannot move anymore
                                        if(chessboardSituation[currentRank].associatedFilesSituation[currentFile].hasPiece 
                                            && chessboardSituation[currentRank].associatedFilesSituation[currentFile].pieceColor !== pieceColor){
                                            moves = [
                                                ...moves,
                                                `${chessboardSituation[currentRank].rankNumber}.${chessboardSituation[currentRank].associatedFilesSituation[currentFile].fileNumber}.X`
                                            ];
                                            break
                                        }

                                    }
                                }
                            }
                            //END THE BISHOP::

                            possibleMoves = [
                                ...possibleMoves, 
                                {
                                    pieceId,
                                    pieceName,
                                    pieceColor,
                                    pieceMoves,
                                    pieceFile,
                                    pieceRank,
                                    moves,
                                }
                            ];
    
                            moves = [];
                            
                        }//END QUEEN POSSIBLE MOVES GENERATION

                        if(pieceName === 'Knight'){//START KNIGHT POSSIBLE MOVES GENERATION
                            //the knight moves in a combination of either two ranks and a file beside(up or down)
                            //or two files and a rank beneath or above(left or right)

                            //up
                            //up left
                            if(chessboardSituation[rankIndex - 2]
                                && chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex - 1]
                                && !chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex - 1].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 2].rankNumber}.${chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex - 1].fileNumber}`
                                    ];
                            }
                            if(chessboardSituation[rankIndex - 2]
                                && chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex - 1]
                                && chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex - 1].hasPiece
                                && chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex - 1].pieceColor !== pieceColor){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 2].rankNumber}.${chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex - 1].fileNumber}.X`
                                    ];
                            }
                            //up right
                            if(chessboardSituation[rankIndex - 2]
                                && chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex + 1]
                                && !chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex + 1].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 2].rankNumber}.${chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex + 1].fileNumber}`
                                    ];
                            }
                            if(chessboardSituation[rankIndex - 2]
                                && chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex + 1]
                                && chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex + 1].hasPiece
                                && chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex + 1].pieceColor !== pieceColor){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 2].rankNumber}.${chessboardSituation[rankIndex - 2].associatedFilesSituation[fileIndex + 1].fileNumber}.X`
                                    ];
                            }

                            //down
                            //down left
                            if(chessboardSituation[rankIndex + 2]
                                && chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex - 1]
                                && !chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex - 1].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 2].rankNumber}.${chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex - 1].fileNumber}`
                                    ];
                            }
                            if(chessboardSituation[rankIndex + 2]
                                && chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex - 1]
                                && chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex - 1].hasPiece
                                && chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex - 1].pieceColor !== pieceColor){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 2].rankNumber}.${chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex - 1].fileNumber}.X`
                                    ];
                            }
                            //down right
                            if(chessboardSituation[rankIndex + 2]
                                && chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex + 1]
                                && !chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex + 1].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 2].rankNumber}.${chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex + 1].fileNumber}`
                                    ];
                            }
                            if(chessboardSituation[rankIndex + 2]
                                && chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex + 1]
                                && chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex + 1].hasPiece
                                && chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex + 1].pieceColor !== pieceColor){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 2].rankNumber}.${chessboardSituation[rankIndex + 2].associatedFilesSituation[fileIndex + 1].fileNumber}.X`
                                    ];
                            }

                            //left
                            //left up
                            if(chessboardSituation[rankIndex - 1]
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 2]
                                && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 2].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 2].fileNumber}`
                                    ];
                            }
                            if(chessboardSituation[rankIndex - 1]
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 2]
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 2].hasPiece
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 2].pieceColor !== pieceColor){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex - 2].fileNumber}.X`
                                    ];
                            }

                            //left down
                            if(chessboardSituation[rankIndex + 1]
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 2]
                                && !chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 2].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 2].fileNumber}`
                                    ];
                            }
                            if(chessboardSituation[rankIndex + 1]
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 2]
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 2].hasPiece
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 2].pieceColor !== pieceColor){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex - 2].fileNumber}.X`
                                    ];
                            }

                            //right
                            //right up
                            if(chessboardSituation[rankIndex - 1]
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 2]
                                && !chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 2].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 2].fileNumber}`
                                    ];
                            }
                            if(chessboardSituation[rankIndex - 1]
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 2]
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 2].hasPiece
                                && chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 2].pieceColor !== pieceColor){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex - 1].rankNumber}.${chessboardSituation[rankIndex - 1].associatedFilesSituation[fileIndex + 2].fileNumber}.X`
                                    ];
                            }

                            //right down
                            if(chessboardSituation[rankIndex + 1]
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 2]
                                && !chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 2].hasPiece){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 2].fileNumber}`
                                    ];
                            }
                            if(chessboardSituation[rankIndex + 1]
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 2]
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 2].hasPiece
                                && chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 2].pieceColor !== pieceColor){
                                    moves = [
                                        ...moves,
                                        `${chessboardSituation[rankIndex + 1].rankNumber}.${chessboardSituation[rankIndex + 1].associatedFilesSituation[fileIndex + 2].fileNumber}.X`
                                    ];
                            }

                            possibleMoves = [
                                ...possibleMoves, 
                                {
                                    pieceId,
                                    pieceName,
                                    pieceColor,
                                    pieceMoves,
                                    pieceFile,
                                    pieceRank,
                                    moves,
                                }
                            ];
    
                            moves = [];
                        }//END KNIGHT POSSIBLE MOVES GENERATION

                        //hasPiece is here
                    }
                }
            );
        }
    );

    return possibleMoves;
}