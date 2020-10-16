import {  Box, Card, Button, CardMedia, Grid, Typography, CardContent, Theme } from "@material-ui/core";
import React from "react";
import {withStyles} from "@material-ui/core/styles"
import Login from "./Login";
import Signup from "./Signup";
import Pin from "../assets/pushpin-147918_960_720.webp"


const useStyles = (theme: Theme) =>({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 100,
  },
  img: {
    width: "5em",
    height: "auto",
    display: "block",
    backgroundColor: "white"
  }
});

export interface AuthProps {
  setToken: any;
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
      <Grid container spacing={4}>
        <Grid item md={1}></Grid>
        <Grid item xs={4} md={5}>
          <Box
          bgcolor="background.paper"
          color="text.primary"
          p={2}
          textAlign="center"
          >
            <Typography>Why you should use our App?</Typography>
          </Box>
        </Grid>
        <Grid item xs={4} md={3}>
        <Card >
        <CardMedia
            className={classes.img}
            component = "img"
            image={Pin}
        />
        <CardContent>
        {this.state.isLogin ? (
          <Login setToken={this.props.setToken} />
        ) : (
          <Signup setToken={this.props.setToken} />
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
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Auth);
