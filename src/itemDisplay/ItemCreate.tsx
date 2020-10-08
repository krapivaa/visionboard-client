import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
// import cloudinary from 'cloudinary';


const useStyles = (theme: Theme) => ({
      
            root: {
                '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
                        }
                    },
            title: {
                color: "Blue",
            }
        });
   

export interface ItemCreateProps {
    // className?:string;
    // classes:any;
    
   
}
 
export interface ItemCreateState {
    //item interface
    //title: string; etc

    
}


 
class ItemCreate extends React.Component<ItemCreateProps, ItemCreateState> {
   
    constructor(props: ItemCreateProps) {
        super(props);
        // this.state = { photo : "", title: "Herb"  };
       
    }
    
   //Some tetst: 
//fetching
// onSubmit( ){
//     const endpointURL = `http://localhost...`;
//     const body: ItemResponse = {
//         title: {
//             title: this.state.title
//         }
//     }
// }


//CLOUDINARY WIDGET

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
//      });
//     }


    render() { 
 const {classes}: any = this.props; 

        return (<div>
            <p className={classes.title}>ItemCreate</p>

            {/* //Some tests */}
        {/* <p>My item name is {this.state.title}</p> */}
            {/* <button onClick={() => this.onSubmit()}>Click</button>
            // <input type="text" onChange={(e) => this.setState({title: e.target.value})} /> */}
            
     
            <form className={classes.root}>
            <TextField id="itemCreate-title" label="Title" variant="standard"
            
            />
            </form>

            <form className={classes.root}>    
            <TextField id="itemCreate-notes" label="Notes" variant="standard"
            
            />
            </form>

             
            <form  className={classes.root}>  
            <TextField id="itemCreate-photo" label="Photo" variant="standard"

            />
           
            
             <CloudinaryContext cloudName="verasenv">
    {/* <div>
    //Some tests - will be deleted
        {/* <Image publicId="sample" width="0.5" crop="scale" /> */}
          
{/* //CLOUDINARY WIDGET UPLOAD       */}
            {/* <div className="upload">
                <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                    Add Image
                </button>
            </div> */}

        </CloudinaryContext>

            </form>

        </div>);
    }
}

 
export default withStyles(useStyles)(ItemCreate);