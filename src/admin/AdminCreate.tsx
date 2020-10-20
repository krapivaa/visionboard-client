import { TextField, Button, Typography } from '@material-ui/core';
import React from 'react';

export interface AdminCreateProps {
  token: any;
}

export interface AdminCreateState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class AdminCreate extends React.Component<AdminCreateProps, AdminCreateState> {
  constructor(props: AdminCreateProps) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "" };
  }

  onSubmit() {
    const urlEndpoint = "http://localhost:3000/api/admin/signup";
    const body: RequestBodySignup = {
      user: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      },
    };
    let adminCreateHeaders = new Headers();
    adminCreateHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: adminCreateHeaders,
      body: JSON.stringify(body),
    };
    fetch(urlEndpoint, requestOptions)
      .then((res: any) => res.json())
      .then((json: ResponseSignup) => {
        this.props.token(json.sessionToken);
        console.log(json);
      });
  }

  render() {
    return (
      <form>
        <Typography>Add New Admin</Typography>
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

export default AdminCreate;

export interface AdminUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RequestBodySignup {
  user: AdminUser;
}

export interface ResponseSignup {
  user: string;
  message: string;
  sessionToken: string;
}
