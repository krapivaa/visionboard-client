//Example of Worklog Index - responsible for loading other board components. It is like "board landing page"
import React from "react";
import "../App.css";
import BoardCreate from "./BoardCreate";
import BoardUpdate from "./BoardUpdate";
import { Theme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container, Typography } from "@material-ui/core";
import ItemHomeinBoard from '../itemDisplay/ItemHomeinBoard';
import { BoardResponse, Board } from "./BoardInterface";
import BoardDisplay from "./BoardDisplay";

const useStyles = (theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

/* //TODO:
- Styling


*/

export interface BoardHomeProps {
  token: any;
}

export interface BoardHomeState {
  boards: BoardResponse[];
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {
 

  constructor(props: BoardHomeProps) {
    super(props);
    this.state = {
      boards: [],
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
      .then((json: BoardResponse) => {
        console.log(json)
        this.setState({boards: [json]})
        console.log(this.state.boards);
        //this.state.boards(BoardResponse)
      });
  };

  render() {
    const { classes }: any = this.props;

    return (
      <div>
<Container>
        {/* <Grid container spacing={10} > */}
         
          <Grid item xs={4} style={{ backgroundColor: 'white' }}>
            <BoardCreate
              fetchBoards={this.fetchBoards}
              token={this.props.token}
            />
          </Grid>

       <Grid item xs={4}>
            <BoardDisplay 
            token={this.props.token}
            fetchBoards={this.fetchBoards}
            boards={this.state.boards}
            />
       </Grid>

        {/* </Grid> */}
</Container>


        {/* HERE JUST FOR TESTING */}
          {/* <ItemHomeinBoard /> */}
        
         
      </div>
    );
  }
}

export default withStyles(useStyles)(BoardHome);

