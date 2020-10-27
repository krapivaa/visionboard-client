import React from 'react';
import '../App.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { Button, Fab, Input, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { ItemResponse } from './ItemInterface';


const useStyles = (theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});


export interface ItemUpdateProps {
  itemToUpdate: ItemResponse,
  token: any,
  fetchItems: any
}

export interface ItemUpdateState {
  open: boolean,
  updateItemTitle: string;
  updateNotes: string;
}

class ItemUpdate extends React.Component<ItemUpdateProps, ItemUpdateState> {
  constructor(props: ItemUpdateProps) {
    super(props);
    this.state = {
      open: false,
      updateItemTitle: this.props.itemToUpdate.itemTitle,
      updateNotes: this.props.itemToUpdate.notes
    };
  }

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(this.props.itemToUpdate)
    fetch(`http://localhost:3000/api/item/update/${this.props.itemToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        item: {
          itemTitle: this.state.updateItemTitle,
          notes: this.state.updateNotes,
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      })
    }).then((res: any) => {
      this.props.fetchItems()
      this.handleClose()
    })
  }


  render() {
    const { classes }: any = this.props;

    return (
      <>
        <Fab color="primary" size="small" aria-label="edit" onClick={this.handleOpen}>
          <EditIcon />
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div className={classes.paper}>
              <Typography variant="h5" color="textSecondary" component="h2">
                Update Info:
                </Typography>
              <form className={classes.root} noValidate autoComplete="off">
                <Input placeholder="Title" defaultValue={this.props.itemToUpdate.itemTitle} inputProps={{ 'aria-label': 'itemTitle' }} onChange={(e) => this.setState({ updateItemTitle: e.target.value })} />
                <br />
                <Input placeholder="Notes" defaultValue={this.props.itemToUpdate.notes} inputProps={{ 'aria-label': 'notes' }} onChange={(e) => this.setState({ updateNotes: e.target.value })} />
                <br />
                <Button onClick={(e) => this.handleSubmit(e)}
                  variant="contained"
                  color="primary"
                  className={classes.button}>
                  Submit
                    </Button>
                <Button onClick={() => this.handleClose()}
                  variant="contained"
                  className={classes.button}

                >
                  Cancel
            </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </>
    );
  }
}

export default withStyles(useStyles)(ItemUpdate);