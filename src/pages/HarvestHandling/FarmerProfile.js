import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/esm/Table';

function UserProfile() {

    const user_name = localStorage.getItem("Name")
    const user_email = localStorage.getItem("Email")
    const user_address = localStorage.getItem("Address")
    const user_contact = localStorage.getItem("ContactNo")
    const [harvest, setHarvest] = useState([]);

    const token = localStorage.getItem("Token");
    const user = localStorage.getItem("Name");

    useEffect(() => {
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        axios.get(`http://localhost:1337/api/harvest-controller/seller/${user}`, config).then((res) => {
            setHarvest(res.data.harvests);
            console.log("Harvests: ", harvest);
        }).catch((err) => {
            alert(err);
        }).then((d) => {

        })
    }, [harvest])

    return (
        <section style={{  }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem active>My Profile</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="text-muted mb-1">Active Producer</p>
                                <p className="text-muted mb-1">Name : {user_name}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn outline className="ms-1">Contact</MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user_name}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user_email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user_contact}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user_address}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Account status</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Active</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Fertilizer</span> </MDBCardText>
                                        <Table>
                                            <tr>
                                                <th>Name</th>
                                                <th>Amount</th>
                                            </tr>
                                            <tr>
                                                <td>NPK</td>
                                                <td>10Kg</td>
                                            </tr>
                                        </Table>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">My Published Harvests</span> </MDBCardText>
                                        <Table>
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Quantity</th>
                                            </tr>
                                            {harvest.map((e,id)=>(
                                                <tr key = {id}>
                                                    <td>{e.name}</td>
                                                    <td>{e.category}</td>
                                                    <td>{e.quantity}{e.measurement_unit}</td>
                                                </tr>
                                            ))
                                            }
                                        </Table>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    )
}

export default UserProfile