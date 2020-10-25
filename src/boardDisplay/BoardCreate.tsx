//Responsibele for creating a board
import React, { Fragment } from 'react';
import '../App.css';
import { BoardResponse } from './BoardInterface';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import { Button, CardMedia,  Grid, Typography } from '@material-ui/core';
import Pin from "../assets/pushpin-147918_960_720.webp";
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = (theme: Theme) => ({

    root: {
      '& > *': {
        margin: theme.spacing(2),
        // width: '25ch',
      },
      backgroundColor: 'white',
      padding: 10,
      margin: 5,
      border: '0.5em solid chocolate',
      maxwidth: 400,
      maxheight: 500,
    },
    img: {
      width: "3em",
      height: "auto",
      display: "block",
      backgroundColor: "white",
    },
});

export interface BoardCreateProps {
  token: any
  fetchBoards: any
}

export interface BoardCreateState {
    boardTitle: string;
    description: string;
    tags: string;
    image: string;
    // sharedBoard: boolean; 
}

class BoardCreate extends React.Component<BoardCreateProps, BoardCreateState> {
 
    constructor(props: BoardCreateProps) {
        super(props);
        this.state = {  
            boardTitle: "",
            description: "",
            tags: "",
            image: ""
            // sharedBoard: false,
          };
    }

    // handleChange = (event: {target: {sharedBoard: boolean, value: boolean }}) => {
    //     this.setState({sharedBoard: event.target.value});
    //   };

      // handleChange = (event: React.ChangeEvent<{ value: any }>) => {
      //   this.setState({sharedBoard: event.target.value});
      // };

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
                    image: this.state.image,
                    // sharedBoard: this.state.sharedBoard,
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
                image: ''
                // sharedBoard: false, 
                }) 

              this.props.fetchBoards()    
        })    
    }

     handleImageUpload = (event: any) => {
      event.preventDefault();
      const data = new FormData()
      const { files } = event.target
      data.append('file', files[0])
      data.append('upload_preset', 'boardImage')
      fetch('https://api.cloudinary.com/v1_1/verasenv/auto/upload', {
          method: 'POST',
          body: data,
      })
      .then((res) => res.json())
      .then((file) =>
             { this.setState({image: file.secure_url})
            
          }
      )
  }


  render() {

    const { classes }: any = this.props;

        return ( <Fragment >  
    <Grid container spacing={0} justify="space-around" alignItems="center">

       <Grid item >            
       <form className={classes.root}>
          <CardMedia
              className={classes.img}
              component="img"
              image={Pin}
            />

        <Typography variant="h5" color="primary" component="p">
          Create your Board!
        </Typography>     
    

       <Input placeholder="Title"  value={this.state.boardTitle} inputProps={{ 'aria-label': 'boardTitle' }} onChange={(e) => this.setState({ boardTitle: e.target.value})} />
      <br />
      <Input placeholder="Description"  value={this.state.description}  inputProps={{ 'aria-label': 'description' }} onChange={(e) => this.setState({ description: e.target.value})}/>
      <br />
      <Input placeholder="Tags"  value={this.state.tags}   inputProps={{ 'aria-label': 'tags' }} onChange={(e) => this.setState({ tags: e.target.value})} />

        {/* <FormControl className={classes.formControl}> */}
        {/* <InputLabel id="boardCreate-select-label">Share with other users?</InputLabel>

        <Select
          labelId="yes-no-simple-select"
          id="yes-no select"
          value={this.state.sharedBoard}
          onChange={this.handleChange}
        > */}
        {/* <MenuItem value="">
            <em></em>
          </MenuItem> */}
        {/* value={false} */}
        {/* <MenuItem value='false'>No</MenuItem>
          <MenuItem value='true' >Yes</MenuItem>         
        </Select> */}
        {/* </FormControl> */}

        <br />
       
        <Input id="cloudinary"
                // placeholder="Upload an image"
                type="file"
                name="file"
                onChange={this.handleImageUpload}
              />
       
        <br />

        <Button onClick={(event) => this.handleSubmit(event)}
          variant="contained"
          color="primary"
          type="submit"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          >
          Save
        </Button>

  
       </form>
      </Grid> 
      </Grid>
    </Fragment>);
  }
}

export default withStyles(useStyles)(BoardCreate);
