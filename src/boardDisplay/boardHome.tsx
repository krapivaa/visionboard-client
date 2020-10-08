//Example of Worklog Index - responsible for loading other board components. It is like "board landing page"
import React from 'react';
import '../App.css';
import BoardCreate from './BoardCreate';
import BoardUpdate from './BoardUpdate';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import BoardDisplay from './BoardDisplay';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



// const useStyles = makeStyles((theme: Theme) =>
// createStyles({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     width: 500,
//     height: 450,
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: 'translateZ(0)',
//   },
//   titleBar: {
//     background:
//       'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
//       'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
//   icon: {
//     color: 'white',
//   },
// }),
// );

/* //TODO:
1.Getteing started with Workouts
- fetch board function with state

*/


export interface BoardHomeProps {
   
}
 
export interface BoardHomeState {
    
    
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {

    heading = "Board Home";

    constructor(props: BoardHomeProps) {
        super(props);
        // this.state = {  : [] };
    }
    
    render() { 
        return ( <div>
            <h2 style={{ paddingLeft: "50px", color: 'darkgrey', textAlign: "center"}} >{this.heading}</h2>

      <Grid container spacing={3}>

      <Grid item xs={3} style={{ backgroundColor: '#cfe8fc' }}>
        <BoardCreate token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjE4ODcwMywiZXhwIjoxNjAyMjc1MTAzfQ.Y4yEAqaRbsepRjeU8oL2GZIcCc0OSzPn5jI4boK70z4"} />
        </Grid>
      
        <Grid item xs={9} style={{ backgroundColor: 'lightblue' }}>
        <BoardDisplay />
        </Grid>
       
      </Grid>



{/* 
//Material UI Advanced Grid List
            <div className="BoardRoot">
      
      <GridList cellHeight={200} spacing={1} className="BoardGridList">

        {BoardDisplay.map((board) => (
          
          <GridListTile key={board.img} cols={board.featured ? 2 : 1} rows={board.featured ? 2 : 1}>
            <img src={board.img} alt={board.title} />

            <GridListTileBar
              title={board.title}
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`star ${board.title}`} className="BoardIcon">
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className="BoardTitleBar"
            />

          </GridListTile>
        ))}
      </GridList>
    </div> */}


        </div> );
    }
}
 
export default BoardHome;

/*
token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjE4ODcwMywiZXhwIjoxNjAyMjc1MTAzfQ.Y4yEAqaRbsepRjeU8oL2GZIcCc0OSzPn5jI4boK70z4"}
*/

