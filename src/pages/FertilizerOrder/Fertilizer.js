import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from 'react-bootstrap/esm/Container';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import add from '../../Images/fertii.png'
import view from '../../Images/viewferti.png'
import { Link } from 'react-router-dom';

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

function Fertilizer() {
    const classes = useStyles();

    return (
        <>
            <Container style={{ backgroundColor: 'white', marginTop: '5%', borderRadius: '5px' }}>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={6}>
                            <Card>
                                <Link to='/addFertilizer'>
                                    <CardActionArea>
                                        <div style={{ display: 'flex', justifyContent: 'center', placeItems: 'center' }}>
                                            <img
                                                src={add}
                                                height='auto'
                                                width='50%'
                                            />
                                        </div>
                                        <CardContent style={{ backgroundColor: 'black' }}>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'center', color: 'white' }}>
                                                Add Fertilizers
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Card>
                                <Link to='/FertilizerViewPage'>
                                    <CardActionArea>
                                        <div style={{ display: 'flex', justifyContent: 'center', placeItems: 'center' }}>
                                            <img
                                                src={view}
                                                height='auto'
                                                width='50%'
                                            />
                                        </div>
                                        <CardContent style={{ backgroundColor: 'black' }}>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'center', color: 'white' }}>
                                                View Fertilizers
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}

export default Fertilizer;
