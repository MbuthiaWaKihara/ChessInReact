import React, {
    useReducer,
    useState,
    useEffect,
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
    determineChessboardSituation,
} from './logic/BoardLogic';
import {generatePossibleMoves} from './logic/PiecesLogic';
import {kingTracker, refineKingMoves, canMyKingBeHere} from './logic/KingLogic';
import {canMyPieceHelp} from './logic/InCheckLogic';
import '../styles/boardStyles.css';
import { isMyPiecePinned, canMyPieceBeHere } from './logic/PinLogic';


//this component represents the chess board visual and logic
//scheduled to undergo numerous changes

//the reducer function that transforms pieces
const transformPiece = (pieceSituation, action) => {
    switch(action.type){
        case 'UPDATE_PIECE_POSITION':
            return action.value;
        default:
            return pieceSituation;
    }
}


const Chessboard = ({chessboardLayout, turn, switchTurn, changePromotionState, promotionPiece, setPromotionPiece, setScreenContent}) => 
{
    //a state variable that will track whenever a checkmate occurs
    const [checkmate, setCheckmate] = useState(false);

    //a variable that will store the pieces information when the app is first loaded
    const initialPiecesInfo = initialPieceInfo;

    //state variable that will store the pieces information
    const [currentPieceInfo, changePieceInfo] = useReducer(transformPiece, initialPiecesInfo);
    // console.log("current piece information", currentPieceInfo);

    //state variable that will track the activity phase of the application
    const [activityPhase, setActivityPhase] = useState(
        {
            pieceId: null,
            from: null,
            to: null,
            isPiecePinned: null,
        }
    );
    //      

    //the reducer function that manipulates the chessboard color scheme
    const manipulateColorScheme = (currentScheme, action) => {
        switch(action.type){
            case 'POSSIBLE_MOVES':
                return({
                    type: 'POSSIBLE_MOVES',
                    isColorSchemeDefault: false,
                    possibleSquares: action.possibleSquares,
                    targetSquare: action.targetSquare,
                    targetCheckSquare: action.targetCheckSquare,
                });
            case 'SHOW_CHECK':
                return({
                    type: 'SHOW_CHECK',
                    isColorSchemeDefault: false,
                    targetCheckSquare: action.targetCheckSquare,
                });
            case 'RETURN_TO_DEFAULT':
                return({
                    isColorSchemeDefault: true,
                });
            default:
                return currentScheme;
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
    // console.log("chess board information", chessboardInfo);

    //a variable that captures the chessboardSituation currently
    const chessboardSituation = determineChessboardSituation(chessboardInfo, currentPieceInfo);
    // console.log("chess board situation", chessboardSituation);

    //a reducer method that will add a move to history
    const addToHistory = (currentHistory, action) => {
        switch(action.type){
            case 'ADD_BLACK_MOVE':
                let copy = currentHistory;
                copy[currentHistory.length - 1].push(action.value);
                return copy;
            case 'ADD_WHITE_MOVE':
                let newmove = [];
                newmove = [...newmove, action.value];
                return([
                    ...currentHistory, newmove
                ]);
            default:
                return currentHistory;
        }
    }
    //a state variable that will hold an array of moves already made
    const [history, updateHistory] = useReducer(addToHistory, []);
    // console.log("history", history);

    //a variable that stores all possible moves for all the pieces inside the current chessboard situation
    let possibleMoves = generatePossibleMoves(chessboardSituation, chessboardLayout.default, history);
    //refine these possible moves
    // const possibleMoves = refinePossibleMoves(rawPossibleMoves, chessboardSituation, chessboardLayout.default, history);
    //get some info about the kings before display
    let [isKingInCheck, rawKingPossibleMoves] = kingTracker(possibleMoves, chessboardSituation, chessboardLayout.default);
    let intermediateKingPossibleMoves = refineKingMoves(rawKingPossibleMoves);
    // console.log("king possible moves", kingPossibleMoves);

    //create a copy of the current piece info
    let copyPieceInfo = currentPieceInfo;
    let kingPossibleMoves = [];

    intermediateKingPossibleMoves.forEach(
        (king, kingIndex) => {
            kingPossibleMoves = [
                ...kingPossibleMoves,
                {
                    ...king,
                    moves: []
                }
            ];

            king.moves.forEach(
                (move, moveIndex) => {
                    let isSquareValid = canMyKingBeHere(move, copyPieceInfo, chessboardLayout, chessboardLayout.default, history, king.pieceColor);
                    if(isSquareValid){
                        kingPossibleMoves[kingIndex].moves = [
                            ...kingPossibleMoves[kingIndex].moves, move
                        ]
                    }
                }
            );
        }
    );
   
    possibleMoves.push(kingPossibleMoves[0]);
    possibleMoves.push(kingPossibleMoves[1]);
    // console.log("check info", isKingInCheck);
    // console.log("possible moves", possibleMoves);

    useEffect(
        () => {
            
            //change the board's color scheme whenever a king is in check
            if(isKingInCheck.status){
                setScreenContent({
                    message: 'Check!',
                    verdict: '',
                });

                chessboardSituation.forEach(
                    (rankInfo, rankIndex) => {
                        rankInfo.associatedFilesSituation.forEach(
                            (fileInfo, fileIndex) => {
                                if(fileInfo.pieceId === isKingInCheck.id){
                                    setColorScheme({type: 'SHOW_CHECK', targetCheckSquare: `${rankInfo.rankNumber}.${fileInfo.fileNumber}`,});
                                    
                                }
                            }
                        );
                    }
                );
            }else{
                setScreenContent({
                    message: '',
                    verdict: '',
                });
            }

            //watch for checkmate
            //if the king that is currently in check does not have moves, the chance for a checkmate on board is likely
            let kingInDanger = {
                moves: [0],
            };
            kingPossibleMoves.forEach(
                (king, kingIndex) => {
                    if(king.pieceId === isKingInCheck.id){
                        kingInDanger = king;
                    }
                }
            );

            if(kingInDanger.moves.length === 0){
                //we are going to check for a filtered version of possible moves for pieces of the king's
                //Color, to determine whether the king has been checkmated

                let kingCanBeSaved = false;
                let attackerInfo;
                let kingInfo;

                //get the information of the king
                //and the information of the attacker
                currentPieceInfo.forEach(
                    (piece, pieceIndex) => {
                        if(piece.pieceId === isKingInCheck.attackers[0]){
                            attackerInfo = piece.positionOnBoard;
                        }
                        if(piece.pieceId === isKingInCheck.id){
                            kingInfo = piece.positionOnBoard;
                        }
                    }
                );

                possibleMoves.forEach(
                    (piece, pieceIndex) => {
                        if(piece.pieceColor === kingInDanger.pieceColor){
                            let possibleSquares = canMyPieceHelp(attackerInfo, kingInfo, piece.moves, isKingInCheck.attackers.length);
                            if(possibleSquares.length > 0){
                                kingCanBeSaved = true;
                            }
                        }
                    }
                );

                if(!kingCanBeSaved){
                    setCheckmate(true);
                }
            }
        },[turn]
    );
    
    //check whether there is a pawn for promotion
    useEffect(
        () => {
            //loop the current chessboard situation to see if there is a pawn on the eigth or the first rank
            chessboardSituation.forEach(
                (rankInfo, rankIndex) => {
                    if(rankInfo.rankNumber ===  1 || rankInfo.rankNumber === 8){
                        rankInfo.associatedFilesSituation.forEach(
                            (fileInfo, fileIndex) => {
                                if(fileInfo.hasPiece && fileInfo.pieceName === 'Pawn'){
                                    
                                    changePromotionState('block', fileInfo.pieceColor);
                                    if(turn.color !== fileInfo.pieceColor){
                                        switchTurn({type: 'CHANGE_COLOR'});
                                    }
                                }
                            }
                        );
                    }
                } 
            );

        },[activityPhase]
    );

    //whenever there is a promotion piece, update the chessboard and return the promotion piece to null
    useEffect(
        () => {

             //change the pieces when the promotion piece is set
             if(promotionPiece){
                let copyPieceInfo = currentPieceInfo;

                currentPieceInfo.forEach(
                    (piece,pieceIndex) => {
                        if((piece.positionOnBoard.rankNumber === 1 || piece.positionOnBoard.rankNumber === 8)
                        && piece.pieceColor === turn.color
                        && piece.pieceName === 'Pawn'){
                            copyPieceInfo[pieceIndex].pieceName = promotionPiece;
                        }
                    }
                );
                
                changePieceInfo({type: 'UPDATE_PIECE_POSITION', value: copyPieceInfo});
                switchTurn({type: 'CHANGE_COLOR'});
                setPromotionPiece(null);
            }

            //a player cannot play elsewhere if he has to choose a piece
             //loop the current chessboard situation to see if there is a pawn on the eigth or the first rank
             chessboardSituation.forEach(
                (rankInfo, rankIndex) => {
                    if(rankInfo.rankNumber ===  1 || rankInfo.rankNumber === 8){
                        rankInfo.associatedFilesSituation.forEach(
                            (fileInfo, fileIndex) => {
                                if(fileInfo.hasPiece && fileInfo.pieceName === 'Pawn'){
                                    possibleMoves = [];
                                }
                            }
                        );
                    }
                } 
            );
        }
    );

    useEffect(
        () => {
            if(checkmate){

                let kingId = isKingInCheck.id;
                let kingColor;
                
                kingPossibleMoves.forEach(
                    (king, kingIndex) => {
                        if(king.pieceId === kingId){
                            kingColor = king.pieceColor;
                        }
                    }
                );
                if(kingColor === 'white'){
                    setScreenContent({
                        message: '',
                        verdict: 'Checkmate! Black wins...'
                    });
                }else{
                    setScreenContent({
                        message: '',
                        verdict: 'Checkmate! White wins...'
                    });
                }
            }
        },[checkmate]
    );


    //callbacks
    //handles action when a user makes an interaction with the chessboard
    const launchPlayerActivity = (rankNumber, fileNumber, pieceInfo) => {
        if(!checkmate){
            if(!activityPhase.from && !activityPhase.to){
                if(!isKingInCheck.status){
                    //check whether the player is moving a piece of the turn's color
                    if(turn.color === pieceInfo.color){
    
                        let possibleSquares = [];
                        
                        possibleMoves.forEach(
                            (piece, pieceIndex) => {
                                if(piece.pieceId === pieceInfo.id){
                                    possibleSquares = piece.moves;
                                }
                            }
                        );

                        //check if the piece is pinned
                        let myPieceIsPinned = isMyPiecePinned(rankNumber, fileNumber, chessboardSituation, chessboardLayout.default, history);
                        if(myPieceIsPinned){
                            
                            //we need to investigate every move by a pinned piece to ensure the move will not leave the king in check
                            let newPossibleSquares = [];
                            possibleSquares.forEach(
                                (move, moveIndex) => {
                                    let isSquarePossible = canMyPieceBeHere(pieceInfo.id, move, currentPieceInfo, chessboardLayout, chessboardLayout.default, history);
                                    if(isSquarePossible){
                                        newPossibleSquares = [
                                            ...newPossibleSquares,
                                            move
                                        ]
                                    }
                                }
                            );

                            possibleSquares = newPossibleSquares;
                            
                            setColorScheme({type: 'POSSIBLE_MOVES', targetSquare: `${rankNumber}.${fileNumber}`, possibleSquares,targetCheckSquare: null,});
                            setActivityPhase({...activityPhase, from:  `${rankNumber}.${fileNumber}`, pieceId: pieceInfo.id, isPiecePinned: true,});
                        }else{
                            setColorScheme({type: 'POSSIBLE_MOVES', targetSquare: `${rankNumber}.${fileNumber}`, possibleSquares,targetCheckSquare: null,});
                            setActivityPhase({...activityPhase, from:  `${rankNumber}.${fileNumber}`, pieceId: pieceInfo.id});
                        }
    
                        
                    }
                }else{
                    //check whether the player is moving a piece of the turn's color
                    if(turn.color === pieceInfo.color){
                        let possibleSquares = []
                        //filter this piece's possible moves
                        //allow only those that can help the king get out of check
                        let myPossibleMoves;
                        possibleMoves.forEach(
                            (piece, pieceIndex) => {
                                if(piece.pieceId === pieceInfo.id){
                                    myPossibleMoves = piece.moves;
                                }
                            }
                        );

                        let kingInfo;
                        let attackerInfo;

                        //check if the piece is pinned
                        let myPieceIsPinned = isMyPiecePinned(rankNumber, fileNumber, chessboardSituation, chessboardLayout.default, history);

                        //get the information of the king
                        //and the information of the attacker
                        currentPieceInfo.forEach(
                            (piece, pieceIndex) => {
                                if(piece.pieceId === isKingInCheck.attackers[0]){
                                    attackerInfo = piece.positionOnBoard;
                                }
                                if(piece.pieceId === isKingInCheck.id){
                                    kingInfo = piece.positionOnBoard;
                                }
                            }
                        );
                       
                      if(pieceInfo.piece !== 'King'){

                        possibleSquares = canMyPieceHelp(attackerInfo, kingInfo, myPossibleMoves, isKingInCheck.attackers.length);
                        
                        
                        if(myPieceIsPinned){
                            //we need to investigate every move by a pinned piece to ensure the move will not leave the king in check
                            let newPossibleSquares = [];
                            possibleSquares.forEach(
                                (move, moveIndex) => {
                                    let isSquarePossible = canMyPieceBeHere(pieceInfo.id, move, currentPieceInfo, chessboardLayout, chessboardLayout.default, history);
                                    if(isSquarePossible){
                                        newPossibleSquares = [
                                            ...newPossibleSquares,
                                            move
                                        ]
                                    }
                                }
                            );

                            possibleSquares = newPossibleSquares;
                        }


                      }else{
                          possibleSquares = myPossibleMoves;
                      }

                        let targetCheckSquare;
                        chessboardSituation.forEach(
                            (rankInfo, rankIndex) => {
                                rankInfo.associatedFilesSituation.forEach(
                                    (fileInfo, fileIndex) => {
                                        if(fileInfo.pieceId === isKingInCheck.id){
                                            targetCheckSquare = `${rankInfo.rankNumber}.${fileInfo.fileNumber}`;
                                        }
                                    }
                                );
                            }
                        );
    
                       
                        if(myPieceIsPinned){
                            setColorScheme({type: 'POSSIBLE_MOVES', targetSquare: `${rankNumber}.${fileNumber}`, possibleSquares, targetCheckSquare,});
                            setActivityPhase({...activityPhase, from:  `${rankNumber}.${fileNumber}`, pieceId: pieceInfo.id, isPiecePinned: true,});
                        }else{
                            setColorScheme({type: 'POSSIBLE_MOVES', targetSquare: `${rankNumber}.${fileNumber}`, possibleSquares, targetCheckSquare,});
                            setActivityPhase({...activityPhase, from:  `${rankNumber}.${fileNumber}`, pieceId: pieceInfo.id});
                        }
                    }
                }
            }
    

            if(activityPhase.from && !activityPhase.to){
    
                //the user clicked on an empty square, they want to move the from piece there
                if(!pieceInfo.id){
                    if(!isKingInCheck.status){
                        let targetPiece = activityPhase.from;
                        let currentPieces = currentPieceInfo;
                        let isSquareWithinPossible = false;
                        let isCaseEnPassant = false;
                        let enPassantId = null;
                        let isCaseCastlesShort = false;
                        let isCaseCastlesLong = false;
                        let castleId = null;

                        //is the square within possible moves or an en passant square or maybe a castle?
                        possibleMoves.forEach(
                            (piece, pieceIndex) => {
                                if(piece.pieceId === activityPhase.pieceId){
                                   if(activityPhase.pieceId !== 15 && activityPhase.pieceId !== 16){
                                        piece.moves.forEach(
                                            (move, moveIndex) => {
                                                if(move === `${rankNumber}.${fileNumber}`){
                                                    if(activityPhase.isPiecePinned){
                                                        //we need to check if the selected move is possible for a pinned piece
                                                        let isSquarePossible = canMyPieceBeHere(activityPhase.pieceId, move, currentPieceInfo, chessboardLayout, chessboardLayout.default, history);
                                                        if(isSquarePossible) isSquareWithinPossible = true;
                                                    }else{
                                                        isSquareWithinPossible = true;
                                                    }
                                                }
                                                if(move.substring(0,3) === `${rankNumber}.${fileNumber}` && move.search("E") !== -1){
                                                    if(activityPhase.isPiecePinned){
                                                        //we need to check if the selected move is possible for a pinned piece
                                                        let isSquarePossible = canMyPieceBeHere(activityPhase.pieceId, move, currentPieceInfo, chessboardLayout, chessboardLayout.default, history);
                                                        if(isSquarePossible){
                                                            isCaseEnPassant = true;
                                                            let moveInfo = move.split(".");
                                                            enPassantId = parseInt(moveInfo[moveInfo.length - 1]);
                                                        }
                                                    }else{
                                                        isCaseEnPassant = true;
                                                        let moveInfo = move.split(".");
                                                        enPassantId = parseInt(moveInfo[moveInfo.length - 1]);
                                                    }
                                                }
                                            }
                                        );
                                   }

                                   if(activityPhase.pieceId === 15 || activityPhase.pieceId === 16){
                                    piece.moves.forEach(
                                        (move, moveIndex) => {
                                            if(move === `${rankNumber}.${fileNumber}`){
                                                isSquareWithinPossible = true;
                                            }
                                            if(move.substring(0,3) === `${rankNumber}.${fileNumber}` && move.search("Cs") !== -1){
                                                isCaseCastlesShort = true;
                                                let moveInfo = move.split(".");
                                                castleId = parseInt(moveInfo[moveInfo.length - 1]);
                                            }
                                            if(move.substring(0,3) === `${rankNumber}.${fileNumber}` && move.search("Cl") !== -1){
                                                isCaseCastlesLong = true;
                                                let moveInfo = move.split(".");
                                                castleId = parseInt(moveInfo[moveInfo.length - 1]);
                                            }
                                        }
                                    );
                                   }

                                }
                            }
                        );
                        
                        if(isSquareWithinPossible){
                            currentPieceInfo.forEach(
                                (piece, pieceIndex) => {
                                    if(`${piece.positionOnBoard.rankNumber}.${piece.positionOnBoard.fileNumber}` === targetPiece){
                                        currentPieces[pieceIndex].positionOnBoard.rankNumber = rankNumber;
                                        currentPieces[pieceIndex].positionOnBoard.fileNumber = fileNumber;
                                        currentPieces[pieceIndex].noOfMoves = currentPieces[pieceIndex].noOfMoves + 1;
                                    }
                                }
                            );

                            changePieceInfo({type: 'UPDATE_PIECE_POSITION', value: currentPieces});
                            // console.log("current pieces", currentPieceInfo);
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});

                            if(turn.color === 'white'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_WHITE_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }else if(turn.color === 'black'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_BLACK_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }

                            switchTurn({type: 'CHANGE_COLOR'});
                        }else if(isCaseCastlesLong){
                            currentPieceInfo.forEach(
                                (piece, pieceIndex) => {
                                    if(`${piece.positionOnBoard.rankNumber}.${piece.positionOnBoard.fileNumber}` === targetPiece){
                                        currentPieces[pieceIndex].positionOnBoard.rankNumber = rankNumber;
                                        currentPieces[pieceIndex].positionOnBoard.fileNumber = fileNumber;
                                        currentPieces[pieceIndex].noOfMoves = currentPieces[pieceIndex].noOfMoves + 1;
                                    }

                                    if(piece.pieceId === castleId){
                                        currentPieces[pieceIndex].positionOnBoard.fileNumber = fileNumber + 1;
                                    }
                                }
                            );

                            changePieceInfo({type: 'UPDATE_PIECE_POSITION', value: currentPieces});
                            // console.log("current pieces", currentPieceInfo);
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});

                            if(turn.color === 'white'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_WHITE_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }else if(turn.color === 'black'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_BLACK_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }

                            switchTurn({type: 'CHANGE_COLOR'});

                        }else if(isCaseCastlesShort){
                            currentPieceInfo.forEach(
                                (piece, pieceIndex) => {
                                    if(`${piece.positionOnBoard.rankNumber}.${piece.positionOnBoard.fileNumber}` === targetPiece){
                                        currentPieces[pieceIndex].positionOnBoard.rankNumber = rankNumber;
                                        currentPieces[pieceIndex].positionOnBoard.fileNumber = fileNumber;
                                        currentPieces[pieceIndex].noOfMoves = currentPieces[pieceIndex].noOfMoves + 1;
                                    }

                                    if(piece.pieceId === castleId){
                                        currentPieces[pieceIndex].positionOnBoard.fileNumber = fileNumber - 1;
                                    }
                                }
                            );

                            changePieceInfo({type: 'UPDATE_PIECE_POSITION', value: currentPieces});
                            // console.log("current pieces", currentPieceInfo);
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});

                            if(turn.color === 'white'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_WHITE_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }else if(turn.color === 'black'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_BLACK_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }

                            switchTurn({type: 'CHANGE_COLOR'});

                        }else if(isCaseEnPassant){
                            currentPieceInfo.forEach(
                                (piece, pieceIndex) => {
                                    if(`${piece.positionOnBoard.rankNumber}.${piece.positionOnBoard.fileNumber}` === targetPiece){
                                        currentPieces[pieceIndex].positionOnBoard.rankNumber = rankNumber;
                                        currentPieces[pieceIndex].positionOnBoard.fileNumber = fileNumber;
                                        currentPieces[pieceIndex].noOfMoves = currentPieces[pieceIndex].noOfMoves + 1;
                                    }

                                    if(piece.pieceId === enPassantId){
                                        currentPieces[pieceIndex].hasBeenCaptured = true;
                                    }
                                }
                            );

                            changePieceInfo({type: 'UPDATE_PIECE_POSITION', value: currentPieces});
                            // console.log("current pieces", currentPieceInfo);
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});

                            if(turn.color === 'white'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_WHITE_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }else if(turn.color === 'black'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_BLACK_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }

                            switchTurn({type: 'CHANGE_COLOR'});
                        }else{
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});
                        }  
                    }else{
                        let targetPiece = activityPhase.from;
                        let myPiece = activityPhase.pieceId;
                        let currentPieces = currentPieceInfo;
                        let filteredMoves = [];
                        let myPossibleMoves;
                        let isSquareWithinPossible = false;

                        possibleMoves.forEach(
                            (piece, pieceIndex) => {
                                if(piece.pieceId === myPiece){
                                    myPossibleMoves = piece.moves;
                                }
                            }
                        );
                       
                    
                       if(myPiece !== 15 && myPiece !== 16){
                        let kingInfo;
                        let attackerInfo;

                        //get the information of the king
                        //and the information of the attacker
                        currentPieceInfo.forEach(
                            (piece, pieceIndex) => {
                                if(piece.pieceId === isKingInCheck.attackers[0]){
                                    attackerInfo = piece.positionOnBoard;
                                }
                                if(piece.pieceId === isKingInCheck.id){
                                    kingInfo = piece.positionOnBoard;
                                }
                            }
                        );
                        filteredMoves = canMyPieceHelp(attackerInfo, kingInfo, myPossibleMoves, isKingInCheck.attackers.length);
                                                
                        filteredMoves.forEach(
                            (move, moveIndex) => {
                                if(move === `${rankNumber}.${fileNumber}`){
                                    if(activityPhase.isPiecePinned){
                                        //we need to check if the selected move is possible for a pinned piece
                                        let isSquarePossible = canMyPieceBeHere(activityPhase.pieceId, move, currentPieceInfo, chessboardLayout, chessboardLayout.default, history);
                                        if(isSquarePossible) isSquareWithinPossible = true;
                                    }else{
                                        isSquareWithinPossible = true;
                                    }
                                }
                            }
                        );
                       }

                       if(activityPhase.pieceId === 15 || activityPhase.pieceId === 16){
                        myPossibleMoves.forEach(
                            (move, moveIndex) => {
                                if(move === `${rankNumber}.${fileNumber}`){
                                    isSquareWithinPossible = true;
                                }
                            }
                        );
                       }
                    
                    if(isSquareWithinPossible){
                        currentPieceInfo.forEach(
                            (piece, pieceIndex) => {
                                if(`${piece.positionOnBoard.rankNumber}.${piece.positionOnBoard.fileNumber}` === targetPiece){
                                    currentPieces[pieceIndex].positionOnBoard.rankNumber = rankNumber;
                                    currentPieces[pieceIndex].positionOnBoard.fileNumber = fileNumber;
                                    currentPieces[pieceIndex].noOfMoves = currentPieces[pieceIndex].noOfMoves + 1;
                                }
                            }
                        );

                            changePieceInfo({type: 'UPDATE_PIECE_POSITION', value: currentPieces});
                            // console.log("current pieces", currentPieceInfo);
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});

                            if(turn.color === 'white'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_WHITE_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }else if(turn.color === 'black'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_BLACK_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }

                            switchTurn({type: 'CHANGE_COLOR'});
                    }else{
                        chessboardSituation.forEach(
                            (rankInfo, rankIndex) => {
                                rankInfo.associatedFilesSituation.forEach(
                                    (fileInfo, fileIndex) => {
                                        if(fileInfo.pieceId === isKingInCheck.id){
                                            setColorScheme({type: 'SHOW_CHECK', targetCheckSquare: `${rankInfo.rankNumber}.${fileInfo.fileNumber}`,});
                                        }
                                    }
                                );
                            }
                        );
                    }
                }
                }

    
                //the user clicks on a square that has an opponent piece. He captures it
                if(pieceInfo.color !== turn.color && pieceInfo.id){
                    if(!isKingInCheck.status){
                        let targetPiece = activityPhase.from;
                        let currentPieces = currentPieceInfo;
                        let isSquareWithinPossible = false;
                        let allowedMove = '';

                        if(activityPhase.isPiecePinned){
                            //is the move selected here viable for a pinned piece?
                            let isSquarePossible = canMyPieceBeHere(activityPhase.pieceId, `${rankNumber}.${fileNumber}`, currentPieceInfo, chessboardLayout, chessboardLayout.default, history);
                            if(isSquarePossible) allowedMove = `${rankNumber}.${fileNumber}.X`;
                                
                        }

                        //is the square within possible moves?
                        possibleMoves.forEach(
                            (piece, pieceIndex) => {
                                if(piece.pieceId === activityPhase.pieceId){
                                    if(activityPhase.pieceId !== 15 && activityPhase.pieceId !== 16){
                                        piece.moves.forEach(
                                            (move, moveIndex) => {
                                                if(activityPhase.isPiecePinned){
                                                    if(move === allowedMove){
                                                        isSquareWithinPossible = true;
                                                    }
                                                }else{
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        isSquareWithinPossible = true;
                                                    }
                                                }
                                            }
                                        );
                                    }
                                    
                                    if(activityPhase.pieceId === 15 || activityPhase.pieceId === 16){   
                                        piece.moves.forEach(
                                            (move, moveIndex) => {
                                                if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                    isSquareWithinPossible = true;
                                                }   
                                            }
                                        );
                                    }
                                }
                            }
                        );
                        
                        
                        if(isSquareWithinPossible){
                            currentPieceInfo.forEach(
                                (piece, pieceIndex) => {
                                    if(`${piece.positionOnBoard.rankNumber}.${piece.positionOnBoard.fileNumber}` === `${rankNumber}.${fileNumber}`){
                                        currentPieces[pieceIndex].hasBeenCaptured = true;
                                    }
                                    if(`${piece.positionOnBoard.rankNumber}.${piece.positionOnBoard.fileNumber}` === targetPiece){
                                        currentPieces[pieceIndex].positionOnBoard.rankNumber = rankNumber;
                                        currentPieces[pieceIndex].positionOnBoard.fileNumber = fileNumber;
                                        currentPieces[pieceIndex].noOfMoves = currentPieces[pieceIndex].noOfMoves + 1;
                                    }
                                }
                            );

                            changePieceInfo({type: 'UPDATE_PIECE_POSITION', value: currentPieces});
                            // console.log("current pieces", currentPieceInfo);
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});

                            if(turn.color === 'white'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_WHITE_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }else if(turn.color === 'black'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_BLACK_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }

                            switchTurn({type: 'CHANGE_COLOR'});
                        }else{
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});
                        }
                    }else{
                        //the piece can only capture according to it's filtered possible moves
                        let targetPiece = activityPhase.from;
                        let currentPieces = currentPieceInfo;
                        let isSquareWithinPossible = false;
                        let filteredMoves = []
                        let myPossibleMoves;
                        let myPiece = activityPhase.pieceId;

                        possibleMoves.forEach(
                            (piece, pieceIndex) => {
                                if(piece.pieceId === myPiece){
                                    myPossibleMoves = piece.moves;
                                }
                            }
                        );
                       
                    
                       if(myPiece !== 15 && myPiece !== 16){
                        let kingInfo;
                        let attackerInfo;

                        //get the information of the king
                        //and the information of the attacker
                        currentPieceInfo.forEach(
                            (piece, pieceIndex) => {
                                if(piece.pieceId === isKingInCheck.attackers[0]){
                                    attackerInfo = piece.positionOnBoard;
                                }
                                if(piece.pieceId === isKingInCheck.id){
                                    kingInfo = piece.positionOnBoard;
                                }
                            }
                        );
                        filteredMoves = canMyPieceHelp(attackerInfo, kingInfo, myPossibleMoves, isKingInCheck.attackers.length);
                                                                        
                        filteredMoves.forEach(
                            (move, moveIndex) => {
                                if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                    if(activityPhase.isPiecePinned){
                                        //is the move selected here viable for a pinned piece?
                                        let isSquarePossible = canMyPieceBeHere(activityPhase.pieceId, `${rankNumber}.${fileNumber}`, currentPieceInfo, chessboardLayout, chessboardLayout.default, history);
                                        if(isSquarePossible) isSquareWithinPossible = true
                                            
                                    }else{
                                        isSquareWithinPossible = true;
                                    }
                                }
                            }
                        );
                       }
                       
                       if(activityPhase.pieceId === 15 || activityPhase.pieceId === 16){
                        myPossibleMoves.forEach(
                            (move, moveIndex) => {
                                if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                    isSquareWithinPossible = true;
                                }
                            }
                        );
                       }

                        if(isSquareWithinPossible){
                            currentPieceInfo.forEach(
                                (piece, pieceIndex) => {
                                    if(piece.pieceId === pieceInfo.id){
                                        currentPieces[pieceIndex].hasBeenCaptured = true;
                                    }
                                    if(`${piece.positionOnBoard.rankNumber}.${piece.positionOnBoard.fileNumber}` === targetPiece){
                                        currentPieces[pieceIndex].positionOnBoard.rankNumber = rankNumber;
                                        currentPieces[pieceIndex].positionOnBoard.fileNumber = fileNumber;
                                        currentPieces[pieceIndex].noOfMoves = currentPieces[pieceIndex].noOfMoves + 1;
                                    }
                                }
                            );

                            changePieceInfo({type: 'UPDATE_PIECE_POSITION', value: currentPieces});
                            // console.log("current pieces", currentPieceInfo);
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});

                            if(turn.color === 'white'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_WHITE_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }else if(turn.color === 'black'){
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === activityPhase.pieceId){
                                            piece.moves.forEach(
                                                (move, moveIndex) => {
                                                    if(move.substring(0,3) === `${rankNumber}.${fileNumber}`){
                                                        updateHistory({type: 'ADD_BLACK_MOVE', value: {id:activityPhase.pieceId, move}});
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }

                            switchTurn({type: 'CHANGE_COLOR'});
                        }else{
                            setActivityPhase({from: null, to: null, pieceId: null});
                            let targetCheckSquare;
                            let kingInCheck = isKingInCheck.id;
                            kingPossibleMoves.forEach(
                                (king, kingIndex) => {
                                    if(king.pieceId === kingInCheck){
                                        targetCheckSquare = `${king.positionOnBoard.rankNumber}.${king.positionOnBoard.fileNumber}`;
                                    }
                                }
                            )
                            chessboardSituation.forEach(
                                (rankInfo, rankIndex) => {
                                    rankInfo.associatedFilesSituation.forEach(
                                        (fileInfo, fileIndex) => {
                                            if(fileInfo.pieceId === isKingInCheck.id){
                                                setColorScheme({type: 'SHOW_CHECK', targetCheckSquare,});
                                            }
                                        }
                                    );
                                }
                            );
                        }
                    }
                }


                //the user clicks on a piece that is his
                if(pieceInfo.color === turn.color && pieceInfo.id){
                    
                    if(!isKingInCheck.status){
                        if(pieceInfo.id === activityPhase.pieceId){
                            setColorScheme({type: 'RETURN_TO_DEFAULT',});
                            setActivityPhase({from: null, to: null, pieceId: null});
                        }else{
                            let possibleSquares = [];
                        
                            possibleMoves.forEach(
                                (piece, pieceIndex) => {
                                    if(piece.pieceId === pieceInfo.id){
                                        possibleSquares = piece.moves;
                                    }
                                }
                            );

                            //check if the piece is pinned
                            let myPieceIsPinned = isMyPiecePinned(rankNumber, fileNumber, chessboardSituation, chessboardLayout.default, history);
                            if(myPieceIsPinned){
                                //we need to investigate every move by a pinned piece to ensure the move will not leave the king in check
                                let newPossibleSquares = [];
                                possibleSquares.forEach(
                                    (move, moveIndex) => {
                                        let isSquarePossible = canMyPieceBeHere(pieceInfo.id, move, currentPieceInfo, chessboardLayout, chessboardLayout.default, history);
                                        if(isSquarePossible){
                                            newPossibleSquares = [
                                                ...newPossibleSquares,
                                                move
                                            ]
                                        }
                                    }
                                );

                                possibleSquares = newPossibleSquares;
                                
                                setColorScheme({type: 'POSSIBLE_MOVES', targetSquare: `${rankNumber}.${fileNumber}`, possibleSquares,targetCheckSquare: null,});
                                setActivityPhase({...activityPhase, from:  `${rankNumber}.${fileNumber}`, pieceId: pieceInfo.id, isPiecePinned: true,});
                            }else{
                                setColorScheme({type: 'POSSIBLE_MOVES', targetSquare: `${rankNumber}.${fileNumber}`, possibleSquares,targetCheckSquare: null,});
                                setActivityPhase({...activityPhase, from:  `${rankNumber}.${fileNumber}`, pieceId: pieceInfo.id});
                            }
                            
                        }
                    }else{
                        if(pieceInfo.id === activityPhase.pieceId){
                            chessboardSituation.forEach(
                                (rankInfo, rankIndex) => {
                                    rankInfo.associatedFilesSituation.forEach(
                                        (fileInfo, fileIndex) => {
                                            if(fileInfo.pieceId === isKingInCheck.id){
                                                setColorScheme({type: 'SHOW_CHECK', targetCheckSquare: `${rankInfo.rankNumber}.${fileInfo.fileNumber}`,});
                                            }
                                        }
                                    );
                                }
                            );
                            setActivityPhase({from: null, to: null, pieceId: null});
                        }else{
                            //check whether the player is moving a piece of the turn's color
                            if(turn.color === pieceInfo.color){
                                let possibleSquares = []
                                //filter this piece's possible moves
                                //allow only those that can help the king get out of check
                                let myPossibleMoves;
                                possibleMoves.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === pieceInfo.id){
                                            myPossibleMoves = piece.moves;
                                        }
                                    }
                                );

                                let kingInfo;
                                let attackerInfo;
                                let myPieceIsPinned = isMyPiecePinned(rankNumber, fileNumber, chessboardSituation, chessboardLayout.default, history);

                                //get the information of the king
                                //and the information of the attacker
                                currentPieceInfo.forEach(
                                    (piece, pieceIndex) => {
                                        if(piece.pieceId === isKingInCheck.attackers[0]){
                                            attackerInfo = piece.positionOnBoard;
                                        }
                                        if(piece.pieceId === isKingInCheck.id){
                                            kingInfo = piece.positionOnBoard;
                                        }
                                    }
                                );
                            
                            if(pieceInfo.piece !== 'King'){
                                possibleSquares = canMyPieceHelp(attackerInfo, kingInfo, myPossibleMoves, isKingInCheck.attackers.length);

                                //check if the piece is pinned
                                
                                if(myPieceIsPinned){
                                    //we need to investigate every move by a pinned piece to ensure the move will not leave the king in check
                                    let newPossibleSquares = [];
                                    possibleSquares.forEach(
                                        (move, moveIndex) => {
                                            let isSquarePossible = canMyPieceBeHere(pieceInfo.id, move, currentPieceInfo, chessboardLayout, chessboardLayout.default, history);
                                            if(isSquarePossible){
                                                newPossibleSquares = [
                                                    ...newPossibleSquares,
                                                    move
                                                ]
                                            }
                                        }
                                    );

                                    possibleSquares = newPossibleSquares;
                                }
                            }else{
                                myPossibleMoves.forEach(
                                    (move, moveIndex) => {
                                        if(move.search("Cl") === -1 && move.search("Cs") === -1){
                                            possibleSquares = [
                                                ...possibleSquares,
                                                move
                                            ];
                                        }
                                    }
                                );
                            }

                                let targetCheckSquare;
                                chessboardSituation.forEach(
                                    (rankInfo, rankIndex) => {
                                        rankInfo.associatedFilesSituation.forEach(
                                            (fileInfo, fileIndex) => {
                                                if(fileInfo.pieceId === isKingInCheck.id){
                                                    targetCheckSquare = `${rankInfo.rankNumber}.${fileInfo.fileNumber}`;
                                                }
                                            }
                                        );
                                    }
                                );
            
                                if(myPieceIsPinned){
                                    setColorScheme({type: 'POSSIBLE_MOVES', targetSquare: `${rankNumber}.${fileNumber}`, possibleSquares, targetCheckSquare,});
                                    setActivityPhase({...activityPhase, from:  `${rankNumber}.${fileNumber}`, pieceId: pieceInfo.id, isPiecePinned: true,});
                                }else{
                                    setColorScheme({type: 'POSSIBLE_MOVES', targetSquare: `${rankNumber}.${fileNumber}`, possibleSquares, targetCheckSquare,});
                                    setActivityPhase({...activityPhase, from:  `${rankNumber}.${fileNumber}`, pieceId: pieceInfo.id});
                                }
                            }
                        }
                    }
                }
    
            }
            
        }
        //launchPlayerActivity is here
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
                                style={{width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
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
                                style={{width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
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
                                style={{width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
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
                                style={{width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
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
                                style={{width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
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
                                style={{width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
                                ><Rook pieceColor={color} />
                                </div>
                            );
                        }

                        return(
                            <div
                            onClick={() => launchPlayerActivity(chessboardInfo[rankIndex].rankNumber, chessboardInfo[rankIndex].associatedFiles[fileIndex].fileNumber, {id: null})}
                            className={chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass}
                            key={`${rankIndex} ${fileIndex}`}
                            style={{width: '70px', height: '70px', backgroundColor: chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'normal' ||  chessboardInfo[rankIndex].associatedFiles[fileIndex].squareClass === 'amongPossibleSquares' ? chessboardInfo[rankIndex].associatedFiles[fileIndex].color : null,}}
                            >
                            <div></div>
                            </div>
                        );

                    }
                )
            )
        }
        );

    // console.log("history", history);

    return(
        <>
        <div style={{
         width: '562px',
         height: '562px',
         display: 'flex', 
         flexFlow: 'row wrap',
         alignItems: 'flex-start',
         alignContent: 'flex-start',
         border: '1px solid #000000'
           }}>
            {
                displayBoard.map(rank => rank.map((file, index) => <React.Fragment key={index}>{file}</React.Fragment>))
            }
        </div>
        </>
    );
}

export default React.memo(Chessboard);