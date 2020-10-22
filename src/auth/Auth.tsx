import { Box, Card, Button, CardMedia, Grid, Typography, CardContent, Theme } from "@material-ui/core";
import React from "react";
import { withStyles } from "@material-ui/core/styles"
import Login from "./Login";
import Signup from "./Signup";
import Pin from "../assets/pushpin-147918_960_720.webp"
import Collage from "../assets/VisionBoardInspo.png"


const useStyles = (theme: Theme) => ({
  root: {
    maxWidth: "80%",
  },
  card: {
    [theme.breakpoints.up("sm")]: {
      width: "30%",
      height: "auto"
    },
    width: "auto"
  },
  img: {
    width: "5em",
    height: "auto",
    display: "block",
    backgroundColor: "white",

    marginLeft: "20em"
  },
  collage: {
    width: "auto",
    height: "75vh"
  }
});

export interface AuthProps {
  setToken: any;
  setIsAdmin: any;
}

export interface AuthState {
  isLogin: boolean;
}

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = { isLogin: true };
  }

  toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.state.isLogin) {
      this.setState({ isLogin: false });
    } else {
      this.setState({ isLogin: true });
    }
    console.log(this.state.isLogin);
  };

  render() {
    const { classes }: any = this.props;

    return (
      <div
      // className={classes.root}
      >
        <Grid

          item className={classes.card}
        >
          <Card >
            <CardMedia
              className={classes.img}
              component="img"
              image={Pin}
            />
            <CardContent>
              {this.state.isLogin ? (
                <Login setToken={this.props.setToken} setIsAdmin={this.props.setIsAdmin} />
              ) : (
                  <Signup setToken={this.props.setToken} setIsAdmin={this.props.setIsAdmin} />
                )}
              <Button
                onClick={(event) => this.toggle(event)}
                style={{ marginTop: ".5em" }}
              >
                {this.state.isLogin ? "Don't Have an Account?" : "Cancel"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
        >
          {/* <Box
            // bgcolor="background.paper"
            width="50%"
            color="text.primary"
            p={2}
            textAlign="center"
          > */}
            <Typography>Why you should use our App?</Typography>
            <img src={Collage} alt="Vision Board Intro Page Collage" className={classes.collage} />
          {/* </Box> */}
        </Grid>
        
      </div>
    );
  }
}

export default withStyles(useStyles)(Auth);