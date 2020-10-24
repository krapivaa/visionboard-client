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
import { Box, Button, Fab, Grid } from '@material-ui/core';
import { BoardResponse } from './BoardInterface';
import BoardUpdate from './BoardUpdate';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Link, Route } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import Input from '@material-ui/core/Input';

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
      padding: 5,
      margin: 10,
    },
    media: {
      height: 150,
    },
    paper: {
      position: 'absolute',
      width: 400,
      height: 300,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[6],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);


export default function BoardDisplay(props: BoardDisplayProps) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
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
        <Grid item xs={6}>
          <Card className={classes.root} key={index}>
            <CardActionArea>
              {board.image ?
                <CardMedia
                  className={classes.media}
                  image={board.image}
                /> :
                <CloudinaryContext cloudName="verasenv">
                  <Image publicId="vision-board_svj19q" width="0.4" crop="scale" />
                </CloudinaryContext>
              }
              <CardContent>
                <Typography variant="h4" color="textSecondary" component="p">
                  {board.boardTitle}
                </Typography>
                <Typography variant="h5" color="textSecondary" component="p">
                  {board.description}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {board.tags}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ alignItems: 'center', padding: '10px' }}>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => props.setSelectedBoard(board)}
              >
                <Link to={itemRouteUrl} >View</Link>
              </Button>
              <Fab onClick={handleOpen}
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
                //  style={modalStyle}
                className={classes.paper}
                open={open}
                onClose={handleClose}
              // aria-labelledby="simple-modal-title"
              // aria-describedby="simple-modal-description"
              >
                <Box>
                  <BoardUpdate
                    fetchBoards={props.fetchBoards}
                    token={props.token}
                    boardToUpdate={board}
                  />
                  <Button
                    onClick={handleClose}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Close
                      </Button>
                </Box>
              </Modal>
            </CardActions>
          </Card >
        </Grid >
      )
    })
    )
  }
  return (
    <div>
      {boardsMapping()}
    </div>
  )
}
