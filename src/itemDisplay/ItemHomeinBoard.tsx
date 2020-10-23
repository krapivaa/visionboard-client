//This is inside of the one board where all items are displayed (like workoutlog index)

import React from "react";
import "../App.css";
import Container from "@material-ui/core/Container";
import ItemCreate from "./ItemCreate";
import ItemUpdate from "./ItemUpdate";
import ItemDisplay from "./ItemDisplay";
import { withStyles, Theme } from "@material-ui/core/styles";
import { ItemResponse } from "./ItemInterface";
import { BoardResponse } from "../boardDisplay/BoardInterface";



const useStyles = (theme: Theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

export interface ItemHomeinBoardProps {
  token: any;
  boardSelected: any;
}

export interface ItemHomeinBoardState {
  items: ItemResponse[];
}

class ItemHomeinBoard extends React.Component<
  ItemHomeinBoardProps,
  ItemHomeinBoardState
  > {
  constructor(props: ItemHomeinBoardProps) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.fetchItems();
  }
  // `http://localhost:3000/api/board/${board.id}` does not work  :(

  fetchItems = () => {
    var boardId = this.props.boardSelected.id
    console.log(boardId)
    fetch(`http://localhost:3000/api/board/${boardId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token,
      }),
    })
      .then((res: any) => res.json())
      .then((json: ItemResponse) => {
        console.log(json);

      });
  };



  render() {

    const { classes }: any = this.props;

    return (

      <div>
        <ItemCreate
          fetchItems={this.fetchItems}
          token={this.props.token}
          boardSelected={this.props.boardSelected}
        />
        <ItemDisplay fetchItems={this.fetchItems} token={this.props.token} items={this.state.items} />
      </div>
    );
  }
}

export default withStyles(useStyles)(ItemHomeinBoard);
