import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get('http://localhost:3001/api/users').then(response => {
            setUsers(response.data?.response || []);
        }).catch(error => {
            console.log("Axios Error : ", error);
        });
    }

    const addUser = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
        }
        Axios.post('http://localhost:3001/api/create-user', payload).then(() => {
            getUsers();
            setSubmitted(false);
        }).catch(error => {
            console.log("Axios Error : ", error);
        })
    }

    const updateUser = (data) => {
        console.log('111111111111');
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
        }
        Axios.post('http://localhost:3001/api/update-user', payload).then(() => {
            getUsers();
            setSubmitted(false);
        }).catch(error => {
            console.log("Axios Error : ", error);
        })
    }

    const deleteUser = (data) => {
        Axios.post('http://localhost:3001/api/delete-user', data).then(() => {
            getUsers();
        }).catch(error => {
            console.log("Axios Error : ", error);
        })
    }

    return (
        <Box
            sx={{
                width: 'calc(100% - 100px)',
                margin: 'auto',
                marginTop: '100px'
            }}
        >
            <UserForm
                addUser={addUser}
                submitted={submitted}
                data={selectedUser}
                updateUser={updateUser}
                isEdit={isEdit}
            />
            <UsersTable rows={users}
                selectedUser={data => {
                    setSelectedUser(data);
                    setIsEdit(true);
                }}
                submitted={submitted}
                deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
            />
        </Box>

    );
}

export default Users; 