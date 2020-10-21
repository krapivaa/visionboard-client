import React from 'react';
import AdminCreate from './AdminCreate';
import EditUser from './EditUser';
import AdminTable from './AdminTable';
import DeleteUser from './DeleteUser';

export interface AdminProps {
    token: any
}
 
export interface AdminState {
    user: UserResponse
}

export interface UserResponse {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    colorScheme?: number;
    isAdmin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
 
class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = { user: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        } };
    }

    componentDidMount(){
        const fetchUsers = () => {
            fetch("http://localhost:3000/api/user/admin/view-all", {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.token
                })
            })
            .then( (res: any) => res.json())
            .then((userData) => {console.log(userData)})
        }
        fetchUsers()
    }

    render() { 
        return ( 
            <>
            
                <AdminCreate token={this.props.token} />
                <AdminTable />
                <EditUser token={this.props.token}/>
                <DeleteUser token={this.props.token}/>
            </>
         );
    }
}
 
export default Admin;