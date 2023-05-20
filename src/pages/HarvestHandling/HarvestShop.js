import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ShowCardVeiew() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [harvest, setHarvest] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("Token")

  useEffect(() => {
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    axios.get('http://localhost:1337/api/harvest-controller/', config)
      .then((res) => {
        setHarvest(res.data.Harvests);
        console.log(harvest)
      })
      .catch((err) => {
        alert(err);
      }).then((d) => {

      });
  }, [harvest]);

  const MoreDetails = (e) => {
    console.log(e._id);
    const ID = e._id;
    navigate("/viewharvest", { state: { props: ID } });
  };

  return (
    <>
      <div classname={classes.root} style={{ padding: "15px", }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <Form.Control
            type="search"
            value={search}
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => { setSearch(e.target.value) }}
            style={{ width: '50%', height: '40px' }}

          />
          <Button >Search</Button>
        </div>

        <Grid container spacing={3}>
          {harvest.filter((e) => {
            if (search === "") {
              return e
            } else if ((e.name.toLowerCase()).includes(search.toLowerCase())) {
              return e
            }
          }).map((e, i) => (
            <Grid kwy={i} item xs={6} md={3} >
              <Card style={{ padding: "10px", height: "28rem", }}>
                <div style={{ height: '11rem', display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={`http://localhost:1337/uploads/harvest/${e.image_path}`}
                    alt="Nothing"
                    height="100%"
                    width="auto"
                  />
                </div>
                <CardContent>
                  <span style={{ fontFamily: 'Copperplate Gothic Light', fontSize: '23px', fontWeight: 'bold' }}>{e.name}</span>
                  <p style={{ fontFamily: 'Impact', fontSize: '23px', fontWeight: 'bold' }}>Rs.{e.unit_price} per {e.measurement_unit}</p>
                  <div style={{ height: '10%' }}>
                    <p>Category :- {e.category}</p>
                    <p>For sale by :- {e.seller}</p>
                  </div>
                </CardContent>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outline-success"
                    onClick={() => MoreDetails(e)}
                    style={{ marginRight: "15px", }}
                  >
                    View More
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>


    </>
  );
}

export default ShowCardVeiew;