//Responsibel for editing a board
import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { BoardResponse } from './BoardInterface';
import BoardDisplay from './BoardDisplay';

const useStyles = (theme: Theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  
  });

export interface BoardUpdateProps {
    boardToUpdate: any;
    token: any
    fetchBoards: any 

    // updateOff: boolean
   
}
 
export interface BoardUpdateState {
    updateBoardTitle: string;
    updateDescription: string;
    updateTags: string;
    updateSharedBoard: boolean;
    boardId: number
    
}
 
class BoardUpdate extends React.Component<BoardUpdateProps, BoardUpdateState> {

    constructor(props: BoardUpdateProps) {
        super(props);
        this.state = { 
            updateBoardTitle: props.boardToUpdate.boardTitle,
            updateDescription: props.boardToUpdate.description,
            updateTags: props.boardToUpdate.tags,
            updateSharedBoard: props.boardToUpdate.sharedBoard,
            boardId: props.boardToUpdate.id
          };
          console.log(this.state)
    }


   handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();  

    fetch(`http://localhost:3000/api/board/update/${this.state.boardId}`, {
            method: 'PUT',
            body: JSON.stringify({
                //CHANGE
                board: {
                    boardTitle: this.state.updateBoardTitle, 
                    description: this.state.updateDescription,
                    tags: this.state.updateTags, 
                    sharedBoard: this.state.updateSharedBoard
                }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res: any) => {
            this.props.fetchBoards()
        })
        // .then(() => this.props.updateOff())
    }




    handleChange = (event: React.ChangeEvent<{ value: any }>) => {
        this.setState({updateSharedBoard: event.target.value});
      };





    render() { 

        const {classes}: any = this.props;

        return (<div>


             <Typography variant="h5" color="textSecondary" component="h2">
                    Update your Board!
            </Typography>


            <form className={classes.root}>

                <Input placeholder="Edit Title:" inputProps={{ 'aria-label': 'boardTitle' }} onChange={(e) => this.setState({ updateBoardTitle: e.target.value})} />
            <br />

                <Input placeholder="Edit Description:" inputProps={{ 'aria-label': 'description' }} onChange={(e) => this.setState({ updateDescription: e.target.value})}/>
            <br />

                 <Input placeholder="Edit Tags:" inputProps={{ 'aria-label': 'tags' }} onChange={(e) => this.setState({ updateTags: e.target.value})} />

            <br />
            {/* <FormControl className={classes.formControl}> */}
                    <InputLabel id="boardUpdate-select-label">Edit if you want to share:</InputLabel>
                  
                    <Select
                        labelId="yes-no-simple-select"
                        id="yes-no select"
                        value={this.state.updateSharedBoard}
                        onChange={this.handleChange}
                    >
                 <MenuItem value='false'>No</MenuItem>
                <MenuItem value='true' >Yes</MenuItem>         
                </Select>
             {/* </FormControl> */}

        <br />

                <Button onClick={(event) => this.handleSubmit(event) }
                    variant="contained"
                    color="secondary"
                    className={classes.button}>
                        Update my board
                </Button>
            </form>

        </div>);
    }
}
 
export default withStyles(useStyles)(BoardUpdate);

