import React from 'react';
import APIURL from '../helpers/environment';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import { Button, Typography, Switch } from '@material-ui/core';
import { ItemResponse } from './ItemInterface';

const useStyles = (theme: Theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(1),
        }
    },
});


export interface ItemCreateProps {
    token: any;
    fetchItems: any;
    boardSelectedId: any;
}

export interface ItemCreateState {
    itemTitle: string;
    notes: string;
    photo: string;
    uploadSwitch: boolean;
}

class ItemCreate extends React.Component<ItemCreateProps, ItemCreateState> {

    constructor(props: ItemCreateProps) {
        super(props);
        this.state = {
            itemTitle: "",
            notes: "",
            photo: "",
            uploadSwitch: false
        };

    }

    setUploadSwitch = () => {
        this.setState({ uploadSwitch: !this.state.uploadSwitch })
    }

    handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        var boardId = this.props.boardSelectedId
        fetch(`${APIURL}/api/item/create-new-on-board/${boardId}`, {
            method: 'POST',
            body: JSON.stringify({
                item: {
                    itemTitle: this.state.itemTitle,
                    notes: this.state.notes,
                    photo: this.state.photo,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res: any) => res.json())
            .then((json: ItemResponse) => {
                console.log(json);
                this.setState({
                    itemTitle: '',
                    notes: '',
                    photo: '',
                })
                this.props.fetchItems(boardId)
            })
    }

    handleImageUpload = (event: any) => {
        const data = new FormData()
        const { files } = event.target
        data.append('file', files[0])
        data.append('upload_preset', 'visionitem')
        fetch('https://api.cloudinary.com/v1_1/verasenv/auto/upload', {
            method: 'POST',
            body: data,
        })
            .then((res) => res.json())
            .then((file) => {
                this.setState({ photo: file.secure_url })
            }
            )
    }


    render() {
        const { classes }: any = this.props;
        return (
            <div style={{ backgroundColor: "white", padding: ".7em 0em .6em 0em" }}>
                <Typography variant="h6" color="textSecondary" component="h2">
                    Add New Inspiration!
                </Typography>
                <form className={classes.root} noValidate autoComplete="off" style={{ padding: "0em .2em 0em .2em" }} >
                    <Input placeholder="Title" value={this.state.itemTitle} inputProps={{ 'aria-label': 'itemTitle' }} onChange={(e) => this.setState({ itemTitle: e.target.value })} />
                    <br />
                    <Input placeholder="Notes" value={this.state.notes} inputProps={{ 'aria-label': 'notes' }} onChange={(e) => this.setState({ notes: e.target.value })} />
                    <br />
                    <p>
                        <Switch
                            checked={this.state.uploadSwitch}
                            onChange={() => this.setUploadSwitch()}
                            color="primary"
                        />
                    Upload?
                    </p>
                    {!this.state.uploadSwitch ? (
                        <>
                            <Input placeholder="Photo URL" value={this.state.photo} inputProps={{ 'aria-label': 'photo' }} onChange={(e) => this.setState({ photo: e.target.value })} />
                        </>
                    ) : (
                            <>
                                <Input id="cloudinary"
                                    placeholder="Upload an image"
                                    type="file"
                                    name="file"
                                    onChange={this.handleImageUpload}
                                    style={{ width: '25ch' }}
                                />
                            </>
                        )}
                    <br />
                    <Button onClick={(e) => this.handleSubmit(e)}
                        style={{ maxWidth: '50px' }}
                        size='small'
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </form>
            </div>);
    }
}



export default withStyles(useStyles)(ItemCreate);

