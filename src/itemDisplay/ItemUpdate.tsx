import React  from 'react';
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

        const {classes}: any = this.props;

        return (<div>
           
        </div> );
    }
}
 
export default withStyles(useStyles)(ItemUpdate);