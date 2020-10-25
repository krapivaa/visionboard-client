import { TextField, Button, Typography, Box, Modal, createStyles, Theme, withStyles } from '@material-ui/core';
import React from 'react';

const useStyles = (theme: Theme) =>
    createStyles({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    });

export interface AdminCreateProps {
  token: any;
  fetchUsers: any;
}

export interface AdminCreateState {
  open: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class AdminCreate extends React.Component<AdminCreateProps, AdminCreateState> {
  constructor(props: AdminCreateProps) {
    super(props);
    this.state = { open: false, firstName: "", lastName: "", email: "", password: "" };
  }

  onSubmit() {
    const urlEndpoint = "http://localhost:3000/api/user/admin/signup";
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
    adminCreateHeaders.append("Authorization", this.props.token);

    const requestOptions = {
      method: "POST",
      headers: adminCreateHeaders,
      body: JSON.stringify(body),
    };
    fetch(urlEndpoint, requestOptions)
      .then((res: any) => res.json())
      .then((json: ResponseSignup) => {
        console.log(json);
      });
      this.handleClose()
  }

  handleClose = () => {
    this.setState({open: false})
  };

  render() {
    const { classes }: any = this.props;

    const handleOpen = () => {
        this.setState({open: true})
      };
    
      const handleClose = () => {
        this.setState({open: false})
      };
    return (
      <><Button style={{ marginLeft: "10px" }} type="button" size="small"
        onClick={handleOpen}
        variant="contained">
        Add New Admin
      </Button>
        <Modal
          open={this.state.open}
          onClose={handleClose}>
          <Box
            bgcolor="background.paper"
            color="text.primary"
            p={2}
            textAlign="center"
          >
          <form>
            <Typography>Add New Admin</Typography>
            <TextField
              id="standard-firstName-input"
              label="First Name"
              type="firstName"
              autoComplete="current-firstName"
              onChange={(e) => this.setState({ firstName: e.target.value })} />
            <br />
            <TextField
              id="standard-lastName-input"
              label="Last Name"
              type="lastName"
              autoComplete="current-lastName"
              onChange={(e) => this.setState({ lastName: e.target.value })} />
            <br />
            <TextField
              id="standard-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              onChange={(e) => this.setState({ email: e.target.value })} />
            <br />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => this.setState({ password: e.target.value })} />
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
          </Box>
        </Modal>
        </>
    );
  }
}

export default withStyles(useStyles)(AdminCreate);

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
