import React from "react";
import "./App.css";
import Auth from "./auth/Auth";
import Navigation from "./home/Navigation";
import BoardHome from "./boardDisplay/BoardHome";
import Admin from "./admin/Admin";
import { CssBaseline, Grid } from "@material-ui/core";
import { Theme, withStyles } from "@material-ui/core/styles"
import StickyFooter from "./home/Footer";
import { BrowserRouter as Router } from "react-router-dom";

const drawerWidth = 240;

const useStyles = (theme: Theme) => ({
  root: {
    display: 'inline-flex',
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
  window: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { token: "", window: window.innerWidth };
  }


  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ token: localStorage.getItem('token') })
    }
  }

  setToken = (newToken: any) => {
    localStorage.setItem('token', newToken)
    this.setState({ token: newToken })
  }


  clearToken = () => {
    localStorage.clear();
    this.setState({ token: "" })
  }

  protectedViews = () => {
    const { classes }: any = this.props;

    return this.state.token === localStorage.getItem('token')
      // && this. 
      ? (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Admin token={this.state.token} />
          {/* <BoardHome token={this.state.token} /> */}
        </main>
      ) : (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Auth setToken={this.setToken} />
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
            <Navigation token={this.state.token} window={this.state.window} clearToken={this.clearToken} />
            <Grid container
              direction="row"
              wrap="wrap"
              justify="space-evenly"
              alignItems="center">
              {this.protectedViews()}
            </Grid>
          </Router>
        </div>
        <StickyFooter />
      </div>
    );
  }
}

export default withStyles(useStyles)(App);