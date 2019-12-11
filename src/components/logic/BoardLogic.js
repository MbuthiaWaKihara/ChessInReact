//method that creates a chessboard based on the layout given
export const createChessboardInfo = (chessboardLayout, colorScheme) => {

    //a variable that will store the chessboard when the app is first loaded
    //or when a user changes the layout or color scheme
    let chessboardInfo = [];
    let associatedFilesHolder = [];
    let color;
    let initialColor;
    let squareClass;

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

    //then conditionally color the chessboard according to the incoming color scheme
    let chessboardCopy = chessboardInfo
    chessboardCopy.forEach(
        (rankInfo, rankIndex) => {
            
            if(rankIndex % 2 === 0){
                initialColor = '#ccfbfc';
            }else{
                initialColor = '#4edbde';
            }
    
            rankInfo.associatedFiles.forEach(
                (fileInfo, fileIndex) => {

                    if(colorScheme.isColorSchemeDefault){
                        squareClass = 'normal';
                       if(fileIndex === 0){
                           color = initialColor;
                       }else{
                          if(fileIndex % 2 === 1){
                            if(initialColor === '#4edbde') color = '#ccfbfc';
                            if(initialColor === '#ccfbfc') color = '#4edbde';
                          }else{
                            color = initialColor;
                          }
                        }

                        chessboardInfo[rankIndex].associatedFiles[fileIndex] = {
                            ...fileInfo,
                            color,
                            squareClass,
                        }
                    }else{
                        if(colorScheme.type === 'POSSIBLE_MOVES'){

                            if(`${chessboardInfo[rankIndex].rankNumber}.${chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber}` === colorScheme.targetSquare){
                                squareClass = 'selectedInMove';
                                chessboardInfo[rankIndex].associatedFiles[fileIndex] = {
                                    ...fileInfo,
                                    squareClass,
                                }
                            }else{
                               squareClass = 'normal';
                                if(fileIndex === 0){
                                    color = initialColor;
                                }else{
                                    if(fileIndex % 2 === 1){
                                        if(initialColor === '#4edbde') color = '#ccfbfc';
                                        if(initialColor === '#ccfbfc') color = '#4edbde';
                                    }else{
                                        color = initialColor;
                                    }
                                    }

                                    chessboardInfo[rankIndex].associatedFiles[fileIndex] = {
                                        ...fileInfo,
                                        color,
                                        squareClass,
                                    }
                            }

                            colorScheme.possibleSquares.forEach(
                                (square, squareIndex) => {
                                    if(`${chessboardInfo[rankIndex].rankNumber}.${chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber}` === square.substring(0,3)){
                                        squareClass = 'amongPossibleSquares';
                                        chessboardInfo[rankIndex].associatedFiles[fileIndex] = {
                                            ...fileInfo,
                                            squareClass,
                                        }
                                    }

                                    let capture = square.search("X")
                                    if(capture !== -1){
                                        if(`${chessboardInfo[rankIndex].rankNumber}.${chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber}` === square.substring(0,3)){
                                            squareClass = 'amongPossibleCaptures';
                                            chessboardInfo[rankIndex].associatedFiles[fileIndex] = {
                                                ...fileInfo,
                                                squareClass,
                                            }
                                        }
                                    }
                                }
                            );
                        }

                        //not isColorSchemeDefault is here
                    }
                }
            );

            
        }
    );

    return chessboardInfo;
}


//a method that determines which pieces are where on the chessboard, called as chessboardSituation
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