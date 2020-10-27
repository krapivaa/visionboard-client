import React from "react";
import "./App.css";
import Auth from "./auth/Auth";
import Navigation from "./home/Navigation";
import BoardHome from "./boardDisplay/BoardHome";
import Admin from "./admin/Admin";
import { CssBaseline, Grid } from "@material-ui/core";
import { Theme, withStyles } from "@material-ui/core/styles"
import StickyFooter from "./home/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BoardResponse } from "./boardDisplay/BoardInterface";
import ItemHomeinBoard from "./itemDisplay/ItemHomeinBoard";

const drawerWidth = 240;

const useStyles = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    width: "100%",
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: "0",
  }
});

export interface AppProps { }

export interface AppState {
  token: any;
  isAdmin: boolean | undefined;
  boards: BoardResponse[];
  boardSelectedId: any;
  window: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { token: "", isAdmin: undefined, boards: [], boardSelectedId: "", window: window.innerWidth };
  }


  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ token: localStorage.getItem('token') })
    }
  }

  setIsAdmin = (newIsAdmin: any) => {
    this.setState({ isAdmin: newIsAdmin })
    console.log("ADMIN??: ", this.state.isAdmin)
  }

  setToken = (newToken: any) => {
    localStorage.setItem('token', newToken)
    this.setState({ token: newToken })
  }


  clearToken = () => {
    localStorage.clear();
    this.setState({ token: "" })
  }

  setBoards = (boardList: any) => {
    this.setState({ boards: boardList })
    console.log("THIS IS BOARDS LIST!:", this.state.boards)
  }

  setSelectedBoardId = (newBoardId: any) => {
    this.state.boardSelectedId !== localStorage.getItem('boardSelectedId') ?
      this.setState({ boardSelectedId: newBoardId },
        () => {
          localStorage.setItem('boardSelectedId',
            this.state.boardSelectedId)
        }) : this.setState({ boardSelectedId: localStorage.getItem('boardSelectedId') })
  }

  clearSelectedBoardId = () => {
    localStorage.setItem('boardSelectedId', "")
    this.setState({ boardSelectedId: "" })
  }

  protectedViews = () => {
    const { classes }: any = this.props;

    return this.state.token === localStorage.getItem('token')
      && this.state.isAdmin ? (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* <Route exact path="/admin"> */}
          <Admin token={this.state.token} />
          {/* </Route> */}
        </main>
      ) : this.state.token === localStorage.getItem('token')
        ? (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>
              <Switch>
                <Route exact path="/home">
                  <BoardHome token={this.state.token} setBoards={this.setBoards} setSelectedBoardId={this.setSelectedBoardId} />
                </Route>
                <Route path="/display-board-contents">
                  <ItemHomeinBoard token={this.state.token} boardSelectedId={this.state.boardSelectedId} />
                </Route>
              </Switch>
            </div>
          </main>
        ) : (
          <main>
            <div className={classes.toolbar} />
            {/* <Route exact path="/" > */}
            <Auth setToken={this.setToken} setIsAdmin={this.setIsAdmin} />
            {/* </Route> */}
          </main>
        )
  }

  render() {
    const { classes }: any = this.props;

    return (
      <div>
        <div className="App">
          <CssBaseline />
          <Router>
            <Navigation token={this.state.token} isAdmin={this.state.isAdmin} clearToken={this.clearToken} boards={this.state.boards} setSelectedBoardId={this.setSelectedBoardId} />
            {this.protectedViews()}
          </Router>
        </div>
        <StickyFooter />
      </div>
    );
  }
}

export default withStyles(useStyles)(App);