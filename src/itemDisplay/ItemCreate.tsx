import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
// import Cloudinary from 'cloudinary-core'
import Input from '@material-ui/core/Input';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import DeleteIcon  from '@material-ui/icons/Delete';
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
            title: {
                color: "Black",
            }
        });
   
/*//TODO
endpoint fix
cloudinary
form wrap up in modal

//DONE!
Have return object in console, but with hardcoded boardId
*/


export interface ItemCreateProps {
    token: string
    
   
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
  //Cloudinary direct REST API upload
//   https://api.cloudinary.com/v1_1/verasenv/auto/upload
    




//handleSubmit and fetch
handleSubmit = (e: { preventDefault: () => void; }) => {


    //should make it dynamic `${boardId}` props.boardId? ???
    fetch("http://localhost:3000/api/item/create-new-on-board/2", {
        method: 'POST',
        body: JSON.stringify({
            item: {
                itemTitle: this.state.itemTitle, 
                notes: this.state.notes,
                photo: this.state.photo, 
            }}),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        })
    }).then((res: any) => res.json())
    .then((json: ItemResponse) => {
        console.log (json);
        this.setState ({
            itemTitle: '',
            notes: '',
            photo: '',
        })
    })
}











//CLOUDINARY WIDGET

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

 const {classes}: any = this.props; 

        return (<div style={{backgroundColor: "white"}}>
            <h4 className={classes.title}>Create your item!</h4>

            {/* //Some tests */}
            {/* <p>My item name is {this.state.title}</p> */}
          
       
         <form className={classes.root} noValidate autoComplete="off">
     

            <Input placeholder="Title" inputProps={{ 'aria-label': 'itemTitle' }} onChange={(e) => this.setState({ itemTitle: e.target.value})} />   

            <br/>

            <Input placeholder="Notes" inputProps={{ 'aria-label': 'notes' }} onChange={(e) => this.setState({ notes: e.target.value})} />   

            <br/>

            <Input placeholder="Photo" inputProps={{ 'aria-label': 'photo' }} onChange={(e) => this.setState({ photo: e.target.value})} />     
           

          
           
            
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
        
             <Button onClick={this.handleSubmit }
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