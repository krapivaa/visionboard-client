import React  from 'react';
import '../App.css';

export interface ItemUpdateProps {
    
}
 
export interface ItemUpdateState {
    
}
 
class ItemUpdate extends React.Component<ItemUpdateProps, ItemUpdateState> {
    constructor(props: ItemUpdateProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return (<div>
            I am ItemUpdate
        </div> );
    }
}
 
export default ItemUpdate;