import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { MDBInput } from 'mdb-react-ui-kit';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  cards: {
    flexGrow: 1,
    padding: 10
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    fontSize: 30,
  },
}));

function ViewItems() {
  const location = useLocation();
  const ID = location.state.props;
  const [item, setItem] = useState([]);
  const [image, setImages] = useState();
  const [quantity, setQuantity] = useState();


  const navigate = useNavigate();
  const token = localStorage.getItem("Token")
  const user = localStorage.getItem("uid")
  const config = {
    headers: { 'Authorization': `Bearer ${token}` }
  };
  useEffect(() => {
    axios.get(`http://localhost:1337/api/fertilzer-controller/${ID}`)
      .then((res) => {
        console.log("one",res.data)
        setItem(res.data.fertilizer);
        console.log("two",item); 
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  const itemName = item.name;
  console.log(itemName);


  const AddToCart = (e) => {
    console.log(e._id);
    const Cart = {
      itemId: e._id,
      itemName: e.name,
      added_by: user,
      quantity,
      price: e.unit_price
    }
    console.log(Cart);
    axios.post('http://localhost:1337/api/cart-controller', Cart).then(res => {
      alert("Item Added To Cart Successfully");
    }).catch(e => {
      alert(e)
    })
  };

  const GoToCart = () =>{
    navigate("/FertilizerCart");
  }

  const classes = useStyles();

  return (
    <>
    <Button style={{ marginLeft: "10px" }} onClick={() => GoToCart()} variant="btn btn-info">🛒 My Cart</Button>
      <Container style={{ backgroundColor: 'white', width: '80%', marginTop: '20px', padding: '20px', borderRadius: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2%' }}>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={10} sm={6} md={6} style={{ maxHeight: "100%", maxWidth: "500px" }}>
            <Card>
              <center>

                <img
                  src={`http://localhost:1337/uploads/${item.image_path}`}
                  alt="Nothing"
                  style={{
                    width: "100%",
                    height: "auto"
                  }}
                />
              </center>
            </Card>
          </Grid>
          <Grid item sm={6} >
            <Paper className={classes.paper}>
              <h2>{item.name}</h2>
              <h4>{item.contents}</h4>
              <br />
              <h3>Rs.{item.unit_price}.00 per {item.measurement_unit}</h3>
              <h5>Enter Amount : </h5>
              <MDBInput id='typeNumber' type='number' value={quantity} onChange={(e) => { setQuantity(e.target.value) }} defaultValue={1} style={{ width: "100px", marginBottom: "10px" }} />
              <Button style={{ marginRight: "10px" }} variant="btn btn-info"
                onClick={() => AddToCart(item)}>🛒 Add To Cart</Button>
            </Paper>

          </Grid>

        </Grid>
      </Container>
    </>
  )
}
export default ViewItems