//Example of Worklog Index - responsible for loading other board components. It is like "board landing page"
import React from "react";
import "../App.css";
import BoardCreate from "./BoardCreate";
import { Route, Switch } from "react-router-dom";
import { Theme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
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
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {
  constructor(props: BoardHomeProps) {
    super(props);
    this.state = {
      boards: [],
      updateActive: false,
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
      .then((json: BoardResponse[]) => {
        console.log(json)
        this.setState({ boards: json.sort((a, b) => b.id - a.id) })
        console.log(this.state.boards)
        this.props.setBoards(json)
      });
  };

  render() {

    const { classes }: any = this.props;

    return (<div>

      {/* <BoardCreate
            fetchBoards={this.fetchBoards}
            token={this.props.token} />
            */}
      <BoardDisplay
        token={this.props.token}
        fetchBoards={this.fetchBoards}
        boards={this.state.boards}
        setSelectedBoard={this.props.setSelectedBoard}
      />

    </div>);
  }
}


export default withStyles(useStyles)(BoardHome);

