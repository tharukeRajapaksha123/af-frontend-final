import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table'
import { Navigate } from 'react-router';

function AdminDash() {
    const [Farmers, setFarmers] = useState([]);
    const [ActiveFarmers, setActiveFarmers] = useState([]);
    const [Users, setUsers] = useState([]);
    const token = localStorage.getItem("Token")
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };
    useEffect(() => {
        axios.get(`http://localhost:1337/api/auth-controller/get/farmer/inActive`, config).then((res) => {
            console.log("first", res.data.farmers)
            setFarmers(res.data.inactiveFarmers)
            console.log(Farmers);

        }).catch(err => {
            alert(err)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:1337/api/auth-controller/get/farmer/Active`, config).then((res) => {
            console.log("first", res.data.farmers)
            setActiveFarmers(res.data.ActiveFarmers)
            console.log(Farmers);

        }).catch(err => {
            alert(err)
        })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:1337/api/auth-controller/get/users`, config).then((res) => {
            console.log("first", res.data.users)
            setUsers(res.data.users)
            console.log(Users);

        }).catch(err => {
            alert(err)
        })
    }, [])

    // useEffect(() => {
    //     axios.get(`http://localhost:1337/order-controller/Order/order/Approved`, config).then((res) => {
    //         // console.log("first", res.data)
    //         setapprovedOrders(res.data)
    //         console.log(pendingOrders);

    //     }).catch(err => {
    //         alert(err)
    //     })
    // }, [approvedOrders])

    const deleteRecord = (e) => {
        const id = e._id
        console.log(id);
        axios.delete(`http://localhost:1337/api/auth-controller/delete/${id}`, config).then(res => {
            alert("User Deleted !")
            Navigate(-1);
        }).catch(err => {
            alert(err);
        })
    }

    const updateDetails = (e) => {
        const id = e._id
        console.log(id);
        console.log("Update");

        axios.put(`http://localhost:1337/api/auth-controller/farmer/Activate/${id}`, config).then(res => {
            alert("User Approved !")
        })
    }

    return (
        <>
            <Container style={{ backgroundColor: 'white', width: '100%', marginTop: '20px', padding: '20px', borderRadius: '15px' }}>
                <h1 style={{ marginBottom: '1%' }}><center>

                    Admin Dashboard
                </center>
                </h1>
                
                <Button a href='/RequestedLoans'>Loan Requests</Button>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1, padding: "10px" }}>
                        <h2>Pending Farmers</h2>
                        <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                            <thead>

                                <tr>
                                    <th>Customer</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                {Farmers.map((elem, id) => (
                                    <tr key={id} style={{ textAlign: 'center', fontWeight: '400' }}>
                                        <td>{elem.name}</td>
                                        <td>{elem.role}</td>
                                        <td>{elem.email}</td>
                                        <td>
                                            <Button variant="outline-primary" onClick={() => { updateDetails(elem) }}>Approve</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    <div style={{ flex: 1, padding: "10px" }}>
                        <h2>Approved Farmers</h2>
                        <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                            <thead>

                                <tr>
                                    <th>Customer</th>
                                    <th>Role</th>
                                    <th>Email</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                    {ActiveFarmers.map((elem, id) => (
                                    <tr key={id} style={{ textAlign: 'center', fontWeight: '400' }}>
                                        <td>{elem.name}</td>
                                        <td>{elem.role}</td>
                                        <td>{elem.email}</td>
                                        <td>
                                                <Button variant="outline-danger" onClick={() => { deleteRecord(elem) }}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    </div>
                    <div style={{ flex: 1, padding: "10px" }}>
                        <h2>Users</h2>
                        <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                            <thead>

                                <tr>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                {Users.map((elem, id) => (
                                    <tr key={id} style={{ textAlign: 'center', fontWeight: '400' }}>
                                        <td>{elem.name}</td>
                                        <td>{elem.role}</td>
                                        <td>{elem.email}</td>
                                        <td>
                                            <Button variant="outline-danger" onClick={() => { deleteRecord(elem) }}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container >
        </>
    )
}


export default AdminDash