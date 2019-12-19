import {kingTracker} from './KingLogic';
import {generatePossibleMoves} from './PiecesLogic';
import {determineChessboardSituation} from './BoardLogic';


//this function will tell the chessboard whether 
//a piece intending to be moved by a player is pinned or not
export const isMyPiecePinned = (targetRank, targetFile, chessboardSituation, isLayoutDefault, history) => {
    let pieceIsPinned = false;
    let copySituation = JSON.parse(JSON.stringify(chessboardSituation));

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
        pieceIsPinned = true;
    }
    return pieceIsPinned;
}

//this function determines whether a move for a pinned piece is valid or not
//the move is valid if it does not leave the king in check
export const canMyPieceBeHere = (pieceId, move, currentPieceInfo, chessboardLayout, isLayoutDefault, history) => {

    let pieceCanBeHere = true;
    //get the rank and file in question from the piece moves
    let targetRank = parseInt(move.substring(0,1));
    let targetFile = parseInt(move.substring(2,3));

    //from the piece information, let the piece at the target rank and file, if any
    //be captured

    //again from the piece information, change the position of the piece in question to
    //the target rank and target file
    let copyPieceInfo = JSON.parse(JSON.stringify(currentPieceInfo));

    currentPieceInfo.forEach(
        (piece, pieceIndex) => {
            if(piece.positionOnBoard.rankNumber === targetRank 
                && piece.positionOnBoard.fileNumber === targetFile 
                && piece.pieceId !== pieceId){
                if(!piece.hasBeenCaptured){
                    copyPieceInfo[pieceIndex].hasBeenCaptured = true;
                } 
            }

            if(piece.pieceId === pieceId){
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
    //check if the king will be in check was this to be the case
    let isKingInCheck = kingTracker(possibleMoves, chessboardSituation, isLayoutDefault);

    if(isKingInCheck[0].status) pieceCanBeHere = false;


    return pieceCanBeHere;
}