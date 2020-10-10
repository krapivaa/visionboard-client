//Responsibel for editing a board
import React from 'react';
import '../App.css';

export interface BoardUpdateProps {
    
}
 
export interface BoardUpdateState {
    
}
 
class BoardUpdate extends React.Component<BoardUpdateProps, BoardUpdateState> {
    constructor(props: BoardUpdateProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return (<div>
            <p>I am update</p>
        </div>);
    }
}
 
export default BoardUpdate;

