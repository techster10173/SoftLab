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


import { Toolbar, AppBar, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, Box, Grid, Paper} from '@mui/material';

export function Home(props){

    const avatarStyle = {height : '100px', width : '100px'};

    return (
        <div>
            <AppBar variant = "contained" color = "primary" position = 'relative'>
                <Toolbar>
                    <div class="container">
                            <img src={logo} alt="logo" class="img1"/>
                        </div>
                        <div class = "haas">
                            <h2 href="">Brown Bois</h2> 
                        </div>
                        <div class="log">
                            <Link to="/login">Login</Link>
                        </div>
                </Toolbar>
            </AppBar>   

        <div id="#about">

            <h2 class = "tformat">
                About our Product
            </h2>

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
                <h2 class = "tformat">
                    Meet our Team
                </h2>
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar class= "format">
                            <Avatar alt="sai" src={Sai} style ={avatarStyle}/>
                        </ListItemAvatar>
                        <ListItemText 
                            sx={{marginLeft:'1%'}}
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
                                {" MMA fighter pre brain damage"}
                                </>
                            }
                        />
                        <ListItemAvatar class= "format">
                            <Avatar alt="sree" src={Sree} style ={avatarStyle}/>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{marginLeft:'1%'}}
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
                                    {" I'm the mad titan "}
                                </React.Fragment>
                            }
                        />
                        <ListItemAvatar class= "format">
                            <Avatar alt="sparsh" src={Sparsh} style ={avatarStyle}/>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{marginLeft:'1%'}}
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
                                    {" He's one shot he's one shot"}
                                </React.Fragment>
                            }
                        />
                        <ListItemAvatar class= "format">
                            <Avatar alt="hershey" src={Hershey} style ={avatarStyle}/>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{marginLeft:'1%'}}
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
                                    {" Do y'all have any cookies"}
                                </React.Fragment>
                            }
                        />
                        <ListItemAvatar class= "format">
                            <Avatar alt="dhruva" src={Dhruva} style ={avatarStyle}/>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{marginLeft:'1%'}}
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
                                    {" Frick I forgot to eat today"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            </div>
        </div>
    </div> 
    )
}
