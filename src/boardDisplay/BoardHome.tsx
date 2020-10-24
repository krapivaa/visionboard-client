//Example of Worklog Index - responsible for loading other board components. It is like "board landing page"
import React from "react";
import "../App.css";
import BoardCreate from "./BoardCreate";
import BoardUpdate from "./BoardUpdate";
import { Route, Switch } from "react-router-dom";
import { Theme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import { Container, Typography } from "@material-ui/core";
import { BoardResponse, Board } from "./BoardInterface";
import BoardDisplay from "./BoardDisplay";






const useStyles = (theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },



});




export interface BoardHomeProps {
  token: any;
  setBoards: any;
  setSelectedBoard: any;
}

export interface BoardHomeState {
  boards: BoardResponse[];
  updateActive: boolean;
  // boardToUpdate: BoardResponse | undefined
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {
  constructor(props: BoardHomeProps) {
    super(props);
    this.state = {
      boards: [],
      updateActive: false,
      // boardToUpdate: undefined
    };
  }

  componentDidMount() {
    this.fetchBoards();
  }


  fetchBoards = () => {
    fetch("http://localhost:3000/api/board/mine", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token,
      }),
    })
      .then((res: any) => res.json())
      .then((json: any) => {
        console.log(json)
        this.setState({ boards: json })
        console.log(this.state.boards);
        this.props.setBoards(json)
      });
  };

  render() {

    const { classes }: any = this.props;

    return (<div>

      {/* <Grid container spacing={0} justify="space-around">
        <Grid item xs={10} sm={5} md={4} lg={3}> */}


      <Grid container spacing={2} >

        <Grid item xs={4} sm={6} md={4} >

          <BoardCreate
            fetchBoards={this.fetchBoards}
            token={this.props.token} />
        </Grid>


        <Grid item xs={8} >
          <BoardDisplay
            token={this.props.token}
            fetchBoards={this.fetchBoards}
            boards={this.state.boards}
            // boardToUpdate={this.state.boardToUpdate}
            setSelectedBoard={this.props.setSelectedBoard}
          />
        </Grid>
      </Grid>
    </div>);
  }
}


export default withStyles(useStyles)(BoardHome);

