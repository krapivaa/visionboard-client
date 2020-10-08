//worklog Table

//Responsible for mapping through all the boards and displaying them in cards
import React from 'react';
import '../App.css';
import Container from '@material-ui/core/Container';
import ItemHomeinBoard from '../itemDisplay/ItemHomeinBoard';

export interface BoardDisplayProps {
    
}
 
export interface BoardDisplayState {
    
}
 
class BoardDisplay extends React.Component<BoardDisplayProps, BoardDisplayState> {
    constructor(props: BoardDisplayProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return ( <div style={{ backgroundColor: 'white'  }}>
            <h5 >All my boards:</h5> 

        <Container maxWidth="sm" style={{ backgroundColor: '#cfe8fc' }} > 
       My board:<br />     
        <ItemHomeinBoard />
  
        </Container>


        </div>);
    }
}
 
export default BoardDisplay;