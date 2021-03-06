import React from 'react';
import '../App.css';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline, Fab, Fade, GridList, GridListTile, GridListTileBar, Modal, Typography } from '@material-ui/core';
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
  boardSelectedId: any,
  openPhoto: boolean,
  openText: boolean,
  selectedItem: any,
}

class ItemDisplay extends React.Component<ItemDisplayProps, ItemDisplayState> {
  constructor(props: ItemDisplayProps) {
    super(props);
    this.state = { boardSelectedId: localStorage.getItem('boardSelectedId'), openText: false, openPhoto: false, selectedItem: {} }
  }

  handleOpenPhoto = (item: ItemResponse) => {
    this.setState({ selectedItem: item })
    this.setState({ openPhoto: true })
  };

  handleOpenTextOnly = (item: ItemResponse) => {
    this.setState({ selectedItem: item })
    this.setState({ openText: true })
  };

  handleClosePhoto = () => {
    this.setState({ openPhoto: false })
  };

  handleCloseText = () => {
    this.setState({ openText: false })
  };

  render() {
    const { classes }: any = this.props;

    return (
      <div className={classes.root} >
        <CssBaseline />
        <GridList className={classes.gridList} cellHeight={300}>
          <GridListTile cols={1} style={{ height: 'auto', minWidth: '300px', border: '0.4em solid #5D88D2', backgroundColor: 'white' }} >
            <ItemCreate token={this.props.token} boardSelectedId={this.props.boardSelectedId} fetchItems={this.props.fetchItems} />
          </GridListTile>
          {this.props.items.map((item: ItemResponse, index: number) => (
            item.photo === "" ?
              (<GridListTile style={{ backgroundColor: "white", padding: "1em" }} key={item.id}>
                <Typography variant="body1">{item.notes}</Typography>
                <GridListTileBar
                  actionIcon={
                    <div>
                      <Fab
                        onClick={() => this.handleOpenTextOnly(item)}
                        size="small"
                        style={{ backgroundColor: "rgba(229,229,229,0.7)" }}
                      >
                        <ZoomInIcon />
                      </Fab>
                      <Modal
                        className={classes.modal}
                        open={this.state.openText}
                        onClose={this.handleCloseText}>
                        <Fade in={this.state.openText} >
                          <div className={classes.paper}>
                            <Typography variant="h5" >{item.itemTitle}</Typography>
                            <br />
                            <Typography variant="body1">{item.notes}</Typography>
                            <br />
                            <span style={{ display: 'inline' }}>
                              <ItemUpdate token={this.props.token} fetchItems={this.props.fetchItems} itemToUpdate={item} />
                              <br />
                              <DeleteItem token={this.props.token} fetchItems={this.props.fetchItems} itemToDelete={item} />
                              <br />
                              <>
                                <Fab
                                  size="small"
                                  onClick={this.handleCloseText}>
                                  <CloseIcon />
                                </Fab>
                              </>
                            </span>
                          </div>
                        </Fade>
                      </Modal>
                    </div>
                  }
                  actionPosition="right"
                  title={item.itemTitle}
                  titlePosition="bottom"
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
              ) : (
                <GridListTile key={index} cols={1}>
                  <img
                    src={item.photo}
                    alt={item.itemTitle} />
                  <GridListTileBar
                    actionIcon={
                      <div>
                        <Fab
                          onClick={() => this.handleOpenPhoto(item)}
                          size="small"
                          style={{ backgroundColor: "rgba(229,229,229,0.7)" }}
                        >
                          <ZoomInIcon />
                        </Fab>
                        <Modal
                          className={classes.modal}
                          open={this.state.openPhoto}
                          onClose={this.handleClosePhoto}>
                          <Fade in={this.state.openPhoto} >
                            <div className={classes.paper}>
                              <div>
                                <img
                                  src={this.state.selectedItem.photo}
                                  alt={this.state.selectedItem.itemTitle}
                                  style={{ height: "75vh", width: "auto" }}
                                />
                              </div>
                              <div>
                                <Typography variant="h5" >{this.state.selectedItem.itemTitle}</Typography>
                                <br />
                                <Typography variant="body1">{this.state.selectedItem.notes}</Typography>
                              </div>
                              <span >
                                <ItemUpdate token={this.props.token} fetchItems={this.props.fetchItems} itemToUpdate={this.state.selectedItem} />
                                <Fab
                                  size="small"
                                  onClick={this.handleClosePhoto}>
                                  <CloseIcon />
                                </Fab>
                                <DeleteItem token={this.props.token} fetchItems={this.props.fetchItems} itemToDelete={this.state.selectedItem} />
                              </span>
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
                </GridListTile>)
          ))}
        </GridList>
      </div >);
  }
}

export default withStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    gridList: {

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
      justifyContent: 'space-around',
      textAlign: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)(ItemDisplay);


// withWidth()
