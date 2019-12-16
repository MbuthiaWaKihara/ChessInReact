import {generatePossibleMoves} from './PiecesLogic';

//this function is going to decide the possible squares for a piece trying to defend its king
export const canMyPieceHelp = (attackerInfo, kingInfo, possibleMoves, numberOfAttackers) => {
    let possibleSquares = [];
    if(numberOfAttackers === 1){
         //we are going to inspect every possible move of the piece in question and examine
        //the move's potential to solve the check
        possibleMoves.forEach(
            (move, moveIndex) => {
                let potentialRank = parseInt(move.substring(0,1));
                let potentialFile = parseInt(move.substring(2,3));

                //the piece can solve the check if it can capture the attacker
                if(attackerInfo.rankNumber === potentialRank && attackerInfo.fileNumber === potentialFile){
                    possibleSquares = [
                        ...possibleSquares,
                        move,
                    ];
                }

                //the piece can solve the check if it can block the path between the attacker and the king
                let kingRank = kingInfo.rankNumber;
                let kingFile = kingInfo.fileNumber;

                //I assumed a default chessboard layout to comment, but the logic should work with any of the layouts


                //VERTICAL BLOCKAGE
                //king is up the board and attacker down
                if(kingFile === attackerInfo.fileNumber 
                    && kingRank - attackerInfo.rankNumber > 1
                    && kingFile === potentialFile){
                    //if potential rank is in between, then the piece can intercept
                    let canIntercept = false;
                    if(kingRank > potentialRank && potentialRank >  attackerInfo.rankNumber){
                        canIntercept = true;
                    }
                    if(canIntercept){
                        possibleSquares = [
                            ...possibleSquares,
                            move,
                        ];
                    }
                }
                //king is down the board and attacker up
                if(kingFile === attackerInfo.fileNumber 
                    && attackerInfo.rankNumber - kingRank > 1
                    && kingFile === potentialFile){
                    //if potential rank is in between, then the piece can intercept
                    let canIntercept = false;
                    if( attackerInfo.rankNumber > potentialRank && potentialRank > kingRank){
                        canIntercept = true;
                    }
                    if(canIntercept){
                        possibleSquares = [
                            ...possibleSquares,
                            move,
                        ];
                    }
                }

                //HORIZONTAL BLOCKAGE
                //the king is on the left of the attacker
                if(kingRank === attackerInfo.rankNumber
                    && kingRank === potentialRank
                    && attackerInfo.fileNumber - kingFile > 1){
                        let canIntercept = false;
                        if(potentialFile > kingFile && attackerInfo.fileNumber > potentialFile){
                            canIntercept = true;
                        }
                        if(canIntercept){
                            possibleSquares = [
                                ...possibleSquares,
                                move,
                            ];
                        }
                    }
                //the king is on the right of the attacker
                if(kingRank === attackerInfo.rankNumber
                    && kingRank === potentialRank
                    && kingFile - attackerInfo.fileNumber > 1){
                        let canIntercept = false;
                        if(kingFile > potentialFile && potentialFile > attackerInfo.fileNumber){
                            canIntercept = true;
                        }
                        if(canIntercept){
                            possibleSquares = [
                                ...possibleSquares,
                                move,
                            ];
                        }
                    }


                //DIAGONAL BLOCKAGE
                if(kingRank !== attackerInfo.rankNumber
                    && kingFile !== attackerInfo.fileNumber
                    && kingRank !== potentialRank
                    && kingFile !== potentialFile
                    && potentialRank !== attackerInfo.rankNumber
                    && potentialFile !== attackerInfo.fileNumber){

                        //the king is on the upper side of the attacker
                        // the king is on the upper side left of the attacker
                        if(kingRank - attackerInfo.rankNumber > 1
                            && attackerInfo.fileNumber - kingFile > 1){
                                if(kingRank > potentialRank 
                                    && potentialRank > attackerInfo.rankNumber
                                    && potentialFile > kingFile
                                    && attackerInfo.fileNumber >  potentialFile){
                                        let canIntercept = false;
                                        let rankCounter = kingRank;
                                        let fileCounter = kingFile;
                                        while(rankCounter !== attackerInfo.rankNumber && fileCounter !== attackerInfo.fileNumber){
                                            if(rankCounter - potentialRank === 1 && potentialFile - fileCounter === 1){
                                                canIntercept = true;
                                                break;
                                            }
                                            rankCounter--;
                                            fileCounter++;
                                        }

                                        if(canIntercept){
                                            possibleSquares = [
                                                ...possibleSquares,
                                                move,
                                            ];
                                        }
                                }
                            }
                        // the king is on the upper side right of the attacker
                        if(kingRank - attackerInfo.rankNumber > 1
                            && kingFile - attackerInfo.fileNumber > 1){
                                if(kingRank > potentialRank 
                                    && potentialRank > attackerInfo.rankNumber
                                    && kingFile > potentialFile
                                    && potentialFile >  attackerInfo.fileNumber){
                                        let canIntercept = false;
                                        let rankCounter = kingRank;
                                        let fileCounter = kingFile;
                                        while(rankCounter !== attackerInfo.rankNumber && fileCounter !== attackerInfo.fileNumber){
                                            if(rankCounter - potentialRank === 1 && fileCounter - potentialFile === 1){
                                                canIntercept = true;
                                                break;
                                            }
                                            rankCounter--;
                                            fileCounter--;
                                        }

                                        if(canIntercept){
                                            possibleSquares = [
                                                ...possibleSquares,
                                                move,
                                            ];
                                        }
                                }
                            }


                        //the king is on the lower side of the attacker
                        // the king is on the lower side left of the attacker
                        if(attackerInfo.rankNumber - kingRank > 1
                            && attackerInfo.fileNumber - kingFile > 1){
                                if(potentialRank > kingRank
                                    && attackerInfo.rankNumber > potentialRank
                                    && potentialFile > kingFile
                                    && attackerInfo.fileNumber >  potentialFile){
                                        let canIntercept = false;
                                        let rankCounter = attackerInfo.rankNumber;
                                        let fileCounter = attackerInfo.fileNumber;
                                        while(rankCounter !== kingRank && fileCounter !== kingFile){
                                            if(rankCounter - potentialRank === 1 && fileCounter - potentialFile === 1){
                                                canIntercept = true;
                                                break;
                                            }
                                            rankCounter--;
                                            fileCounter--;
                                        }

                                        if(canIntercept){
                                            possibleSquares = [
                                                ...possibleSquares,
                                                move,
                                            ];
                                        }
                                }
                            }
                        // the king is on the lower side right of the attacker
                        if(attackerInfo.rankNumber - kingRank > 1
                            && kingFile - attackerInfo.fileNumber > 1){
                                if(potentialRank > kingRank
                                    && attackerInfo.rankNumber > potentialRank
                                    && kingFile > potentialFile
                                    && potentialFile >  attackerInfo.fileNumber){
                                        let canIntercept = false;
                                        let rankCounter = attackerInfo.rankNumber;
                                        let fileCounter = attackerInfo.fileNumber;
                                        while(rankCounter !== kingRank && fileCounter !== kingFile){
                                            if(rankCounter - potentialRank === 1 && potentialFile - fileCounter === 1){
                                                canIntercept = true;
                                                break;
                                            }
                                            rankCounter--;
                                            fileCounter++;
                                        }

                                        if(canIntercept){
                                            possibleSquares = [
                                                ...possibleSquares,
                                                move,
                                            ];
                                        }
                                }
                            }


                    }


            }
        );
    }

    return possibleSquares;
}

