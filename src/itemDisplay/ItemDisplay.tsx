// Make gridlist responsive


import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { Fab, Fade, GridList, GridListTile, GridListTileBar, Modal, Typography } from '@material-ui/core';
import { ItemResponse } from './ItemInterface';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import CloseIcon from '@material-ui/icons/Close';
import ItemCreate from './ItemCreate';
import ItemUpdate from './ItemUpdate';
import DeleteItem from './ItemDelete';

export interface ItemDisplayProps {
  token: any,
  items: ItemResponse[],
  fetchItems: any,
  boardSelectedId: any,
}

export interface ItemDisplayState {
  boardSelectedId: number
  open: boolean
}

class ItemDisplay extends React.Component<ItemDisplayProps, ItemDisplayState> {
  constructor(props: ItemDisplayProps) {
    super(props);
    this.state = { boardSelectedId: 0, open: false };
  }

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  // zoomView = (item: any) => {
  //   return (
  //     <div>
  //       <Fab
  //         onClick={this.handleOpen}
  //         size="small"
  //         style={{ backgroundColor: "rgba(229,229,229,0.7)" }}
  //       >
  //         <ZoomInIcon />
  //       </Fab>
  //       <Modal
  //         // className={classes.modal}
  //         open={this.state.open}
  //         onClose={this.handleClose}>
  //         <Fade in={this.state.open} style={{ alignContent: "center" }}>
  //           <div>
  //             <div>
  //               <img
  //                 src={item.photo}
  //                 alt={item.itemTitle}
  //                 style={{ height: "75vh", width: "auto" }}
  //               />
  //             </div>
  //             <div>
  //               <Typography variant="h5" >{item.itemTitle}</Typography>
  //               <br />
  //               <Typography variant="body1">{item.notes}</Typography>
  //             </div>
  //             <div style={{ display: "inline" }} >
  //               <ItemUpdate token={this.props.token} fetchItems={this.props.fetchItems} itemToUpdate={item} />
  //               <Fab
  //                 size="small"
  //                 onClick={this.handleClose}>
  //                 <CloseIcon />
  //               </Fab>
  //               <DeleteItem token={this.props.token} fetchItems={this.props.fetchItems} itemToDelete={item} />
  //             </div>
  //           </div>
  //         </Fade>
  //       </Modal>
  //     </div>
  //   )
  // }

  render() {
    const { classes }: any = this.props;

    return (
      <div className={classes.root} >
        <GridList className={classes.gridList} cellHeight={250} cols={4}>
          <GridListTile>
            <ItemCreate token={this.props.token} boardSelectedId={this.props.boardSelectedId} fetchItems={this.props.fetchItems} />
          </GridListTile>
          {this.props.items.map((item) => (
            item.photo ? (
              <GridListTile key={item.id}>
                <img
                  src={item.photo}
                  alt={item.itemTitle} />
                <GridListTileBar
                  actionIcon={
                    <div>
                      <Fab
                        onClick={this.handleOpen}
                        size="small"
                        style={{ backgroundColor: "rgba(229,229,229,0.7)" }}
                      >
                        <ZoomInIcon />
                      </Fab>
                      <Modal
                        className={classes.modal}
                        open={this.state.open}
                        onClose={this.handleClose}>
                        <Fade in={this.state.open} >
                          <div className={classes.paper}>
                            <div>
                              <img
                                src={item.photo}
                                alt={item.itemTitle}
                                style={{ height: "75vh", width: "auto" }}
                              />
                            </div>
                            <div>
                              <Typography variant="h5" >{item.itemTitle}</Typography>
                              <br />
                              <Typography variant="body1">{item.notes}</Typography>
                            </div>
                            <div >
                              <ItemUpdate token={this.props.token} fetchItems={this.props.fetchItems} itemToUpdate={item} />
                              <Fab
                                size="small"
                                onClick={this.handleClose}>
                                <CloseIcon />
                              </Fab>
                              <DeleteItem token={this.props.token} fetchItems={this.props.fetchItems} itemToDelete={item} />
                            </div>
                          </div>
                        </Fade>
                      </Modal>
                    </div>}
                  actionPosition="right"
                  title={item.itemTitle}
                  titlePosition="bottom"
                  subtitle={item.notes}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>) : (
                <GridListTile style={{ backgroundColor: "white", padding: "1em" }} key={item.id}>
                  <Typography variant="h5">{item.itemTitle}</Typography>
                  <Typography variant="body1">{item.notes}</Typography>
                  <GridListTileBar
                    actionIcon={
                      <div>
                        <Fab
                          onClick={this.handleOpen}
                          size="small"
                          style={{ backgroundColor: "rgba(229,229,229,0.7)" }}
                        >
                          <ZoomInIcon />
                        </Fab>
                        <Modal
                          className={classes.modal}
                          open={this.state.open}
                          onClose={this.handleClose}>
                          <Fade in={this.state.open} >
                            <div className={classes.paper}>
                              <div>
                                <img
                                  src={item.photo}
                                  alt={item.itemTitle}
                                  style={{ height: "75vh", width: "auto" }}
                                />
                              </div>
                              <div>
                                <Typography variant="h5" >{item.itemTitle}</Typography>
                                <br />
                                <Typography variant="body1">{item.notes}</Typography>
                              </div>
                              <div >
                                <ItemUpdate token={this.props.token} fetchItems={this.props.fetchItems} itemToUpdate={item} />
                                <Fab
                                  size="small"
                                  onClick={this.handleClose}>
                                  <CloseIcon />
                                </Fab>
                                <DeleteItem token={this.props.token} fetchItems={this.props.fetchItems} itemToDelete={item} />
                              </div>
                            </div>
                          </Fade>
                        </Modal>
                      </div>
                    }
                    actionPosition="right"
                    titlePosition="bottom"
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                  />
                </GridListTile>
              )
          ))}
        </GridList>
      </div >);
  }
}


export default withStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    minWidth: 850,
    // width: 500,
    // height: "auto",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: "white"
  },
  titleBar: {
    color: "white",
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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

}))(ItemDisplay);
