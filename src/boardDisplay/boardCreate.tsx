//Responsibele for creating a board
import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { withStyles } from "@material-ui/core/styles";
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import DeleteIcon  from '@material-ui/icons/Delete';

const useStyles = (theme: Theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  });

/*//TODO
passing probs 
protected view
 */

export interface BoardCreateProps {
 
}
 
export interface BoardCreateState {
    // boardInfo: any;
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
        this.setState(event.target.value);
      };
     
      //handleSubmit and fetch
      



    render() { 

    const {classes}: any = this.props;

        return ( <div style={{ backgroundColor: 'white' }}>  
            <h5>Create your Board!</h5>
            
    <form className={classes.root} noValidate autoComplete="off">
     <Input placeholder="Title" inputProps={{ 'aria-label': 'boardTitle' }} onChange={(e) => this.setState({ boardTitle: e.target.value})} />

      <Input placeholder="Description" inputProps={{ 'aria-label': 'description' }} onChange={(e) => this.setState({ description: e.target.value})}/>

      <Input placeholder="Tags" inputProps={{ 'aria-label': 'tags' }} onChange={(e) => this.setState({ tags: e.target.value})} />

    {/* Material UI Select */}
      {/* <FormControl className={classes.formControl}> */}
        <InputLabel id="boardCreate-select-label">Share with other users?</InputLabel>
        <Select
          labelId="yes-no-simple-select"
          id="yes-no select"
          value={this.state.sharedBoard}
          onChange={this.handleChange}
        >
            {/* value={false} */}
          <MenuItem>No</MenuItem>
          <MenuItem>Yes</MenuItem>         
        </Select>
      {/* </FormControl> */}
<br />

      <Button onClick={() => alert (this.state.boardTitle) }
        variant="contained"
        color="primary"
        className={classes.button}
       
      >
        Submit
      </Button>

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>


    </form>

        </div> );
    }
}
 
export default withStyles(useStyles)(BoardCreate);