//this function is used to determine if an opponent piece 
//can be captured by the king whenever the opponent piece is capturable by the rules of chess
//the opponent piece cannot be captured by the king if it is supported by one of it's member pieces
export const canMyKingCapture = (targetRank, targetFile, chessboardSituation, isLayoutDefault, history, turn) => {
    let kingCanCapture = true;

    let copySituation = chessboardSituation;
    //from the chessboard situation, remove the piece that exists in the target square
    chessboardSituation.forEach(
        (rankInfo, rankIndex) => {
            if(rankInfo.rankNumber === targetRank){
                rankInfo.associatedFilesSituation.forEach(
                    (fileInfo, fileIndex) => {
                        if(fileInfo.fileNumber === targetFile){
                            copySituation[rankIndex].associatedFilesSituation[fileIndex] = {
                                fileNumber: fileInfo.fileNumber,
                                hasPiece: false,
                            }
                        }
                    }
                );
            }
        }
    );

    //create possible moves based on this new situation
    let possibleMoves = generatePossibleMoves(copySituation, isLayoutDefault, history);

    //check whether among the new possible moves 
    // an opponent piece has the target square as a move
    possibleMoves.forEach(
        (piece, pieceIndex) => {
            if(piece.pieceColor !== turn){
                piece.moves.forEach(
                   (move, moveIndex) => {
                        if(move.substring(0,1) === `${targetRank}` && move.substring(2, 3) === `${targetFile}`){
                            kingCanCapture = false;
                        }
                   }
                );
            }
        }
    );
    
    return kingCanCapture;
}