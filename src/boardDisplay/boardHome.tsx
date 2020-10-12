//Example of Worklog Index - responsible for loading other board components. It is like "board landing page"
import React from 'react';
import '../App.css';
import BoardCreate from './BoardCreate';
import BoardUpdate from './BoardUpdate';
import BoardDisplay from './BoardDisplay';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import ItemHomeinBoard from '../itemDisplay/ItemHomeinBoard';
import { Board } from './BoardInterface';


const useStyles = (theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

});

/* //TODO:
- Styling


*/


export interface BoardHomeProps {
  token: string
  // fetchBoards: any
   
}
 
export interface BoardHomeState {
    boards: any
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {

    heading = "Vision Board";


    constructor(props: BoardHomeProps) {
        super(props);
        this.state = { 
         boards : [] 
          };
    }

  componentDidMount() {

    const fetchBoards = () => {
      fetch('http://localhost:3000/api/board/mine', {
        method: 'GET',
        headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        })
    }).then( (res) => res.json())
    .then((board) => {
        this.state.boards(board)
     })
    }

  }
    



    render() { 

      const {classes}: any = this.props;

        return ( <div>
            <h1 style={{ paddingLeft: "50px", color: 'purple', textAlign: "center"}} >{this.heading}</h1>

      <Grid container spacing={10}>

      {/* fetchBoards ={fetchBoards}   */}

      <Grid item xs={4} >
        <BoardCreate 
        // fetchBoards ={this.state} 
        // key={index}
        token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjE4ODcwMywiZXhwIjoxNjAyMjc1MTAzfQ.Y4yEAqaRbsepRjeU8oL2GZIcCc0OSzPn5jI4boK70z4"}  />
        </Grid>
      
        <Grid item xs={8} >
        <BoardDisplay 
        // boards={boards}
        // fetchBoards ={this.state} 
        // token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjE4ODcwMywiZXhwIjoxNjAyMjc1MTAzfQ.Y4yEAqaRbsepRjeU8oL2GZIcCc0OSzPn5jI4boK70z4"} 
        
        />
        </Grid>
       
      </Grid>



{/* HERE JUST FOR TESTING */}
<br/>

      <Container maxWidth="sm" >    
        <ItemHomeinBoard />
        </Container>
{/* //END */}

        </div> );
    }
}
 
export default withStyles(useStyles)(BoardHome);

/*
token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjE4ODcwMywiZXhwIjoxNjAyMjc1MTAzfQ.Y4yEAqaRbsepRjeU8oL2GZIcCc0OSzPn5jI4boK70z4"}
*/

