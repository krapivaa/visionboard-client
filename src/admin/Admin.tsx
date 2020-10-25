import React from 'react';
import APIURL from '../helpers/environment';
import AdminCreate from './AdminCreate';
import { UserResponse } from './AdminInterface';
import EditUser from './EditUser';
import AdminTable from './AdminTable';
import DeleteUser from './DeleteUser';


export interface AdminProps {
    token: any
}

export interface AdminState {
    userData: UserResponse[],
    userId: number
    isAdmin: boolean | undefined
}



class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {
            userData: [],
            userId: 0,
            isAdmin: false
        }
    }

    componentDidMount() {
    
        this.fetchUsers()
    }
    fetchUsers = () => {
        fetch(`${APIURL}/api/user/admin/view-all`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token
            })
        })
            .then((res: any) => res.json())
            .then((userData) => {
                console.log(userData)
                this.setState({ userData: userData })
                console.log(this.state.userData)
            })
    }
    selectUser = (row: UserResponse) => {
        console.log(row)
        this.setState({ userId: row.id, isAdmin: row.isAdmin })
    }

    render() {
        return (
            <>
                <AdminTable selectUser={this.selectUser} userData={this.state.userData} userId={this.state.userId} token={this.props.token} fetchUsers={this.fetchUsers} isAdmin={this.state.isAdmin}/>           
            </>
        );
    }
}

export default Admin;