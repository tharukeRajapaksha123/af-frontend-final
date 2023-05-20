import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Farmer from "../../Images/farmer.jpg";
import agri from '../../Images/agrii.jpg'

function Register() {

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [address, setaddress] = useState();
  const [contact_number, setcontact_number] = useState();
  const [password, setpassword] = useState();
  const [role, setrole] = useState("User");
  const Navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      address,
      contact_number,
      password,
      role
    }
    console.log(data);

    axios.post(`http://localhost:1337/api/auth-controller/register`, data).then(res => {
      if (res.status === 201) {
        const data = { "email": email, "password": password }
        axios.post(`http://localhost:1337/api/auth-controller/login`, data)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data);
            localStorage.setItem('uid', res.data.user._id);
            localStorage.setItem('Role', res.data.user.role);
            localStorage.setItem('Name', res.data.user.name);
            localStorage.setItem('Email', res.data.user.email);
            localStorage.setItem('Token', res.data.token);
          })
          .catch((err) => {
            console.log(err);
            alert("UserName or Password incorrect");
          });
      } else {
        alert("Register Failed");
      }
      Navigate("/");
    }).catch(e => {
      alert(e)
    })

  }

  return (
    <Container
      fluid
      style={{
        marginTop: "5%",
        display: "block",
        width: "65%",
        justifyContent: "center",
        backgroundColor: 'white',
        marginBottom: '5%',
        borderRadius: '10px'
      }}
    >
      <center style={{ marginBottom: "30px" }}>
      </center>
      <Row>
        <Col>
          <div style={{ borderRadius: "10px", padding: "10px", /* background: 'linear-gradient(to bottom, #e5f9db 0%, #66ff99 100%)' */ }}>
            <center>
              <img src={agri} height='auto' width='100%' style={{ marginTop: '12px', borderRadius: '10px' }} />
            </center>
          </div>
        </Col>
        <Col>
          <div
            style={{
              borderRadius: "10px",
              padding: "8px",
            }}
          >
            <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
            <Form >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name :</Form.Label>
                <Form.Control type="Name" placeholder="Name"
                  onChange={(e) => { setname(e.target.value) }} />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com"
                  onChange={(e) => { setemail(e.target.value) }} />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address :</Form.Label>
                <Form.Control type="Address" placeholder="Address"
                  onChange={(e) => { setaddress(e.target.value) }} />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone :</Form.Label>
                <Form.Control type="Phone" placeholder="Phone"
                  onChange={(e) => { setcontact_number(e.target.value) }} />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="Password" placeholder="Password"
                  onChange={(e) => { setpassword(e.target.value) }} />
              </Form.Group>
              <center>
                <Button variant="success" type="submit" onClick={(e) => { Submit(e) }} style={{ width: '40%' }}>
                  Register
                </Button>
              </center>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
