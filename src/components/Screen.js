import React from 'react';
import King from './pieces/King';

const Screen = ({turn}) => {
    return(
        <>
            <div style={{
                width: '560px',
                height: '100px',
                backgroundColor: '#cecfba',
                border: '1px solid black',
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