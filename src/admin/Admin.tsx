import React from 'react';
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
}



class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {
            userData: [],
            userId: 0,
        }
    }

    componentDidMount() {
        const fetchUsers = () => {
            fetch("http://localhost:3000/api/user/admin/view-all", {
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
        fetchUsers()
    }

    selectUser = (userId: number) => {
        this.setState({ userId: userId })
    }

    render() {
        return (
            <>
                <AdminTable selectUser={this.selectUser} userData={this.state.userData} />           
                <AdminCreate token={this.props.token} />
                <EditUser token={this.props.token}/>
                <DeleteUser token={this.props.token}/>
            </>
        );
    }
}

export default Admin;