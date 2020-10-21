//worklog Table
//Responsible for mapping through all the boards and displaying them in cards
import React from 'react';
import '../App.css';
import ItemHomeinBoard from '../itemDisplay/ItemHomeinBoard';
import BoardCreate from './BoardCreate';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { BoardResponse } from './BoardInterface';
import { makeStyles } from '@material-ui/core/styles';
import BoardUpdate from './BoardUpdate';




export interface BoardDisplayProps {
    token: any
    fetchBoards: any
  }
  
  export interface BoardDisplayState {
    boards: BoardResponse
    boardToUpdate: object
  
  }




const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

 /*
 We are mapping through our props.boards array.   props.boards is a reference to the boards we pulled from our back-end.  These were objects containing individual board data.  Our callback function, with params 'board' and 'index' is defined according to the callback function of all .map methods: 'board' will represent every board object in our props.boards array each time the map loop runs, while 'index' is the index number of that boardobject in the boards array.
 .map() needs a return for every element in the array we map over.  Without a return, .map() won't build a new array.
 */


 const BoardDisplay = (props:any) => {

    const classes = useStyles();

  //DELETE board
  const deleteBoard = (board: BoardResponse) => {
    fetch(`http://localhost:3000/api/board/delete/${board.id}`, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    })
    .then(() => props.fetchBoards())
}

  

//mapping through
  const boardsMapping =() => {
{/* {this.state.boards.map((board: BoardResponse, index:number) =>(<p key={index}>{board}</p>))} */}
    return props.boards.map((board: BoardResponse, index: number) => {
   
   return ( 

<Grid item xs={6}>
    <Card className={classes.root} key={index}>

      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.mysticbutterfly.co.uk/wp-content/uploads/2018/04/AdobeStock_75917970.jpeg"
        //   title={board.boardTitle}
        />

        <CardContent>

         <Typography variant="body2" color="textSecondary" component="p">
           {board.boardTitle}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
           {board.description}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
           {board.tags}
          </Typography>

          {/* <Typography variant="body2" color="textSecondary" component="p">
           {board.sharedBoard}
          </Typography> */}

        </CardContent>

      </CardActionArea>
      

      {/* <CardActions> */}
          {/* Shared? goes here */}
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        
        {/* //Go inside the board goes here */}
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}

{/* {updateActive ? */}
            {/* <BoardUpdate
              fetchBoards={props.fetchBoards}
              token={props.token} 
              boardToUpdate={props.boardToUpdate}
              // updateOff={this.state.updateOff}
              /> */}
        {/* : <></> */}
        {/* </CardActions> */}

        <CardActions>
        <Button onClick={() => {deleteBoard(board)}} 
        //  size="small" 
        variant="contained"
        color="secondary" 
          >
          Delete
        </Button>
      </CardActions>
    </Card>
            <BoardUpdate
              fetchBoards={props.fetchBoards}
              token={props.token} 
              boardToUpdate={props.boardToUpdate}
              // updateOff={this.state.updateOff}
              />
   </Grid>
       );
    })
  }
 
   return (
    <div style={{ backgroundColor: 'white'}}>
      {boardsMapping()}    
   </div>
   )
 }

  
 export default BoardDisplay;




      


         