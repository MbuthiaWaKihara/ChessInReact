import React from 'react';
import King from './pieces/King';

const Screen = ({turn}) => {
    return(
        <>
            <div style={{
                width: '560px',
                height: '100px',
                backgroundColor: '#c3d4d9',
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