import React from 'react';
import APIURL from '../helpers/environment';
import { withStyles } from "@material-ui/core/styles"
import { Theme, createStyles } from '@material-ui/core/styles';
import { Button, Fab, Fade, Modal, Typography } from '@material-ui/core';
import { ItemResponse } from './ItemInterface';
import DeleteIcon from '@material-ui/icons/Delete';



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

export interface DeleteItemProps {
    token: any,
    fetchItems: any
    itemToDelete: ItemResponse
}

export interface DeleteItemState {
    open: boolean
}

class DeleteItem extends React.Component<DeleteItemProps, DeleteItemState> {
    constructor(props: DeleteItemProps) {
        super(props);
        this.state = { open: false };
    }

    deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        fetch(`${APIURL}/api/item/delete/${this.props.itemToDelete.id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": 'application/json',
                "Authorization": this.props.token
            })
        })
            .then((res: any) => this.props.fetchItems())
        this.handleClose()
    }

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    render() {
        const { classes }: any = this.props;

        return (
            <>
                <Fab
                    onClick={this.handleOpen}
                    size="small"
                    color="secondary"
                >
                    <DeleteIcon />
                </Fab>
                <Modal
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <Fade in={this.state.open}>
                        <div className={classes.paper}>
                            <Typography>Are you sure you want to delete this item?</Typography>
                            {""}
                            <Button size="small"
                                onClick={(e) => this.deleteItem(e)}
                                variant="contained">Submit</Button>
                            <Button size="small"
                                onClick={this.handleClose}
                                variant="contained">Close X</Button>
                        </div>
                    </Fade>
                </Modal>
            </>
        )
    }
}

export default withStyles(useStyles)(DeleteItem)