import React, {
    useReducer,
    useState,
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
import '../styles/boardStyles.css';


//this component represents the chess board visual and logic
//scheduled to undergo numerous changes

//the reducer function that transforms pieces
//dummy for now
const transformPiece = (pieceSituation, action) => {
    return pieceSituation;
}



const Chessboard = ({chessboardLayout, turn}) => 
{
    //a variable that will store the pieces information when the app is first loaded
    const initialPiecesInfo = initialPieceInfo;

    //state variable that will store the pieces information
    const [currentPieceInfo, changePieceInfo] = useReducer(transformPiece, initialPiecesInfo);

    //state variable that will track the activity phase of the application
    const [activityPhase, setActivityPhase] = useState(
        {
            from: null,
            to: null,
        }
    );

    //the reducer function that manipulates the chessboard color scheme
    const manipulateColorScheme = (currentScheme, action) => {
        switch(action.type){
            case 'POSSIBLE_MOVES':
                return({
                    type: 'POSSIBLE_MOVES',
                    isColorSchemeDefault: false,
                    possibleSquares: action.possibleSquares,
                    targetSquare: action.targetSquare,
                })
        }
    }

    //state variable that will determine the color scheme of the chessboard
    const [colorScheme, setColorScheme] = useReducer(
        manipulateColorScheme,
        {
            isColorSchemeDefault: true,
        }
    );
 
    //a variable that will store the chessboard info when the app is first loaded
    //or when a user changes the layout
    const chessboardInfo = createChessboardInfo(chessboardLayout, colorScheme);
    console.log("chess board information", chessboardInfo);

    //a variable that captures the chessboardSituation currently
    const chessboardSituation = determineChessboardSituation(chessboardInfo, currentPieceInfo);
    console.log("chess board situation", chessboardSituation);

    //a variable that stores all possible moves for all the pieces inside the current chessboard situation
    const possibleMoves = generatePossibleMoves(chessboardSituation, chessboardLayout.default);
    console.log("possible moves", possibleMoves);

    //callbacks
    //handles action when a user makes an interaction with the chessboard
    const launchPlayerActivity = (rankNumber, fileNumber, pieceInfo) => {
        if(!activityPhase.from && !activityPhase.to){
            //check whether the player is moving a piece of the turn's color
            if(turn.color === pieceInfo.color){

                let possibleSquares = [];
                possibleMoves.forEach(
                    (piece, pieceIndex) => {
                        if(piece.pieceId === pieceInfo.id){
                            piece.moves.forEach(
                                (square, squareId) => {
                                    possibleSquares = [
                                        ...possibleSquares,
                                        square.substring(0,3)
                                    ]
                                }
                            );
                        }
                    }
                );

                setColorScheme({type: 'POSSIBLE_MOVES', targetSquare: `${rankNumber}.${fileNumber}`, possibleSquares,});
            }
        }
    }
    
    const displayBoard = chessboardInfo.map(
        (rankInfo, rankIndex) => {

            return(
                rankInfo.associatedFiles.map(
                    (fileInfo, fileIndex) => {

                        //prepare a check for whether this square holds a piece
                        let piece = '';
                        let color;
                        let id;

                        //loop through the pieces and find if there is any piece for this square
                        currentPieceInfo.forEach(
                            singlePiece => {
                                if(!singlePiece.hasBeenCaptured 
                                    && singlePiece.positionOnBoard.rankNumber === rankInfo.rankNumber 
                                    && singlePiece.positionOnBoard.fileNumber === fileInfo.fileNumber){
                                    //check the piece that exists and return the appropriate svg
                                    if(singlePiece.pieceName === 'Pawn'){
                                    piece = 'Pawn';
                                    color = singlePiece.pieceColor;
                                    id = singlePiece.pieceId;
                                    }

                                    if(singlePiece.pieceName === 'King'){
                                    piece = 'King';
                                    color = singlePiece.pieceColor;
                                    id = singlePiece.pieceId;
                                    }

                                    if(singlePiece.pieceName === 'Queen'){
                                    piece = 'Queen';
                                    color = singlePiece.pieceColor;
                                    id = singlePiece.pieceId;
                                    }

                                    if(singlePiece.pieceName === 'Rook'){
                                    piece = 'Rook';
                                    color = singlePiece.pieceColor;
                                    id = singlePiece.pieceId;
                                    }

                                    if(singlePiece.pieceName === 'Knight'){
                                    piece = 'Knight';
                                    color = singlePiece.pieceColor;
                                    id = singlePiece.pieceId;
                                    }

                                    if(singlePiece.pieceName === 'Bishop'){
                                        piece = 'Bishop';
                                        color = singlePiece.pieceColor;
                                        id = singlePiece.pieceId;
                                    }
                                }
                            }
                        );

                        if(piece === 'Pawn'){
                            return(
                                <div
                                onClick={() => launchPlayerActivity(chessboardInfo[rankIndex].rankNumber, chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber, {id, piece, color})}
                                className={chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass}
                                key={`${rankIndex} ${fileIndex}`}
                                style={{border: '1px solid black', width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
                                ><Pawn pieceColor={color} />
                                </div>
                            );
                        }

                        if(piece === 'King'){
                            return(
                                <div
                                onClick={() => launchPlayerActivity(chessboardInfo[rankIndex].rankNumber, chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber, {id, piece, color})}
                                className={chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass}
                                key={`${rankIndex} ${fileIndex}`}
                                style={{border: '1px solid black', width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
                                ><King pieceColor={color} />
                                </div>
                            );
                        }

                        if(piece === 'Queen'){
                            return(
                                <div
                                onClick={() => launchPlayerActivity(chessboardInfo[rankIndex].rankNumber, chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber, {id, piece, color})}
                                className={chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass}
                                key={`${rankIndex} ${fileIndex}`}
                                style={{border: '1px solid black', width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
                                ><Queen pieceColor={color} />
                                </div>
                            );
                        }

                        if(piece === 'Knight'){
                            return(
                                <div
                                onClick={() => launchPlayerActivity(chessboardInfo[rankIndex].rankNumber, chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber, {id, piece, color})}
                                className={chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass}
                                key={`${rankIndex} ${fileIndex}`}
                                style={{border: '1px solid black', width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
                                ><Knight pieceColor={color} />
                                </div>
                            );
                        }

                        if(piece === 'Bishop'){
                            return(
                                <div
                                onClick={() => launchPlayerActivity(chessboardInfo[rankIndex].rankNumber, chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber, {id, piece, color})}
                                className={chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass}
                                key={`${rankIndex} ${fileIndex}`}
                                style={{border: '1px solid black', width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
                                ><Bishop pieceColor={color} />
                                </div>
                            );
                        }

                        if(piece === 'Rook'){
                            return(
                                <div
                                onClick={() => launchPlayerActivity(chessboardInfo[rankIndex].rankNumber, chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber, {id, piece, color})}
                                className={chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass}
                                key={`${rankIndex} ${fileIndex}`}
                                style={{border: '1px solid black', width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
                                ><Rook pieceColor={color} />
                                </div>
                            );
                        }

                        return(
                            <div
                            onClick={() => launchPlayerActivity(chessboardInfo[rankIndex].rankNumber, chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber, {id: null})}
                            className={chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass}
                            key={`${rankIndex} ${fileIndex}`}
                            style={{border: '1px solid black', width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
                            >
                            </div>
                        );

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