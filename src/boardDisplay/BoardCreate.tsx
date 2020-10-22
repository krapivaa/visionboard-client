//Responsibele for creating a board
import React from 'react';
import '../App.css';
import { BoardResponse } from './BoardInterface';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Description } from '@material-ui/icons';

const useStyles = (theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  // formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
});

/*//TODO
USE BOARD INTERFACE
Delete/Cancel button
The form can be wrapped up in Modal

//DONE!
Have return object in console 
 */

export interface BoardCreateProps {
  token: any
  fetchBoards: any
}

export interface BoardCreateState {
  boardTitle: string;
  description: string;
  tags: string;
  sharedBoard: boolean;

}

class BoardCreate extends React.Component<BoardCreateProps, BoardCreateState> {
 
    constructor(props: BoardCreateProps) {
        super(props);
        this.state = {  
            boardTitle: "",
            description: "",
            tags: "",
            sharedBoard: false
          };
    }
//Example from Material UI
    // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setAge(event.target.value as string);
    //   };

    // handleChange = (event: {target: {sharedBoard: boolean, value: boolean }}) => {
    //     this.setState({sharedBoard: event.target.value});
    //   };

      handleChange = (event: React.ChangeEvent<{ value: any }>) => {
        this.setState({sharedBoard: event.target.value});
      };

    // handleChange = (event: { target: { value: any; }; }) => {
    //     this.setState({sharedBoard: event.target.value});
    //   };
     
      //handleSubmit and fetch
      handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        fetch("http://localhost:3000/api/board/create", {
            method: 'POST',
            body: JSON.stringify({
                board: {
                    boardTitle: this.state.boardTitle, 
                    description: this.state.description,
                    tags: this.state.tags, 
                    sharedBoard: this.state.sharedBoard
                }}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res: any) => res.json())
        .then((json: BoardResponse) => {
            console.log (json);
            this.setState ({
                boardTitle: '',
                description: '',
                tags: '',
                sharedBoard: false,
    
                }) 
        })
      
      .then(this.props.fetchBoards())

  }



  render() {

    const { classes }: any = this.props;

    return (<div>

      <Typography variant="h5" color="textSecondary" component="h2">
        Create your Board!
    </Typography>


      <form className={classes.root} noValidate autoComplete="off">
        <Input placeholder="Title" inputProps={{ 'aria-label': 'boardTitle' }} onChange={(e) => this.setState({ boardTitle: e.target.value })} />
        <br />
        <Input placeholder="Description" inputProps={{ 'aria-label': 'description' }} onChange={(e) => this.setState({ description: e.target.value })} />
        <br />
        <Input placeholder="Tags" inputProps={{ 'aria-label': 'tags' }} onChange={(e) => this.setState({ tags: e.target.value })} />


        {/* <FormControl className={classes.formControl}> */}
        <InputLabel id="boardCreate-select-label">Share with other users?</InputLabel>
        <Select
          labelId="yes-no-simple-select"
          id="yes-no select"
          value={this.state.sharedBoard}
          onChange={this.handleChange}
        >
          {/* <MenuItem value="">
            <em></em>
          </MenuItem> */}
          {/* value={false} */}
          <MenuItem value='false'>No</MenuItem>
          <MenuItem value='true' >Yes</MenuItem>
        </Select>
        {/* </FormControl> */}

        <br />

      <Button onClick={(event) => this.handleSubmit(event) }
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}>
        Submit
      </Button>

        {/* //Example of delete/cancel
      <Button outline color="secondary" type="cancel" className="buttonCancelUpdate"onClick={ () => props.toggle('1')}>Cancel</Button> */}

        {/* <Button 
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}>
        Delete
      </Button> */}


      </form>

    </div>);
  }
}

export default withStyles(useStyles)(BoardCreate);
