//This is inside of the one board where all items are displayed (like workoutlog index)

import React from "react";
import "../App.css";
import Container from "@material-ui/core/Container";
import ItemCreate from "./ItemCreate";
import ItemUpdate from "./ItemUpdate";
import ItemDisplay from "./ItemDisplay";

export interface ItemHomeinBoardProps {}

export interface ItemHomeinBoardProps {}

export interface ItemHomeinBoardState {}

class ItemHomeinBoard extends React.Component<
  ItemHomeinBoardProps,
  ItemHomeinBoardState
> {
  constructor(props: ItemHomeinBoardProps) {
    super(props);
    // this.state = { :  };
  }
  render() {
    return (
      <div>
        <Container maxWidth="sm">
          <ItemCreate
            token={
              ""
            }
          />

          <ItemDisplay />
        </Container>
      </div>
    );
  }
}

export default ItemHomeinBoard;
