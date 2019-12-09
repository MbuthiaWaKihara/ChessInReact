import React,{
    useReducer,
} from 'react';
import Chessboard from './Chessboard';

//this is the outer app component. It manages the board page


//variable that holds the initial board layout
//the board layout will default to black player up and white player down
const initialChessboardLayout = {
    ranksPlacement: [8, 7, 6, 5, 4, 3, 2, 1],
    filesPlacement: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    fileNumbers: [1, 2, 3, 4, 5, 6, 7, 8],
    default: true,
};

//the reducer function that mutates the board layout
const exchangeChessBoardLayout = (currentLayout, action) => {
    switch(action.type){
        case 'EXCHANGE':
            let newDefault
            if(currentLayout.default){
                newDefault = false;
            }else{
                newDefault = true;
            }
            return ({
                ranksPlacement: currentLayout.ranksPlacement.reverse(),
                filesPlacement: currentLayout.filesPlacement.reverse(),
                fileNumbers: currentLayout.fileNumbers.reverse(),
                default: newDefault,
            });
        default: 
            return currentLayout;
    }
}
const App = () => 
{
    //state variable that keeps track of the board layout
    const[chessboardLayout, switchChessBoardLayout] = useReducer(exchangeChessBoardLayout, initialChessboardLayout);

    return(
     <>
        <Chessboard 
            chessboardLayout={chessboardLayout}
        />
        <button onClick={() => switchChessBoardLayout({type: 'EXCHANGE'})}>Flip Board</button>
     </>
    )
}

export default App;