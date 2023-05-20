import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import agri from '../../Images/agri.jpg'

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

function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const Navigate = useNavigate();
  const classes = useStyles();
  const userRole = localStorage.getItem("Role")


  const Validate = (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }
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
        if (userRole === "User") {
          Navigate("/buyharvest")
        } else {
          Navigate("/")
        }
        // { userRole === "User" ? Navigate("/buyharvest") : Navigate("/") }

      })
      .catch((err) => {
        console.log(err);
        alert("UserName or Password incorrect");
      });
  }
  return (
    <Container
      fluid
      style={{
        marginTop: "10%",
        display: "block",
        width: "70%",
        justifyContent: "center",
        backgroundColor: 'white',
        borderRadius: '10px'
      }}
    >
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img src={agri} height='100%' width='100%' style={{ borderRadius: '10px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address :</Form.Label>
                <Form.Control type="Name" placeholder="Email Address"
                  onChange={(e) => { setemail(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Password :</Form.Label>
                <Form.Control type="password" placeholder="Password"
                  onChange={(e) => { setpassword(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Don't have an account ?<a style={{ textDecoration: 'none' }} href='/Register'> Click here.</a></Form.Label>
                <Form.Label>Are you a producer ? Join with us.<a style={{ textDecoration: 'none' }} href='/FarmerRegister'> Click here.</a></Form.Label>
              </Form.Group>
              <center>
                <Button onClick={Validate} variant="success" style={{ width: '50%' }}>
                  Login
                </Button>
              </center>

            </Form>
          </Grid>
        </Grid>
      </div>

    </Container>
  );
}

export default Login;
