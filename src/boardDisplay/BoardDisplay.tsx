//worklog Table
//Responsible for mapping through all the boards and displaying them in cards
import React from 'react';
import '../App.css';
import ItemHomeinBoard from '../itemDisplay/ItemHomeinBoard';
import BoardCreate from './BoardCreate';
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
import BoardUpdate from './BoardUpdate';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



export interface BoardDisplayProps {
    token: any
    fetchBoards: any
    boards: BoardResponse
  }
  
  export interface BoardDisplayState {

    // boards: BoardResponse
    // boardToUpdate: object
    // open: boolean
  
  }


  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        
        maxWidth: 450,
        padding: 5,
        margin: 10,
      },
      media: {
        height: 150,
      },
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[6],
        padding: theme.spacing(2, 4, 3),
    },
  }),
);


export default function BoardDisplay(props: any) {

    const classes = useStyles();
    // const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // const body = (
    //   <div style={modalStyle} className={classes.paper}>
    //     <h2 id="simple-modal-title">Text in a modal</h2>
    //     <p id="simple-modal-description">
    //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //     </p>
    //     <SimpleModal />
    //   </div>
    // );


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
    console.log("hello")
    return (props.boards !== undefined || props.boards !== null ? props.boards.map((board: BoardResponse, index: number) => {
   
   return ( 

        <Grid item xs={6}>
          <Card className={classes.root} key={index}>


      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://thumbs.dreamstime.com/b/dream-big-set-goals-take-action-words-letter-motivational-business-typography-quotes-concept-142734995.jpg"
        />

              <CardContent>


         <Typography variant="h3" color="textSecondary" component="p">
           {board.boardTitle}
          </Typography>

          <Typography variant="h4" color="textSecondary" component="p">
           {board.description}
          </Typography>

          <Typography variant="h6" color="textSecondary" component="p">
           {board.tags}
          </Typography>

              </CardContent>

            </CardActionArea>


            {/* <CardActions> */}

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
         size="small" 
        variant="outlined"
        color="secondary" 
          >
          Delete 
        </Button>



        <Button onClick={handleOpen}
        size="small" 
        type="button"
        variant="outlined"
        color="secondary" 
        >
        Update
       </Button>
     
     
      <Modal 
      //  style={modalStyle}
       className={classes.paper}
        open={open}
        onClose={handleClose}
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
      >
       
      
        
         <BoardUpdate
              fetchBoards={props.fetchBoards}
              token={props.token} 
              boardToUpdate={board}
              // updateOff={this.state.updateOff}
              />

        </Modal>


      </CardActions>
    </Card>



            {/* <BoardUpdate
              fetchBoards={props.fetchBoards}
              token={props.token} 
              boardToUpdate={board}
              // updateOff={this.state.updateOff}
              /> */}



   </Grid>
       );
    })
    :<></>
    )}
 
   return (
    <div>
      {boardsMapping()}    
   </div>
   )
 }

  
 
