import axios from 'axios';
import React, { useState } from 'react'
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from 'react-toastify';

function LoanForm() {

    const name = localStorage.getItem("Name")
    const token = localStorage.getItem("Token")
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };
    const [requested_by, setrequested_by] = useState();
    const [status, setstatus] = useState(false);
    const [reason, setreason] = useState();
    const [special_notice, setspecial_notice] = useState();
    const [amount, setamount] = useState();
    const [time, settime] = useState();
    // setrequested_by(name)
    // console.log(name);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const Validate = (e) => {
        e.preventDefault();

        // Check if a request is already in progress
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        const formData = {
            requested_by: name,
            status,
            reason,
            special_notice,
            amount,
            time
        }
        console.log(formData);

        axios.post('http://localhost:1337/api/loan-controller/', formData)
            .then(async res => {
                console.log("inserted");
                toast.success('Loan Requested Successfully')
                setIsSubmitting(false);
            })
            .catch(err => {
                console.log("insert failed")
                toast.error('Publish Unsuccesful')
                setIsSubmitting(false);
            });
    }
  return (
      <Container
          fluid
          style={{
              marginTop: "10%",
              display: "block",
              width: "50%",
              justifyContent: "center",
          }}
      >
          <h2>Apply For Loan</h2>
          <h5>Once Applied Admins Will Update You.</h5>
          <Form onSubmit={Validate}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Requested By :</Form.Label>
                  <Form.Control type="Name" placeholder="Name of Fertilizer.." value={name} onChange={(e) => { setrequested_by(e.target.value) }} disabled/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Reason :</Form.Label>
                  <Form.Control type="Name" placeholder="Brief description .." onChange={(e) => { setreason(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" >
                  <Form.Label>Special Notice :</Form.Label>
                  <Form.Control type="Name" placeholder="Brief description of special.." onChange={(e) => { setspecial_notice(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Amount (In LKR Max : Rs.1,000,000) :</Form.Label>
                  <Form.Control type="Number" placeholder="Amount (In LKR).." onChange={(e) => { setamount(e.target.value) }} />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Payment Date : </Form.Label>
                  <Form.Control type="date" required onChange={(e) => { settime(e.target.value) }} />
              </Form.Group>
              <Button variant="primary" type="submit">
                  Apply 
              </Button>
              <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
              />
          </Form>
      </Container>
  )
}

export default LoanForm