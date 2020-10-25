import React from "react";
import APIURL from "../helpers/environment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export interface LoginProps {
  setToken: any;
  setIsAdmin: any;
}

export interface LoginState {
  email: string;
  password: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = { email: "", password: "" };
  }

  onSubmit() {
    const urlEndpoint = `${APIURL}/api/user/login`;
    const body: RequestBodyLogin = {
      user: {
        email: this.state.email,
        password: this.state.password,
      },
    };
    let loginHeaders = new Headers();
    loginHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: loginHeaders,
      body: JSON.stringify(body),
    };
    fetch(urlEndpoint, requestOptions)
      .then((res: any) => res.json())
      .then((json: ResponseLogin) => {
        this.props.setToken(json.sessionToken);
        this.props.setIsAdmin(json.user.isAdmin)
        console.log(json);
      });
  }

  render() {
    return (
      <form>
        <Typography>Login</Typography>
        <TextField
          id="standard-email-input"
          label="Email"
          type="email"
          autoComplete="current-password"
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
        <Button size="small" onClick={() => this.onSubmit()} variant="contained">
          {" "}
          Submit{" "}
        </Button>
      </form>
    );
  }
}

export default Login;

export interface LoginUser {
  email: string;
  password: string;
}

export interface RequestBodyLogin {
  user: LoginUser;
}

export interface ResponseLogin {
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
