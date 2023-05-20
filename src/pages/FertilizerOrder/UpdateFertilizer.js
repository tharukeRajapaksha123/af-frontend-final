import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

function AddFertilizer() {

    const [name, setName] = useState();
    const [contents, setContents] = useState();
    const [measurement_unit, setMeasurementUnit] = useState();
    const [unit_price, setPrice] = useState();
    const [id, setID] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fertilizerData = location.state.data;

            setName(fertilizerData.name);
            setContents(fertilizerData.contents);
            setMeasurementUnit(fertilizerData.measurement_unit);
            setPrice(fertilizerData.unit_price);
            setID(fertilizerData._id);
        } catch (error) {
            navigate(-1);
        }
    }, [])

    const Validate = (e) => {
        e.preventDefault();

        const formData = {
            name,
            contents,
            measurement_unit,
            unit_price,
            id
        }

        console.log("From dta: :", formData);

        axios.put("http://localhost:1337/api/fertilzer-controller/", formData).then((res) => {
            alert("fertilizer updated successfully!!!")
            navigate("/FertilizerViewPage");
        }).catch(err => {
            alert(err);
            console.log("this is a error")
        })

    }


    return (
        <Container
            fluid
            style={{
                marginTop: "5%",
                marginBottom: "5%",
                display: "block",
                width: "50%",
                justifyContent: "center",
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '6px'
            }}
        >
            <h2>Edit the Fertilizer Details</h2>
            <Form onSubmit={Validate}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name of fetilizer :</Form.Label>
                    <Form.Control type="Name" placeholder="Name of Fertilizer.." value={name} onChange={(e) => { setName(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Contents :</Form.Label>
                    <Form.Control type="Name" placeholder="Brief description of contents.." value={contents} onChange={(e) => { setContents(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Measurement Unit</Form.Label>
                    <Form.Select onChange={(e) => { setMeasurementUnit(e.target.value) }} value={measurement_unit}>
                        <option>--Select the unit--</option>
                        <option value='Kg'>Kg</option>
                        <option value='g'>g</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Price (In LKR) :</Form.Label>
                    <Form.Control type="Number" placeholder="Unit Price (In LKR).." onChange={(e) => { setPrice(e.target.value) }} value={unit_price} />
                </Form.Group>
                <center>
                    <Button variant="primary" type="submit" style={{ width: '30%' }}>
                        Save
                    </Button>
                </center>
            </Form>
        </Container>
    )
}

export default AddFertilizer

