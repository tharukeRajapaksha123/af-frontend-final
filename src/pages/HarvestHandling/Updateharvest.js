import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

function Updateharvest() {

    const [name, setProduceName] = useState();
    const [category, setCategory] = useState();
    const [measurement_unit, setMeasurementUnit] = useState();
    const [unit_price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [id, setID] = useState();

    const seller = localStorage.getItem("Name")
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const harvestData = location.state.data;
            console.log("Harvest Data:: ", harvestData);

            setProduceName(harvestData.name);
            setCategory(harvestData.category);
            setMeasurementUnit(harvestData.measurement_unit);
            setPrice(harvestData.unit_price);
            setQuantity(harvestData.quantity);
            setID(harvestData._id);

        } catch (err) {
            navigate(-1);
        }
    }, [])

    const Validate = (e) => {
        e.preventDefault();

        const formData = {
            name,
            category,
            measurement_unit,
            unit_price,
            quantity,
            id
        }

        console.log("FormData:: ", formData);
        axios.put("http://localhost:1337/api/harvest-controller/", formData).then((res) => {
            alert("Harvest updated successfully!!!")
            navigate("/HarvestListing");
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
            <h2>Edit the Harvest Details</h2>
            <Form onSubmit={Validate}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name of Produce :</Form.Label>
                    <Form.Control value={name} type="Name" placeholder="Name of Produce.." onChange={(e) => { setProduceName(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <option>--Select the category of produce--</option>
                        <option value='Fruits'>Fruits</option>
                        <option value='Vegetables'>Vegetables</option>
                        <option value='Rice & Grains'>Rice & Grains</option>
                        <option value='Meat'>Meat</option>
                        <option value='Dairy'>Dairy</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Measurement Unit</Form.Label>
                    <Form.Select value={measurement_unit} onChange={(e) => { setMeasurementUnit(e.target.value) }}>
                        <option>--Select the unit--</option>
                        <option value='Kg'>Kg</option>
                        <option value='g'>g</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Unit Price (In LKR) :</Form.Label>
                    <Form.Control value={unit_price} type="Number" placeholder="Unit Price (In LKR).." onChange={(e) => { setPrice(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label >Quantity :</Form.Label>
                    <Form.Control value={quantity} type="Number" placeholder="Quantity" onChange={(e) => { setQuantity(e.target.value) }} />
                </Form.Group>
                <center>
                    <Button variant="primary" type="submit" style={{ width: '50%' }}>
                        Save
                    </Button>
                </center>
            </Form>
        </Container>
    )
}



export default Updateharvest