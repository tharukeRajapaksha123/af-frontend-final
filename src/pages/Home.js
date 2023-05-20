import React from 'react'
import Container from 'react-bootstrap/esm/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from "../Images/background.jpg"
import harvest from "../Images/harvest.jpg"
import fertilizer from "../Images/fertilizersss.jpg"
import { Link } from 'react-router-dom';
import profile from '../Images/profile .jpg'
import harvestStore from '../Images/hy.jpg'
import money from '../Images/mon1.jpg'
import harvesttt from '../Images/harvesttt.jpg'


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


function Home() {
  const name = localStorage.getItem('Name');
  console.log(name);
  const classes = useStyles();
  const userRole = localStorage.getItem("Role")

  return (
    <>
      <Container style={{ backgroundColor: 'white', width: '100%', marginTop: '15px', padding: '15px', borderRadius: '10px' }}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={4} style={{ height: '80%' }}>
              <Card style={{ height: '80%' }}>
                <Link to='/addHarvest'>
                  <CardActionArea>
                    <img
                      src={harvest}
                      width="100%"
                      height="auto"
                    />
                    <CardContent style={{ backgroundColor: 'black' }}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ color: 'white', textAlign: 'center' }}>
                        Add Harvest To Sell
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} style={{ height: '80%', }}>
              <Card style={{ eight: '80%' }}>
                <Link to='/buyfertilizer'>
                  <CardActionArea>
                    <img
                      src={fertilizer}
                      width="100%"
                      height="auto"
                    />
                    <CardContent style={{ backgroundColor: 'black' }}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ color: 'white', textAlign: 'center' }}>
                        Buy Fertilizer
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>

              </Card>
            </Grid>
            <Grid item xs={6} md={4} style={{ height: '80%' }}>
              <Card>
                <Link to='/MyProfile'>
                  <CardActionArea>
                    <img
                      src={profile}
                      width="66%"
                      height="auto"
                      style={{ display: 'flex', justifyContent: 'center', marginLeft: '15%' }}
                    />
                    <CardContent style={{ backgroundColor: 'black' }}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ color: 'white', textAlign: 'center' }}>
                        View My Profile
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} style={{ height: '90%' }}>
              <Card>
                <Link to='/HarvestListing'>
                  <CardActionArea>
                    <img
                      src={harvestStore}
                      width="100%"
                      height="auto"
                    />
                    <CardContent style={{ backgroundColor: 'black' }}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ color: 'white', textAlign: 'center' }}>
                        Handle My Pulished Harvests
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} style={{ height: '80%' }}>
              <Card>
                <Link to='/LoanForm'>
                  <CardActionArea>
                    <img
                      src={money}
                      width="100%"
                      height="auto"
                    />
                    <CardContent style={{ backgroundColor: 'black' }}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ color: 'white', textAlign: 'center' }}>
                        Get Financial Aid
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} style={{ height: '80%' }}>
              <Card>
                <Link to='/buyharvest'>
                  <CardActionArea>
                    <img
                      src={harvesttt}
                      width="100%"
                      height="auto"
                    />
                    <CardContent style={{ backgroundColor: 'black' }}>
                      <Typography gutterBottom variant="h5" component="h2" style={{ color: 'white', textAlign: 'center' }}>
                        Visit the Harvest shop
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container >

    </>
  )
}

export default Home;