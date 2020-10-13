import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export interface LoginProps {
  setToken: any;
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
    const urlEndpoint = "http://localhost:3000/api/user/login";
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
        console.log(json);
      });
  }

  render() {
    return (
      <form>
        <img
          src="https://i.dlpng.com/static/png/6545162_preview.png"
          style={{ height: "3em" }}
        />{" "}
        <h1>Login</h1>
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
        <br/>
        <br/>
        <Button size="small" onClick={() => this.onSubmit()} variant="contained">
          {" "}
          Submit{" "}
        </Button>
      </form>
    );
  }
}

export default Login;

export interface User {
  email: string;
  password: string;
}

export interface RequestBodyLogin {
  user: User;
}

export interface ResponseLogin {
  user: string;
  message: string;
  sessionToken: string;
}
