import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/esm/Table'
import { useNavigate } from 'react-router-dom';

function LoanRequests() {

    const [loans, setLoans] = useState([]);
    const [Aloans, setALoans] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("Token")
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };
    useEffect(() => {
        axios.get('http://localhost:1337/api/loan-controller/approved-loans', config)
            .then(response => {
                setALoans(response.data.loans)
                // console.log(Aloans);
            })
            .catch(error => {
                console.error(error);
            });

    }, [])


    useEffect(() => {
        axios.get(`http://localhost:1337/api/loan-controller/`, config).then((res) => {
            // console.log("first", res.data)
            setLoans(res.data.Loans)
            // console.log(loans);

        }).catch(err => {
            alert(err)
        })
    }, [])

    const ApproveLoan = (e) => {
        const id = e._id
        console.log(id);
        axios.put(`http://localhost:1337/api/loan-controller/Update/${id}`)
    }
    const DeleteLoan = (e) => {
        const id = e._id
        console.log(id);
        axios.delete(`http://localhost:1337/api/loan-controller/Delete/${id}`)
        navigate(0);
    }
    const UpdateApproveLoan = (e) => {
        const id = e._id
        console.log(id);
        axios.put(`http://localhost:1337/api/loan-controller/Update/${id}`)
    }
    const DeleteApproveLoan = (e) => {
        const id = e._id
        console.log(id);
        axios.delete(`http://localhost:1337/api/loan-controller/Delete/${id}`)
        navigate(0);
    }
    return (
        <Container style={{ backgroundColor: 'white', width: '100%', marginTop: '20px', padding: '20px', borderRadius: '15px' }}>
            <h1 style={{ marginBottom: '1%' }}><center>

                Admin Dashboard
            </center>
            </h1>

            <h2>Loan Requests</h2>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, padding: "10px" }}>
                    <h2>Pending Loans</h2>
                    <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                        <thead>

                            <tr>
                                <th>Customer</th>
                                <th>Reason</th>
                                <th>Special Notice</th>
                                <th>Amount</th>
                                <th>Time</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((elem, id) => (
                                <tr key={id} style={{ textAlign: 'center', fontWeight: '400' }}>
                                    <td>{elem.requested_by}</td>
                                    <td>{elem.reason}</td>
                                    <td>{elem.special_notice}</td>
                                    <td>Rs.{elem.amount}</td>
                                    <td>{elem.time}</td>
                                    <td>
                                        <Button variant="outline-primary" onClick={() => { ApproveLoan(elem) }}>Approve</Button>
                                        <Button variant="outline-danger" onClick={() => { DeleteLoan(elem) }} style={{ marginLeft: "10px" }}>Reject</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <div style={{ padding: "10px" }}>
                <h2>Approved Loans</h2>
                <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                    <thead>

                        <tr>
                            <th>Customer</th>
                            <th>Reason</th>
                            <th>Special Notice</th>
                            <th>Amount</th>
                            <th>Time</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Aloans.map((elem, id) => (
                            <tr key={id} style={{ textAlign: 'center', fontWeight: '400' }}>
                                <td>{elem.requested_by}</td>
                                <td>{elem.reason}</td>
                                <td>{elem.special_notice}</td>
                                <td>Rs.{elem.amount}</td>
                                <td>{elem.time}</td>
                                <td>
                                    <Button variant="outline-danger" onClick={() => { DeleteApproveLoan(elem) }} style={{ marginLeft: "10px" }}>Reject</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container >
    )
}

export default LoanRequests