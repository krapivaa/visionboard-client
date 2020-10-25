import React from "react";
import APIURL from "../helpers/environment";
import "../App.css";
import { Theme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { BoardResponse } from "./BoardInterface";
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
  boardToUpdate: object
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {
  constructor(props: BoardHomeProps) {
    super(props);
    this.state = {
      boards: [],
      updateActive: false,
      boardToUpdate: {}
    };
  }

  componentDidMount() {
    this.fetchBoards();
  }


  fetchBoards = () => {
    fetch(`${APIURL}/api/board/mine`, {
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

