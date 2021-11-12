import './home.css';
import { Link } from 'react-router-dom';
import React from 'react'
import logo from "./assets/newLogo2.png"
import Sai from "./assets/Sai.jpg"
import Sparsh from "./assets/sparsh.jfif"
import Sree from "./assets/sree.jfif"
import Hershey from "./assets/hershey.jfif"
import Dhruva from "./assets/dhruva.jfif"
import HaaS from "./assets/haas.jpg"


import { Toolbar, AppBar, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, Box, Grid, Paper, styled} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export function Home(props){

    return (
        <div>
            <AppBar variant = "contained" color = "primary" position = 'relative'>
                <Toolbar>
                    <div class="container">
                            <img src={logo} alt="logo" class="img1"/>
                        </div>

                        <div class="menu">
                            <ul>
                                <li>
                                    <a href="#about">About</a>
                                </li>
                                <li>
                                    <a href="#the-team">The Team</a>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </ul>
                        </div>
                </Toolbar>
            </AppBar>   

        <div id="#about">

            <h1 class = "tformat">
                About our Product
            </h1>

            <List>
            <ListItem alignItems="flex-start">
                        <ListItemText
                            class= "about"
                            primary="Hardware as a Service"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body"
                                        color="text.primary"
                                    >
                                    </Typography>
                                {" Our Product is exactly as it sounds: Hardware as a Service. Imagine being able to create projects, assign funds, and utilize multiple hardware sets for each of these projects all in one place. Well now you can. With our service, you can use all of these features with ease."}
                                </React.Fragment>
                            }
                        />
                        <img src={HaaS} alt="hardware as a service" height = "300px" class = "img" />
                    </ListItem>
            </List>        
        </div>

        <div id="#the-team">
            <div class = "team">
                <h1 class = "tformat">
                    Meet our Team
                </h1>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar class= "format">
                                    <Avatar alt="sai" src={Sai} style ={{height : '250px', width : '250px'}}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Saiteja Rawulwar"
                                    secondary={
                                        <>
                                            <Typography
                                                sx={{ display: 'inline'}}
                                                component="span"
                                                variant="body"
                                                color="text.primary"
                                            >
                                            </Typography>
                                        {" I am an ECE student specializing in Software Engineering and Design and the University of Texas at Austin"}
                                        </>
                                    }
                                />
                            </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar class= "format">
                                    <Avatar alt="sree" src={Sree} style ={{height : '250px', width : '250px'}}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Sreesaketh Grandhe"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body"
                                                color="text.primary"
                                            >
                                            </Typography>
                                        {"Sree's bio"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar class= "format">
                                    <Avatar alt="sparsh" src={Sparsh} style ={{height : '250px', width : '250px'}}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Sparsh Patel"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body"
                                                color="text.primary"
                                            >
                                            </Typography>
                                        {" Sparsh's bio"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar class= "format">
                                    <Avatar alt="hershey" src={Hershey} style ={{height : '250px', width : '250px'}}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Harshit Gupta"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body"
                                                color="text.primary"
                                            >
                                            </Typography>
                                        {" Harshit's bio"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </Grid>
                        <Grid item xs = {6}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar class= "format">
                                    <Avatar alt="dhruva" src={Dhruva} style ={{height : '250px', width : '250px'}}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Dhruva Rao"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body"
                                                color="text.primary"
                                            >
                                            </Typography>
                                        {" Dhruva's bio"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>                            
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    </div> 
    )
}
