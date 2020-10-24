//worklog Table
//Responsible for mapping through all the boards and displaying them in cards
import React from 'react';
import '../App.css';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {  Button, Fab, GridList, GridListTile } from '@material-ui/core';
import { BoardResponse } from './BoardInterface';
import BoardUpdate from './BoardUpdate';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link, Route } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export interface BoardDisplayProps {
  token: any
  fetchBoards: any
  boards: BoardResponse[]
  setSelectedBoard: any
}

export interface BoardDisplayState {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 450,
      height: 500,
      padding: 15,
      margin: 10,
      
    },
    media: {
      height: 250,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      // position: 'absolute',
      width: 400,
      height: 500,
      padding: 15,
      margin: 10,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
  }),
);


export default function BoardDisplay(props: BoardDisplayProps) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [boardRow, setBoardRow] = React.useState({})


  const handleOpen = (board: BoardResponse) => {
    setBoardRow(board)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const boardsMapping = () => {
    return (props.boards.map((board: BoardResponse, index: number) => {
      var itemRouteUrl = `display-board-contents/${board.id}`
      console.log(itemRouteUrl)
      return (


        
        <GridListTile>
          <Card className={classes.root} key={index}>
            <CardActionArea>
              {board.image ?
                <CardMedia
                  className={classes.media}
                  image={board.image}
                /> :
                <CardMedia
                className={classes.media}
                image="https://www.aconsciousrethink.com/wp-content/uploads/2016/12/vision-board-wide.jpg"

                // <CloudinaryContext cloudName="verasenv">
                //   <Image publicId="vision-board_svj19q" width="0.4" crop="scale" />
                // </CloudinaryContext>
               
                />
              }
 
      <CardActions style={{ alignItems: 'center', padding: '10px' }}>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => props.setSelectedBoard(board)}
              >
                <Link to={itemRouteUrl} >View</Link>
              </Button>


               <Fab onClick={() => handleOpen(board)}
                size="small"
                type="button"
                // variant="outlined"
                color="primary"
                  >
                <EditIcon />
                {/* Update */}
              </Fab>  


              <Fab onClick={() => { deleteBoard(board) }}
                // style={{ marginLeft: '3em'}}
                size="small"
                // variant="outlined"
                color="secondary"
              // startIcon={<DeleteIcon />}
                >
                <DeleteIcon />
              </Fab>


               <Modal 
               aria-labelledby="transition-modal-title"
               aria-describedby="transition-modal-description"
               className={classes.modal}
               BackdropComponent={Backdrop}
               BackdropProps={{
                 timeout: 500,
               }}
                open={open}
                onClose={handleClose}
              > 

               <Fade in={open}> 
                 <Container className={classes.paper}> 
              

                  <BoardUpdate
                    fetchBoards={props.fetchBoards}
                    token={props.token}
                    boardToUpdate={boardRow}
                    />
                  <br />
                  <br />
                     <Fab 
                    style={{margin: '5px', alignItems: 'right'}}
                    onClick={handleClose}
                    size="small"
                   >
                    <CancelOutlinedIcon />
                      </Fab>

                </Container>
                </Fade> 
              </Modal>
            </CardActions>
            
             
              <CardContent >
                <Typography variant="h5" color="textSecondary" component="p">
                  {board.boardTitle}
                </Typography>

                <Typography variant="h6" style={{textOverflow: 'hidden'}}
                color="textSecondary" component="p">
                  {board.description}
                </Typography>

                <Typography variant="h6" color="textSecondary" component="p">
                  {board.tags}
                </Typography>
              </CardContent>
            </CardActionArea>
                      
          </Card >
        </GridListTile>
      )
    })
    )
  }
  return (
    <div>
      <GridList cellHeight={500} cols={3}>      
      {boardsMapping()}
      </GridList>
    </div>
  )
}
