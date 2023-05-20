import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(3),

        },
    },
}));
function HarvestListing() {
    const classes = useStyles();
    const [search, setSearch] = useState("")
    const [harvest, setHarvest] = useState([]);
    const navigate = useNavigate();

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

    const deleteHarvest = (e) => {
        axios.delete(`http://localhost:1337/api/harvest-controller/${e}`).then(res => {
            toast.success('Harvest Item Is Deleted Successfuly!!')
        }).catch(err => {
            alert(err)
        })
    }

    const updateHarvest = (data) => {
        navigate("/HarvestUpdate", { state: { data: data } })
    }

    return (
        <>
            <Container style={{ backgroundColor: 'white', width: '100%', borderRadius: '15px', padding: '25px', marginTop: '5%' }}>
                <center>
                    <Form className="d-flex" style={{ width: '40%', marginTop: '20px' }}>
                        <Form.Control
                            type="search"
                            value={search}
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                        <Button >Search</Button>
                    </Form>
                </center>

                <Table striped bordered hover style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th >Index</th>
                            <th>Product name</th>
                            <th>Category</th>
                            <th>Measurement unit</th>
                            <th>Unit price</th>
                            <th>Quantity</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {harvest && harvest.filter((element) => {
                            if (search == "") {
                                return element;
                            } else if ((element.name.toLowerCase()).includes(search.toLowerCase())) {
                                return element;
                            }
                        }).map((elem, id) => (
                            <tr key={id} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <td>{id + 1}</td>
                                <td>{elem.name}</td>
                                <td>{elem.category}</td>
                                <td>{elem.measurement_unit}</td>
                                <td>{elem.unit_price}</td>
                                <td>{elem.quantity}</td>
                                <td>
                                    <Button variant="outline-primary" size="sm" onClick={() => { updateHarvest(elem) }} >Edit</Button>
                                    <Button style={{ marginLeft: "10px" }} variant="outline-danger" size="sm" onClick={() => deleteHarvest(elem._id)} >Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Container >
        </>
    )
}

export default HarvestListing