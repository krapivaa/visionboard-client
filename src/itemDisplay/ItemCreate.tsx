import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import { Button, Typography } from '@material-ui/core';
import { ItemResponse } from './ItemInterface';
// import { CloudinaryContext } from 'cloudinary-react';

const useStyles = (theme: Theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
});


export interface ItemCreateProps {
    token: any;
    fetchItems: any;
    boardSelectedId: any;
}

export interface ItemCreateState {
    //item interface
    itemTitle: string;
    notes: string;
    photo: string;
}

class ItemCreate extends React.Component<ItemCreateProps, ItemCreateState> {

    constructor(props: ItemCreateProps) {
        super(props);
        this.state = {
            itemTitle: "",
            notes: "",
            photo: "",
        };

    }
    //handleSubmit and fetch
    handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        var boardId = this.props.boardSelectedId
        fetch(`http://localhost:3000/api/item/create-new-on-board/${boardId}`, {
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
        }).then((res: any) => res.json())
            .then((json: ItemResponse) => {
                console.log(json);
                this.setState({
                    itemTitle: '',
                    notes: '',
                })
            })
            .then(this.props.fetchItems())
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
                    <Input placeholder="Title" inputProps={{ 'aria-label': 'itemTitle' }} onChange={(e) => this.setState({ itemTitle: e.target.value })} />
                    <br />
                    <Input placeholder="Notes" inputProps={{ 'aria-label': 'notes' }} onChange={(e) => this.setState({ notes: e.target.value })} />
                    <br />
                    {/* <Input placeholder="Photo" inputProps={{ 'aria-label': 'photo' }} onChange={(e) => this.setState({ photo: e.target.value })} />
                    <br /> */}
                    <Input id="cloudinary"
                        placeholder="Upload an image"
                        type="file"
                        name="file"
                        onChange={this.handleImageUpload}
                    />
                    <br />
                    <Button onClick={(e) => this.handleSubmit(e)}
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Submit
                    </Button>
                    {/* //DELETE ? CANCEl ? */}
                    {/* <Button 
             variant="contained"
             color="secondary"
             className={classes.button}
             startIcon={<DeleteIcon />}
             >
             Delete
            </Button> */}
                </form>
            </div>);
    }
}



export default withStyles(useStyles)(ItemCreate);

