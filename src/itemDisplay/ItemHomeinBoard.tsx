//This is inside of the one board where all items are displayed (like workoutlog index)

import React from 'react';
import '../App.css';
import Container from '@material-ui/core/Container';
import ItemCreate from './ItemCreate';
// import ItemDisplay from './ItemDisplay';
import ItemUpdate from './ItemUpdate';

export interface ItemHomeinBoardProps {
    
}
 
export interface ItemHomeinBoardState {
    
}
 
class ItemHomeinBoard extends React.Component<ItemHomeinBoardProps, ItemHomeinBoardState> {
    constructor(props: ItemHomeinBoardProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return (<div>
            
            <Container maxWidth="sm" > 
            Display all the items here.
            <ItemCreate token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjE4ODcwMywiZXhwIjoxNjAyMjc1MTAzfQ.Y4yEAqaRbsepRjeU8oL2GZIcCc0OSzPn5jI4boK70z4"}/>
            {/* <ItemDisplay /> */}
            </Container>

        </div>  );
    }
}
 
export default ItemHomeinBoard;
