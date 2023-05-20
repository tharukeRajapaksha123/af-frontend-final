import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(3),

        },
    },
}));
function ViewFertilizer() {
    const classes = useStyles();
    const [search, setSearch] = useState("")
    const [fertilizer, setFertilizer] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("Token");

    useEffect(() => {
        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        axios.get('http://localhost:1337/api/fertilzer-controller', config).then((res) => {
            setFertilizer(res.data.Fertilizers);
            console.log("Fertilizers:: ", fertilizer);
        }).catch((err) => {
            alert(err);
        }).then((d) => {

        })
    }, [fertilizer])

    const deleteFertilizer = (e) => {
        axios.delete(`http://localhost:1337/api/fertilzer-controller/${e}`).then(res => {
            toast.error('Product Is Deleted Successfuly!!')
        }).catch(err => {
            alert(err)
        })
    }

    const updateFertilizer = (data) => {
        navigate("/FertilizerUpdate", { state: { data: data } })
        console.log("nehvbshvb::", data)
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
                            <th>Name</th>
                            <th>Content</th>
                            <th>Measurement unit</th>
                            <th>Unit price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fertilizer.filter((element) => {
                            if (search == "") {
                                return element;
                            } else if ((element.name.toLowerCase()).includes(search.toLowerCase())) {
                                return element;
                            }
                        }).map((elem, id) => (
                            <tr key={id} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <td>{id + 1}</td>
                                <td>{elem.name}</td>
                                <td>{elem.contents.substring(0, 250) + '...'}</td>
                                <td>{elem.measurement_unit}</td>
                                <td>{elem.unit_price}</td>
                                <td>
                                    <Button variant="outline-primary" size="sm" onClick={() => { updateFertilizer(elem) }} >Edit</Button>
                                </td>
                                <td>
                                    <Button style={{ marginLeft: "10px" }} variant="outline-danger" size="sm" onClick={() => deleteFertilizer(elem._id)} >Delete</Button>
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

export default ViewFertilizer