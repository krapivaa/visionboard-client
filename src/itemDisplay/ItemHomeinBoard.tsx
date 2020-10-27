import React from "react";
import APIURL from "../helpers/environment";
import "../App.css";
import ItemDisplay from "./ItemDisplay";
import { withStyles, Theme } from "@material-ui/core/styles";
import { ItemResponse } from "./ItemInterface";
import { Grid } from "@material-ui/core";


const useStyles = (theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

export interface ItemHomeinBoardProps {
  token: any;
  boardSelectedId: any;
}

export interface ItemHomeinBoardState {
  items: ItemResponse[];
  boardSelectedId?: any;
}

class ItemHomeinBoard extends React.Component<
  ItemHomeinBoardProps,
  ItemHomeinBoardState
  > {
  constructor(props: ItemHomeinBoardProps) {
    super(props);
    this.state = {
      items: [],
      boardSelectedId: localStorage.getItem('boardSelectedId'),
    };
  }

  componentDidUpdate(prevProps: ItemHomeinBoardProps, prevState: ItemHomeinBoardState) {
    if (this.props.boardSelectedId !== prevProps.boardSelectedId) {
      this.fetchItems(this.props.boardSelectedId);
    }
  }

  componentDidMount() {
    this.setState({ boardSelectedId: localStorage.getItem('boardSelectedId') }, () => this.fetchItems(this.props.boardSelectedId))
  }

  fetchItems = (boardId: number) => {
    boardId = this.props.boardSelectedId
    fetch(`${APIURL}/api/board/${boardId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token,
      }),
    })
      .then((res: any) => res.json())
      .then((json: ItemResponse[]) => {
        console.log("THIS IS ITEMS!: ", json);
        this.setState({
          items: json
            .sort((a, b) => b.id - a.id)
        })
      });
  };

  render() {

    const { classes }: any = this.props;

    return (

      <div>
        <Grid container>
          <ItemDisplay fetchItems={this.fetchItems} token={this.props.token} items={this.state.items} boardSelectedId={this.props.boardSelectedId} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(ItemHomeinBoard);
