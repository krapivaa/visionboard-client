//Responsibel for editing a board
import React from 'react';
import APIURL from '../helpers/environment';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { Button, Input, Typography } from '@material-ui/core';




const useStyles = (theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
       width: '40ch',
       
    },
  },
  

});

export interface BoardUpdateProps {
    boardToUpdate: any
    token: any
    fetchBoards: any 
   
}

export interface BoardUpdateState {

    updateBoardTitle: string;
    updateDescription: string;
    updateTags: string;
    updateImage: string
    // updateSharedBoard: boolean;
    // boardId: number   
}

class BoardUpdate extends React.Component<BoardUpdateProps, BoardUpdateState> {

    constructor(props: BoardUpdateProps) {
        super(props);
        this.state = { 
            updateBoardTitle: props.boardToUpdate.boardTitle,
            updateDescription: props.boardToUpdate.description,
            updateTags: props.boardToUpdate.tags,
            updateImage: props.boardToUpdate.image
            // updateSharedBoard: props.boardToUpdate.sharedBoard,
            // boardId: props.boardToUpdate.id        
          };
          console.log(this.state)
    }


   handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();  
    // console.log(this.props.boardToUpdate)
    fetch(`${APIURL}/api/board/update/${this.props.boardToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                board: {
                    boardTitle: this.state.updateBoardTitle, 
                    description: this.state.updateDescription,
                    tags: this.state.updateTags, 
                    image: this.state.updateImage
                    // sharedBoard: this.state.updateSharedBoard
                }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res: any) => {
            this.props.fetchBoards()
            
        })
    }

    
    // handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    //     this.setState({updateSharedBoard: event.target.value});
    //   };


    render() { 

    const { classes }: any = this.props;

        return (<div>

             <Typography variant="h5" color="primary" component="h2">
                    Update your Board!
            </Typography>


            <form className={classes.root} >

                <Input placeholder="Edit Title:"  defaultValue={this.state.updateBoardTitle} inputProps={{ 'aria-label': 'boardTitle' }} onChange={(e) => this.setState({ updateBoardTitle: e.target.value})} />
            <br />

                <Input placeholder="Edit Description:" defaultValue={this.state.updateDescription}  inputProps={{ 'aria-label': 'description' }} onChange={(e) => this.setState({ updateDescription: e.target.value})}/>
            <br />

                 <Input placeholder="Edit Tags:" defaultValue={this.state.updateTags}  inputProps={{ 'aria-label': 'tags' }} onChange={(e) => this.setState({ updateTags: e.target.value})} />

            <br />
            {/* <FormControl className={classes.formControl}> */}
                    {/* <InputLabel id="boardUpdate-select-label">Edit if you want to share:</InputLabel>
                  
                    <Select
                        labelId="yes-no-simple-select"
                        id="yes-no select"
                        value={this.state.updateSharedBoard}
                        onChange={this.handleChange}
                    >
                 <MenuItem value='false'>No</MenuItem>
                <MenuItem value='true' >Yes</MenuItem>         
                </Select> */}
             {/* </FormControl> */}

             <Input placeholder="Edit Image:" defaultValue={this.state.updateImage}  inputProps={{ 'aria-label': 'image' }} onChange={(e) => this.setState({ updateImage: e.target.value})} />

        <br />
        
                <Button 
                onClick={(e) => this.handleSubmit(e) }
                    variant="contained"
                    color="primary"
                   
                    className={classes.button}>
                        Send to update 
                </Button>
      
            </form>
        </div>);
    }
}

export default withStyles(useStyles)(BoardUpdate);

