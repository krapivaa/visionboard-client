import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
// import Cloudinary from 'cloudinary-core'
import Input from '@material-ui/core/Input';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Description } from '@material-ui/icons';
import { ItemResponse } from './ItemInterface';
// import Widget from 'react-cloudinary-upload-widget';


const useStyles = (theme: Theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
});

/*//TODO
endpoint fix
cloudinary
form wrap up in modal

//DONE!
Have return object in console, but with hardcoded boardId
*/


export interface ItemCreateProps {
    token: any;
    fetchItems: any;
    boardSelected: any;
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
    //Cloudinary direct REST API upload IN THE PROCESS
    //   https://api.cloudinary.com/v1_1/verasenv/auto/upload

    // handleImageUpload = (event: { target: { files: any; }; }) => {
    //     const data = new FormData()
    //     const { files } = event.target
    //     data.append('file', files[0])
    //     data.append('upload_preset', 'visionitem')
    //     fetch('https://api.cloudinary.com/v1_1/verasenv/auto/upload', {
    //         method: 'POST',
    //         body: data,
    //     })
    //     .then((res) => res.json())
    //     .then((file) =>
    //         this.setState({
    //             image: file.secure_url,
    //         })
    //     )
    // }






    //handleSubmit and fetch
    handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        var boardId = this.props.boardSelected.id
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
                    photo: '',
                })
            })
            .then(this.props.fetchItems())
    }











    //CLOUDINARY WIDGET - WILL BE DELETED PROBABLY, does not work with typescript

    // openWidget = () => {
    //     window.cloudinary.createUploadWidget({


    // uploadWidget() {
    //     cloudinary.openUploadWidget({    
    //        cloudName: "verasenv",
    //        uploadPreset: "visionitem",
    //        sources: [
    //            "image_search",
    //            "instagram",
    //            "camera",
    //            "url",
    //            "local"
    //        ],
    //        googleApiKey: "<image_search_google_api_key>",
    //        showAdvancedOptions: true,
    //        cropping: false,
    //        multiple: true,
    //        defaultSource: "local",
    //        styles: {
    //            palette: {
    //                window: "#F5F5F5",
    //                sourceBg: "#FFFFFF",
    //                windowBorder: "#90a0b3",
    //                tabIcon: "#0094c7",
    //                inactiveTabIcon: "#69778A",
    //                menuIcons: "#0094C7",
    //                link: "#53ad9d",
    //                action: "#8F5DA5",
    //                inProgress: "#0194c7",
    //                complete: "#53ad9d",
    //                error: "#c43737",
    //                textDark: "#000000",
    //                textLight: "#FFFFFF"
    //            },
    //            fonts: {
    //                default: null,
    //                "'Poppins', sans-serif": {
    //                    url: "https://fonts.googleapis.com/css?family=Poppins",
    //                    active: true
    //                }
    //            }
    //        }
    //    },
    //     (err: any, info: any) => {
    //       if (!err) {    
    //         console.log("Upload Widget event - ", info);
    //       }
    //      }).open();
    //     };


    render() {

        const { classes }: any = this.props;

        return (<div style={{ backgroundColor: "white" }}>

            <Typography variant="h5" color="textSecondary" component="h2">
                Create your item!
            </Typography>



            {/* //Some tests */}
            {/* <p>My item name is {this.state.title}</p> */}


            <form className={classes.root} noValidate autoComplete="off">


                <Input placeholder="Title" inputProps={{ 'aria-label': 'itemTitle' }} onChange={(e) => this.setState({ itemTitle: e.target.value })} />

                <br />

                <Input placeholder="Notes" inputProps={{ 'aria-label': 'notes' }} onChange={(e) => this.setState({ notes: e.target.value })} />

                <br />

                <Input placeholder="Photo" inputProps={{ 'aria-label': 'photo' }} onChange={(e) => this.setState({ photo: e.target.value })} />




                {/* WILL BE DELETED PROBABLY, does not work with typescript          */}
                {/* <CloudinaryContext cloudName="verasenv"> */}
                {/* <div>
                        //Some tests - will be deleted
                         {/* <Image publicId="sample" width="0.5" crop="scale" /> */}

                {/* //CLOUDINARY WIDGET UPLOAD       */}
                {/* <div className="upload">
                <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                    Add Image
                </button>
              </div> */}

                {/* </CloudinaryContext> */}

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