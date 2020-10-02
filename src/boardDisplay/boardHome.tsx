//Worklog Index
import React from 'react';

export interface BoardHomeProps {
    
}
 
export interface BoardHomeState {
    
}
 
class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {
    constructor(props: BoardHomeProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return ( <div>
            <h2>Hello from Board!</h2>
        </div> );
    }
}
 
export default BoardHome;