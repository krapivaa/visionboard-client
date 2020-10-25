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
  boardSelectedId: any;
}

class ItemHomeinBoard extends React.Component<
  ItemHomeinBoardProps,
  ItemHomeinBoardState
  > {
  constructor(props: ItemHomeinBoardProps) {
    super(props);
    this.state = {
      items: [],
      // boardSelectedId: JSON.parse(localStorage.getItem('boardSelectedId')) ? JSON.parse(localStorage.getItem('boardSelectedId'))
      boardSelectedId: 0,
    };
  }

  // componentDidUpdate(prevProps: ItemHomeinBoardProps) {
  //   if (this.props.boardSelected == prevProps.boardSelected)
  //     this.fetchItems();
  // }

  componentDidMount() {
    this.setState({ boardSelectedId: this.props.boardSelected.id }, () => { localStorage.setItem('boardSelectedId', JSON.stringify(this.state.boardSelectedId)) })
    this.fetchItems()
  }

  fetchItems = () => {
    // console.log(this.props.boardSelected.id)
    // this.setState({ boardSelectedId: this.props.boardSelected.id })
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
        console.log("THIS IS ITEMS!: ", json);
        this.setState({ items: json })
      });
  };

  render() {

    const { classes }: any = this.props;

    return (

      <div>
        <Grid container>
          <ItemDisplay fetchItems={this.fetchItems} token={this.props.token} items={this.state.items} boardSelectedId={this.state.boardSelectedId} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(ItemHomeinBoard);
