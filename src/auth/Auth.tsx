import { Box, Button, Link } from "@material-ui/core";
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

  toggle = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        position="absolute"
        top={40}
        left="70%"
        zIndex="tooltip"
      >
        <Login setToken={this.props} />
        {/* <Signup setToken={this.props}/> */}
        <Link onClick={() => this.toggle}>Don't have an account?</Link>
      </Box>
    );
  }
}

export default Auth;
