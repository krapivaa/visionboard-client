import React from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Theme, createStyles } from '@material-ui/core/styles';
import { Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from '@material-ui/core';

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
//   }

  
//   function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
  
//     return {
//       top: `${top}%`,
//       left: `${left}%`,
//       transform: `translate(-${top}%, -${left}%)`,
//     };
//   }

  
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

export interface EditUserProps {
    token: any;
    userId: number;
    fetchUsers: any;
    isAdmin: boolean;
  }
  
  export interface EditUserState {
    open: boolean;
    password: string;
    newIsAdmin: boolean;
  }

class EditUser extends React.Component<EditUserProps, EditUserState> {
    constructor(props: EditUserProps) {
      super(props);
      this.state = { open: false, password: "", newIsAdmin: this.props.isAdmin };
      console.log(this.props.isAdmin)
    }
      onSubmit() {
        const urlEndpoint = `http://localhost:3000/api/user/admin/edit/${this.props.userId}`;
        const body = {
          user: {
            password: this.state.password,
            isAdmin: this.state.newIsAdmin
          },
        };
        let editUserHeaders = new Headers();
        editUserHeaders.append("Content-Type", "application/json");
        editUserHeaders.append("Authorization", this.props.token);
    
        const requestOptions = {
          method: "PUT",
          headers: editUserHeaders,
          body: JSON.stringify(body)
        };
        console.log(this.props.token)
        fetch(urlEndpoint, requestOptions)
          .then((res: any) => res.json())
          .then((json) => {
            this.handleClose();
            this.props.fetchUsers();
          });
      }

      handleClose = () => {
        this.setState({open: false})
      };

      componentDidMount(){
      console.log(this.props.isAdmin)
      }

  render(){
    const { classes }: any = this.props;

    const handleOpen = () => {
        this.setState({open: true})
      };
    
      const handleClose = () => {
        this.setState({open: false})
      };
      
  return (
    <>
    <Button style={{marginRight: "10px", marginLeft: "10px"}} type="button" size="small"
          onClick={handleOpen}
          variant="contained">
            Edit User
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
        <Typography>Edit User</Typography>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        {" "}
        <FormControlLabel
        control={<Checkbox
        checked = {this.state.newIsAdmin}
          onChange={this.state.newIsAdmin ? (e) => this.setState({ newIsAdmin: false}):(e) => this.setState({ newIsAdmin: true})}/>}
        label="Admin?"
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
        </Button>
        {" "}

        <Button
          size="small"
          onClick={handleClose}
          variant="contained"
        >
          {" "}
          Close X{" "}
        </Button>{" "}
        </form>
        </Box>
        </Modal>
        </>
  );
  }
};

export default withStyles(useStyles)(EditUser);
