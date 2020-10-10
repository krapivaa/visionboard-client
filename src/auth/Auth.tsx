import { Box, Link, Button } from "@material-ui/core";
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
      <Box
        bgcolor="background.paper"
        color="text.primary"
        p={2}
        width="22em"
        position="absolute"
        paddingLeft="6em"
        paddingTop="3em"
        paddingBottom="3em"
        top={235}
        left="70%"
        zIndex="tooltip"
      >
        {this.state.isLogin ? (
          <Login setToken={this.props.setToken} />
        ) : (
          <Signup setToken={this.props.setToken} />
        )}
        <Button onClick={(event) => this.toggle(event)}>
          {this.state.isLogin ? "Don't Have an Account?" : "Cancel"}
        </Button>
      </Box>
    );
  }
}

export default Auth;
