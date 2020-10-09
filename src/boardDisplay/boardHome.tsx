//Example of Worklog Index - responsible for loading other board components. It is like "board landing page"
import React from 'react';
import '../App.css';
import BoardCreate from './BoardCreate';
import BoardUpdate from './BoardUpdate';
import BoardDisplay from './BoardDisplay';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';


const useStyles = (theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

});

/* //TODO:


*/


export interface BoardHomeProps {
   
}
 
export interface BoardHomeState {
    
    
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {

    heading = "Board Home";

    constructor(props: BoardHomeProps) {
        super(props);
        // this.state = {  : [] };
    }
    
    render() { 

      const {classes}: any = this.props;

        return ( <div>
            <h2 style={{ paddingLeft: "50px", color: 'darkgrey', textAlign: "center"}} >{this.heading}</h2>

      <Grid container spacing={3}>

      <Grid item xs={3} style={{ backgroundColor: '#cfe8fc' }}>
        <BoardCreate token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjE4ODcwMywiZXhwIjoxNjAyMjc1MTAzfQ.Y4yEAqaRbsepRjeU8oL2GZIcCc0OSzPn5jI4boK70z4"} />
        </Grid>
      
        <Grid item xs={9} style={{ backgroundColor: 'lightblue' }}>
        <BoardDisplay />
        </Grid>
       
      </Grid>

        </div> );
    }
}
 
export default withStyles(useStyles)(BoardHome);

/*
token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjE4ODcwMywiZXhwIjoxNjAyMjc1MTAzfQ.Y4yEAqaRbsepRjeU8oL2GZIcCc0OSzPn5jI4boK70z4"}
*/

