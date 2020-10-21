//Responsibel for editing a board
import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const useStyles = (theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

});

export interface BoardUpdateProps {

}

export interface BoardUpdateState {

}
// //DELETE board
// const deleteBoard = (board: BoardResponse) => {
//   fetch(`http://localhost:3000/api/board/${board.id}`, {
//     method: 'DELETE',
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       'Authorization': props.token
//     })
//   })
//     .then(() => props.fetchBoards())
// }



class BoardUpdate extends React.Component<BoardUpdateProps, BoardUpdateState> {
  constructor(props: BoardUpdateProps) {
    super(props);
    // this.state = { :  };
  }
  render() {

    const { classes }: any = this.props;

    return (<div>
      <Typography variant="h4" color="textSecondary" component="h4">
        I am Update!
            </Typography>
    </div>);
  }
}

export default withStyles(useStyles)(BoardUpdate);

