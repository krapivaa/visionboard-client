// import React from 'react';
// import { DataGrid, ColDef, RowsProp } from '@material-ui/data-grid';
// import EditUser from './EditUser';
// import DeleteUser from './DeleteUser';

// const columns: ColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   { field: 'email', headerName: 'Email', width: 130 },
//   { field: 'password', headerName: 'Password', width: 130 },
//   { field: 'isAdmin', headerName: 'isAdmin', width: 130 }
// ];

// const rows: RowsProp = [
 
// ];

// export default function DataTable() {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
//     </div>
//   );
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Checkbox, Toolbar, Typography } from '@material-ui/core';
import EditUser from './EditUser'
import DeleteUser from './DeleteUser';
import AdminCreate from './AdminCreate';

const useStyles = makeStyles({
    table: {
        width: "80.6vw",
    },
  
    toolBar: {
      backgroundColor: "grey",
      width: "80.6vw",
    },
  });

export default function AdminTable(props: any) {
    const classes = useStyles();
    const userRowMapping = () => {
        return (props.userData.map((row: any) => {
            return (
                <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            onChange={() => { props.selectUser(row) }}
                        // checked={isItemSelected}
                        // inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </TableCell>
                    <TableCell component="th" scope="row" id={row.id} >
                        {row.id}
                    </TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>******</TableCell>
                    <TableCell>{row.isAdmin ? <p>true</p>:<p>false</p>}</TableCell>
                </TableRow>
            )
        })
        )
    }
    return (
        <div>
            <Toolbar component={Paper} className={classes.toolBar}>
                <Typography>Vision Board Users</Typography>
                <AdminCreate token={props.token} fetchUsers={props.fetchUsers}/>
                <EditUser token={props.token} userId={props.userId} fetchUsers={props.fetchUsers} isAdmin={props.isAdmin}/>
                <DeleteUser token={props.token} userId={props.userId} fetchUsers={props.fetchUsers}/>
            </Toolbar>
            <TableContainer component={Paper} className={classes.table} aria-label="simple table">
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Select</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell >First Name</TableCell>
                            <TableCell >Last Name</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Password</TableCell>
                            <TableCell >isAdmin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userRowMapping()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

