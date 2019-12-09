import React, {
    useReducer,
} from 'react';
import King from './pieces/King';
import Queen from './pieces/Queen';
import Rook from './pieces/Rook';
import Bishop from './pieces/Bishop';
import Knight from './pieces/Knight';
import Pawn from './pieces/Pawn';
import {initialPieceInfo} from './info/PiecesInfo';
import {
    createChessboardInfo,
    determineChessboardSituation
} from './logic/BoardLogic';
import {generatePossibleMoves} from './logic/PiecesLogic';


//this component represents the chess board visual and logic
//scheduled to undergo numerous changes

//the reducer function that transforms pieces
//dummy for now
const transformPiece = (pieceSituation, action) => {
    return pieceSituation;
}

const Chessboard = ({chessboardLayout}) => 
{
    //a variable that will store the pieces information when the app is first loaded
    const initialPiecesInfo = initialPieceInfo;

    //state variable that will store the pieces information
    const [currentPieceInfo, changePieceInfo] = useReducer(transformPiece, initialPiecesInfo);
 
    //a variable that will store the chessboard info when the app is first loaded
    //or when a user changes the layout
    const chessboardInfo = createChessboardInfo(chessboardLayout);
    console.log("chess board information", chessboardInfo);

    //a variable that captures the chessboardSituation currently
    const chessboardSituation = determineChessboardSituation(chessboardInfo, currentPieceInfo);
    console.log("chess board situation", chessboardSituation);

    //a variable that stores all possible moves for all the pieces inside the current chessboard situation
    const possibleMoves = generatePossibleMoves(chessboardSituation, chessboardLayout.default);
    console.log("possible moves", possibleMoves);
    
    const displayBoard = chessboardInfo.map(
        (rankInfo, rankIndex) => {
            let start;
            if(rankIndex % 2 === 0) start = '#ccfbfc';
            else start = '#4edbde';
            return(
                rankInfo.associatedFiles.map(
                    (fileInfo, fileIndex) => {
                        let next;
                        if(start === '#4edbde') next = '#ccfbfc';
                        else if(start === '#ccfbfc') next = '#4edbde';

                        //prepare a check for whether this square holds a piece
                        let piece = '';
                        let color;

                        //loop through the pieces and find if there is any piece for this square
                        currentPieceInfo.forEach(
                            singlePiece => {
                                if(!singlePiece.hasBeenCaptured && singlePiece.positionOnBoard.rankNumber === rankInfo.rankNumber && singlePiece.positionOnBoard.fileNumber === fileInfo.fileNumber){
                                    //check the piece that exists and return the appropriate svg
                                    if(singlePiece.pieceName === 'Pawn'){
                                    piece = 'Pawn';
                                    color = singlePiece.pieceColor;
                                    }

                                    if(singlePiece.pieceName === 'King'){
                                    piece = 'King';
                                    color = singlePiece.pieceColor;
                                    }

                                    if(singlePiece.pieceName === 'Queen'){
                                    piece = 'Queen';
                                    color = singlePiece.pieceColor;
                                    }

                                    if(singlePiece.pieceName === 'Rook'){
                                    piece = 'Rook';
                                    color = singlePiece.pieceColor;
                                    }

                                    if(singlePiece.pieceName === 'Knight'){
                                    piece = 'Knight';
                                    color = singlePiece.pieceColor;
                                    }

                                    if(singlePiece.pieceName === 'Bishop'){
                                        piece = 'Bishop';
                                    color = singlePiece.pieceColor;
                                    }
                                }
                            }
                        );

                        if(piece === 'Pawn'){
                            return(
                                <>
                                    {
                                        fileIndex % 2 === 0 ? 
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: start,}}><Pawn pieceColor={color} /></div>:
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: next,}}><Pawn pieceColor={color} /></div>
                                    }
                                </>
                                )
                        }

                        if(piece === 'King'){
                            return(
                                <>
                                    {
                                        fileIndex % 2 === 0 ? 
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: start,}}><King pieceColor={color} /></div>:
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: next,}}><King pieceColor={color} /></div>
                                    }
                                </>
                                )
                        }

                        if(piece === 'Queen'){
                            return(
                                <>
                                    {
                                        fileIndex % 2 === 0 ? 
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: start,}}><Queen pieceColor={color} /></div>:
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: next,}}><Queen pieceColor={color} /></div>
                                    }
                                </>
                                )
                        }

                        if(piece === 'Knight'){
                            return(
                                <>
                                    {
                                        fileIndex % 2 === 0 ? 
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: start,}}><Knight pieceColor={color} /></div>:
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: next,}}><Knight pieceColor={color} /></div>
                                    }
                                </>
                                )
                        }

                        if(piece === 'Bishop'){
                            return(
                                <>
                                    {
                                        fileIndex % 2 === 0 ? 
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: start,}}><Bishop pieceColor={color} /></div>:
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: next,}}><Bishop pieceColor={color} /></div>
                                    }
                                </>
                                )
                        }

                        if(piece === 'Rook'){
                            return(
                                <>
                                    {
                                        fileIndex % 2 === 0 ? 
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: start,}}><Rook pieceColor={color} /></div>:
                                        <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: next,}}><Rook pieceColor={color} /></div>
                                    }
                                </>
                                )
                        }

                        return(
                            <>
                                {
                                    fileIndex % 2 === 0 ? 
                                    <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: start,}}></div>:
                                    <div key={`${rankIndex} ${fileIndex}`} style={{width: '70px', height: '70px', backgroundColor: next,}}></div>
                                }
                            </>
                            )

                    }
                )
            )
        }
        );

    return(
        <>
        <div style={{
         width: '562px',
         height: '562px',
         display: 'flex', 
         flexFlow: 'row wrap',
         alignItems: 'flex-start',
         alignContent: 'flex-start',
           }}>
            {
                displayBoard.map(rank => rank.map((file, index) => <React.Fragment key={index}>{file}</React.Fragment>))
            }
        </div>
        </>
    );
}

export default React.memo(Chessboard);