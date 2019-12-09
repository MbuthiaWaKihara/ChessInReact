
//method that creates a chessboard based on the layout given
export const createChessboardInfo = (chessboardLayout) => {

    //a variable that will store the chessboard when the app is first loaded
    //or when a user changes the layout
    let chessboardInfo = [];
    let associatedFilesHolder = [];

    for(let currentRank = 0; currentRank < 8; currentRank++){
        //prepare an array that holds info about the files associated with current rank
        for(let fileCounter = 0; fileCounter < 8; fileCounter++){
            associatedFilesHolder = [
                ...associatedFilesHolder,
                {
                    fileNumber: chessboardLayout.fileNumbers[fileCounter],
                    fileName: chessboardLayout.filesPlacement[fileCounter]
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
    return chessboardInfo;
}


//a method that determine which pieces are where on the chessboard, called as chessboardSituation
//this method produces an array that can be used to generate possible moves
export const determineChessboardSituation = (chessboardInfo, currentPieceInfo) => {
    let chessboardSituation = [];
    let associatedFilesSituationHolder = [];

    chessboardInfo.forEach(
        (rankInfo, rankIndex) => {
            rankInfo.associatedFiles.forEach(
                (fileInfo, fileIndex) => {
                    currentPieceInfo.forEach(
                        (piece, pieceIndex) => {
                            if(!piece.hasBeenCaptured && piece.positionOnBoard.rankNumber === rankInfo.rankNumber && piece.positionOnBoard.fileNumber === fileInfo.fileNumber){
                                associatedFilesSituationHolder = [
                                    ...associatedFilesSituationHolder,
                                    {
                                        fileNumber: fileInfo.fileNumber,
                                        hasPiece: true,
                                        pieceId: piece.pieceId,
                                        pieceName: piece.pieceName,
                                        pieceColor: piece.pieceColor,
                                        pieceMoves:piece.noOfMoves,
                                        positionOnBoard: {
                                            ...piece.positionOnBoard
                                        }
                                    }
                                ];
                            }
                        }
                    );

                    if(!associatedFilesSituationHolder[fileIndex]){
                        associatedFilesSituationHolder = [
                            ...associatedFilesSituationHolder,
                            {
                                fileNumber: fileInfo.fileNumber,
                                hasPiece: false,
                            }
                        ];
                    }
                }
            );

            chessboardSituation = [
                ...chessboardSituation,
                {
                    rankNumber: rankInfo.rankNumber,
                    associatedFilesSituation: associatedFilesSituationHolder,
                }
            ]

            associatedFilesSituationHolder = [];
        }
    );

    return chessboardSituation;
}