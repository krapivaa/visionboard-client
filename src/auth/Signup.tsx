import { Box, Button, Card, TextField, Typography } from "@material-ui/core";
import React from "react";

export interface SignupProps {
  setToken: any;
  setIsAdmin: any;
}

export interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean | undefined;
}

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "", isAdmin: undefined };
  }

  onSubmit() {
    const urlEndpoint = "http://localhost:3000/api/user/signup";
    const body: RequestBodySignup = {
      user: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      },
    };
    let signupHeaders = new Headers();
    signupHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: signupHeaders,
      body: JSON.stringify(body),
    };
    fetch(urlEndpoint, requestOptions)
      .then((res: any) => res.json())
      .then((json: ResponseSignup) => {
        this.props.setToken(json.sessionToken);
        this.props.setIsAdmin(json.user.isAdmin)
        console.log(json);
      });
  }

  render() {
    return (
      <form>
        <Typography>Signup</Typography>
        <TextField
          id="standard-firstName-input"
          label="First Name"
          type="firstName"
          autoComplete="current-firstName"
          onChange={(e) => this.setState({ firstName: e.target.value })}
        />
        <br />
        <TextField
          id="standard-lastName-input"
          label="Last Name"
          type="lastName"
          autoComplete="current-lastName"
          onChange={(e) => this.setState({ lastName: e.target.value })}
        />
        <br />
        <TextField
          id="standard-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <br />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <br />
        <br />
        <Button
          size="small"
          onClick={() => this.onSubmit()}
          variant="contained"
        >
          {" "}
          Submit{" "}
        </Button>{" "}
      </form>

    );
  }
}

export default Signup;

export interface SignupUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RequestBodySignup {
  user: SignupUser;
}

export interface ResponseSignup {
  user: User;
  message: string;
  sessionToken: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  colorScheme: number;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}