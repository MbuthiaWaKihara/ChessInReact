import React from 'react';

import Queen from './pieces/Queen';
import Rook from './pieces/Rook';
import Bishop from './pieces/Bishop';
import Knight from './pieces/Knight';
import '../styles/boardStyles.css';


const PromoteOptions = ({displayStatus, pieceColor, selectPromotionPiece}) => {
    // console.log("display status", displayStatus);
    // console.log("piece color", pieceColor);
    return(
        <div 
        className="promotionContainer"
        style={{
            display: displayStatus,
        }}
        >
            <div 
            className="promotionSquare"
            onClick={() => selectPromotionPiece('Queen')}
            ><Queen pieceColor={pieceColor}/></div>
            <div 
            className="promotionSquare"
            onClick={() => selectPromotionPiece('Rook')}
            ><Rook pieceColor={pieceColor}/></div>
            <div 
            className="promotionSquare"
            onClick={() => selectPromotionPiece('Bishop')}
            ><Bishop pieceColor={pieceColor}/></div>
            <div 
            className="promotionSquare"
            onClick={() => selectPromotionPiece('Knight')}
            ><Knight pieceColor={pieceColor}/></div>
        </div>
    );
}

export default React.memo(PromoteOptions);