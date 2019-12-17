import {kingTracker} from './KingLogic';
import {generatePossibleMoves} from './PiecesLogic';

//this function will tell the chessboard whether 
//a piece intending to be moved by a player is pinned or not
export const isMyPiecePinned = (targetRank, targetFile, chessboardSituation, isLayoutDefault, history) => {
    let pieceIsPinned = {
        status: false,
        attackers: [],
    }
    let copySituation = chessboardSituation;

    chessboardSituation.forEach(
        (rankInfo, rankIndex) => {
            if(rankInfo.rankNumber === targetRank){
                rankInfo.associatedFilesSituation.forEach(
                    (fileInfo, fileIndex) => {
                        if(fileInfo.fileNumber === targetFile) {
                            copySituation[rankIndex].associatedFilesSituation[fileIndex] = {
                                hasPiece: false,
                                fileNumber: fileInfo.fileNumber,
                            }
                        }
                    }
                );
            }
        }
    );

    //generate possible moves were the situation to be changed this way
    let possibleMoves = generatePossibleMoves(copySituation, isLayoutDefault, history);
    let isKingInCheck = kingTracker(possibleMoves, copySituation, isLayoutDefault);
    if(isKingInCheck[0].status){
        pieceIsPinned = {
            status: isKingInCheck[0].status,
            attackers: isKingInCheck[0].attackers,
        }
    }
    return pieceIsPinned;
}