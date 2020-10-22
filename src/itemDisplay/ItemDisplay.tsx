//Responsible for mapping through all the items and displaying them 
import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { ItemResponse } from './ItemInterface';

export interface ItemDisplayProps {
  token: any,
  items: ItemResponse[],
  fetchItems: any
}

export interface ItemDisplayState {

}

class ItemDisplay extends React.Component<ItemDisplayProps, ItemDisplayState> {
  constructor(props: ItemDisplayProps) {
    super(props);
    // this.state = { :  };
    console.log("hey!!!")

  }

  render() {

    const { classes }: any = this.props;

    return (
      <div className={classes.root} >
        <GridList className={classes.gridList} cols={2.5}>
          {this.props.items.map((item) => (
            <GridListTile key={item.photo}>
              <img src={item.photo} alt={item.itemTitle} />
              <GridListTileBar
                title={item.itemTitle}
                subtitle={item.notes}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              // actionIcon={
              //   <IconButton aria-label={`star ${tile.title}`}>
              //     <StarBorderIcon className={classes.title} />
              //   </IconButton>
              // }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>);
  }
}


export default withStyles((theme: Theme) => ({
  root: {
    // '& > *': {
    //   margin: theme.spacing(1),
    // },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },

}))(ItemDisplay);
