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
  boardSelected: {};
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { token: "", isAdmin: undefined, boards: [], boardSelected: {} };
  }

//comment
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

  setSelectedBoard = (board: BoardResponse) => {
    this.setState({ boardSelected: board })
  }

  protectedViews = () => {
    const { classes }: any = this.props;

    return this.state.token === localStorage.getItem('token')
      && this.state.isAdmin ? (

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Admin token={this.state.token} />
        </main>
      ) : this.state.token === localStorage.getItem('token')
        ? (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {/* <Router> */}
            <div>
              <Switch>
                <Route exact path="/home">
                  <BoardHome token={this.state.token} setBoards={this.setBoards} setSelectedBoard={this.setSelectedBoard} />
                </Route>
                <Route path="/display-board-contents">
                  <ItemHomeinBoard token={this.state.token} boardSelected={this.state.boardSelected} />
                </Route>
              </Switch>
            </div>
            {/* </Router> */}
          </main>
        ) : (
          <main>
            <div className={classes.toolbar} />
            {/* <Grid container spacing={0} justify="space-around"> */}
            <Auth setToken={this.setToken} setIsAdmin={this.setIsAdmin} />
            {/* </Grid> */}
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
            <Navigation token={this.state.token} isAdmin={this.state.isAdmin} clearToken={this.clearToken} boards={this.state.boards} setSelectedBoard={this.setSelectedBoard} />
            {this.protectedViews()}
          </Router>
        </div>
        <StickyFooter />
      </div>
    );
  }
}

export default withStyles(useStyles)(App);