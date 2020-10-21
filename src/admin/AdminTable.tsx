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
// import EditUser from './EditUser'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
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
                            onChange={() => { props.selectUser(row.id) }}
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
                    <TableCell>{row.password}</TableCell>
                    <TableCell>{row.isAdmin}</TableCell>
                </TableRow>
            )
        })
        )
    }
    return (
        <div>
            <Toolbar>
                <Typography>Vision Board Users</Typography>
                {/* <EditUser /> */}
                <Button>Delete</Button>
            </Toolbar>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Select</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell >First Name</TableCell>
                            <TableCell >Last Name</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Password</TableCell>
                            <TableCell >Admin?</TableCell>
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

