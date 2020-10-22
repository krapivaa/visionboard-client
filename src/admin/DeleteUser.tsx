import React from 'react';
import { withStyles } from "@material-ui/core/styles"
import { Theme, createStyles } from '@material-ui/core/styles';
import { Box, Button, Modal, TextField, Typography } from '@material-ui/core';

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

export interface DeleteUserProps {
    token: any;
    userId: number
}

 
export interface DeleteUserState {
    open: boolean;
    password: string;
    isAdmin: boolean;
  }

class DeleteUser extends React.Component<DeleteUserProps, DeleteUserState> {
    constructor(props: DeleteUserProps) {
      super(props);
      this.state = { open: false, password: "", isAdmin: false };
    }
      onSubmit() {
        const urlEndpoint = `http://localhost:3000/api/user/admin/delete/${this.props.userId}`;
        const body = {
          user: {
            password: this.state.password,
            isAdmin: this.state.isAdmin
          },
        };
        let deleteUserHeaders = new Headers();
        deleteUserHeaders.append("Content-Type", "application/json");
        deleteUserHeaders.append("Authorization", this.props.token);
    
        const requestOptions = {
          method: "DELETE",
          headers: deleteUserHeaders,
        };
        fetch(urlEndpoint, requestOptions)
          .then((res: any) => res.json())
          .then((json) => {
            console.log(json);
          });
          this.handleClose()
      }

      handleClose = () => {
        this.setState({open: false})
      };

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
    <Button size="small"
          onClick={handleOpen}
          variant="contained">Delete User</Button>
    <Modal
    open={this.state.open}
    onClose={handleClose}>
        <Box
            bgcolor="background.paper"
            color="text.primary"
            p={2}
            textAlign="center"
          >
<>
    <Typography>Are you sure you want to delete?</Typography>
    {""}

    <Button size="small"
          onClick={() => this.onSubmit()}
          variant="contained">Submit</Button>
    <Button size="small"
          onClick={handleClose}
          variant="contained">Close X</Button>
</>
</Box>
    </Modal>
        </>
  );
  }
};

export default withStyles(useStyles)(DeleteUser);
