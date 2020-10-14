import { Box, Link, Button, CardMedia, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";

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
          <Box
            bgcolor="background.paper"
            color="text.primary"
            p={2}
            // width="22em"
            // position="fixed"
            textAlign="center"
            // top={235}
            // left="70%"
            // zIndex="tooltip"
          >
            {/* <CardMedia>
          <img src="../"/>
        </CardMedia> */}
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
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default Auth;
