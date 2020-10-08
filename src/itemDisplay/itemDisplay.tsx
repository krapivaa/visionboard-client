//worklog Table

//Responsible for mapping through all the items and displaying them 

import React from 'react';
import '../App.css';

export interface ItemDisplayProps {
    
}
 
export interface ItemDisplayState {
    
}
 
class ItemDisplay extends React.Component<ItemDisplayProps, ItemDisplayState> {
    constructor(props: ItemDisplayProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return (<div>
            <p style={{color: "Darkgreen"}}>ItemDisplay</p>
        </div>  );
    }
}
 
export default ItemDisplay;