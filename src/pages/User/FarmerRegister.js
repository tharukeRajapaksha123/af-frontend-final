import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from "../../Images/farmer.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import agri from '../../Images/agrii.jpg'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function FarmerRegister() {

  const classes = useStyles();
  const [RegNo, setRegNo] = useState();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [address, setaddress] = useState();
  const [contact_number, setcontact_number] = useState();
  const [password, setpassword] = useState();
  const [status, setstatus] = useState(false);
  const [role, setrole] = useState("Farmer");
  const [filePath, setfilePath] = useState();
  const Navigate = useNavigate();


  const Submit = (e) => {
    console.log("Hi");
    e.preventDefault();

    const formData = new FormData();
    formData.append("RegNo", RegNo)
    formData.append("name", name)
    formData.append("email", email)
    formData.append("address", address)
    formData.append("contact_number", contact_number)
    formData.append("password", password)
    formData.append("status", status)
    formData.append("role", role)
    formData.append("filePath", filePath)



    axios.post(`http://localhost:1337/api/auth-controller/register`, formData).then(res => {
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
            localStorage.setItem('Address', res.data.user.address);
            localStorage.setItem('RegNo', res.data.user.RegNo);
            localStorage.setItem('ContactNo', res.data.user.contact_number);
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
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <center>
              <img src={agri} height='auto' width='100%' style={{ marginTop: '12px', borderRadius: '10px' }} />
            </center>
          </Grid>
          <Grid item xs={12} md={6}>
            <h2 style={{ textAlign: 'center', fontFamily: 'Consolas', fontWeight: 'bold' }}>Sign Up</h2>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Registration No :</Form.Label>
                <Form.Control type="Name" placeholder="Name"
                  onChange={(e) => { setRegNo(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name :</Form.Label>
                <Form.Control type="Name" placeholder="Name"
                  onChange={(e) => { setname(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com"
                  onChange={(e) => { setemail(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Address :</Form.Label>
                <Form.Control type="Address" placeholder="Address"
                  onChange={(e) => { setaddress(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Phone :</Form.Label>
                <Form.Control type="Phone" placeholder="Phone"
                  onChange={(e) => { setcontact_number(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="Password" placeholder="Password"
                  onChange={(e) => { setpassword(e.target.value) }} />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Enter Document: </Form.Label>
                <Form.Control type="file" accept='image/*' required
                  onChange={(e) => { setfilePath(e.target.value) }} />
              </Form.Group>
              <center>
                <Button variant="success" type="submit" onClick={(e) => { Submit(e) }} style={{ width: '50%' }}>
                  Register
                </Button>
              </center>
            </Form>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default FarmerRegister