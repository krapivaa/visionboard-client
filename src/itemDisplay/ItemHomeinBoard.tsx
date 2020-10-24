import React from "react";
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

  fetchItems = () => {
    console.log(this.props.boardSelected.id)
    fetch(`http://localhost:3000/api/board/${this.props.boardSelected.id}`, {
      // fetch(`http://localhost:3000/api/board/1`, {

      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token,
      }),
    })
      .then((res: any) => res.json())
      .then((json: ItemResponse[]) => {
        console.log(json);
        this.setState({ items: json })
      });
  };

  render() {

    const { classes }: any = this.props;

    return (

      <div>
        <Grid container>
          <ItemDisplay fetchItems={this.fetchItems} token={this.props.token} items={this.state.items} boardSelected={this.props.boardSelected} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(ItemHomeinBoard);
