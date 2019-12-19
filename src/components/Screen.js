import React from 'react';
import King from './pieces/King';

const Screen = ({turn, screenContent}) => {
    return(
        <>
            <div style={{
                width: '562px',
                height: '100px',
                backgroundColor: '#f0fcfc',
                borderTop: '1px solid #000000',
                borderLeft: '1px solid #000000',
                borderRight: '1px solid #000000',
                display: 'flex',
                flexFlow: 'row wrap',
                // borderRadius:'10px 10px 0px 0px'
            }}>
                {
                    turn.color === 'white' ?
                    <King pieceColor={turn.color}/>:
                    <King pieceColor={turn.color}/>
                }
                 <div>
                    <div style={{
                        color: '#ff0000',
                        fontSize: '2em',
                        fontWeight: 'bolder',
                    }}>
                        {screenContent.message}
                    </div>
                    <div style={{
                         color: '#ff0000',
                         fontSize: '2em',
                         fontWeight: 'bolder',
                    }}>
                        {screenContent.verdict}
                    </div>
                </div>
            </div>
           
        </>
    );
}

export default React.memo(Screen);