import React from 'react';
import King from './pieces/King';

const Screen = ({turn}) => {
    return(
        <>
            <div style={{
                width: '562px',
                height: '100px',
                backgroundColor: '#f0fcfc',
                borderTop: '1px solid #000000',
                borderLeft: '1px solid #000000',
                borderRight: '1px solid #000000',
                // borderRadius:'10px 10px 0px 0px'
            }}>
                {
                    turn.color === 'white' ?
                    <King pieceColor={turn.color}/>:
                    <King pieceColor={turn.color}/>
                }
            </div>
        </>
    );
}

export default Screen;