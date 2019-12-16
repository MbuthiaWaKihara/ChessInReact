import React from 'react';

import Queen from './pieces/Queen';
import Rook from './pieces/Rook';
import Bishop from './pieces/Bishop';
import Knight from './pieces/Knight';
import '../styles/boardStyles.css';


const PromoteOptions = () => {
    return(
        <div 
        className="promotionContainer"
        style={{
            display: 'none',
        }}
        >
            <div 
            className="promotionSquare"
            ><Queen pieceColor="black"/></div>
            <div 
            className="promotionSquare"
            ><Rook pieceColor="black"/></div>
            <div 
            className="promotionSquare"
            ><Bishop pieceColor="black"/></div>
            <div 
            className="promotionSquare"
            ><Knight pieceColor="black"/></div>
        </div>
    );
}

export default PromoteOptions;