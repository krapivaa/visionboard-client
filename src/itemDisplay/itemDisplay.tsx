//worklog Table

//Responsible for mapping through all the items and displaying them 
import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme: Theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },

  });


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

        const {classes}: any = this.props;

        return (<div>
            <h4 style={{color: "Darkblue"}}>ItemDisplay</h4>
        </div>  );
    }
}
 
export default withStyles(useStyles)(ItemDisplay);