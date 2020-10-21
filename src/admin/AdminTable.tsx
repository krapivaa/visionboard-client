import React from 'react';
import { DataGrid, ColDef, RowsProp } from '@material-ui/data-grid';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'password', headerName: 'Password', width: 130 },
  { field: 'isAdmin', headerName: 'isAdmin', width: 130 }
];

const rows: RowsProp = [
 
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}