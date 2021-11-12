import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Table, TableContainer, TableCell, TableBody, TableHead, TableRow, Paper, TextField, Fab} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Form(props) {
    const[delta, setDelta] = useState({});
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        setDelta({});
    }, [props.focusHardware]);

    useEffect(() => {
        for(const key in delta){
            let htmlElement = document.getElementById(key);
            if(htmlElement){
                props.projects.forEach(project => {
                    if(project.id === key){
                        htmlElement.value = delta[key] + (project.hardwares[props.focusHardware.name] || 0);
                    }
                });
            }
        }
    }, [props.projects])

    const createDelta = (event) => 
    {
        props.projects.forEach(project => {
            if (project.id === event.target.id){
                let deltaEntry = {}
                deltaEntry[event.target.id] = event.target.value - (project.hardwares[props.focusHardware.name] || 0);
                setDelta({...delta, ...deltaEntry});
            }
        });   
    }

    const updateHardware = () => {
        let sum = props.focusHardware.unitsUsed;
        
        for (const property in delta) {
            sum += delta[property];
        }

        axios.put("/api/hardware/", {
            hardwareName: props.focusHardware.name,
            unitSum: sum,
            projectsDelta: delta
        }).then(resp => {
            const elements = document.getElementsByTagName("input");
            for(const element of elements){
                element.value = "";
            }
            setDelta({});
            props.getProjects();
            props.setNewHardwares(props.focusHardware.name, sum);
            MySwal.fire({
                icon: "success",
                title: "Congrats!",
                text: "Sucessfully checked out " + props.focusHardware.name,
                timer: 1500
            });
        }).catch(err => {
            MySwal.fire({
                icon: "error",
                title: "Whoops! Unexpected Problem",
                text: err.response.data.message,
                timer: 1500
            });
        });
    }
    
    const fabStyle = {
        margin: 0,
        top: 'auto',
        right: 40,
        bottom: 40,
        left: 'auto',
        position: 'fixed',
      }

    return (
        <>
            {props.projects ? (
                        <>
                        <TableContainer component={Paper}
                            sx={{
                            width:  "100%",
                            marginTop: 5,
                            height: "100%",
                            marginBottom: 5, 
                            boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
                                }}>
                            <Table sx = {{width: "100%"}} aria-label="simple table">
                                <TableHead sx={{backgroundColor: 'primary.color'}}>
                                <TableRow>
                                    <TableCell align="middle">Project Name</TableCell>
                                    <TableCell align="middle">Funds</TableCell>
                                    <TableCell align="middle">Unit Used</TableCell>
                                    <TableCell align="middle" sx={{textAlign: "center"}}>Enter {props.focusHardware.name} Quantity</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {props.projects && props.projects.map((row) => (
                                    <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="middle">{row.projectName}</TableCell>
                                        <TableCell align="middle">{row.funds}</TableCell>
                                        <TableCell align="middle">{(row.hardwares[props.focusHardware.name] || 0)}</TableCell>                                        
                                        <TableCell align="middle" sx={{textAlign: "center"}}>
                                            <TextField size = "small" type = "number"
                                                id={row.id}
                                                onChange={createDelta}
                                                label="Quantity"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                    </TableContainer>
                    <Fab sx={
                        fabStyle
                    } onClick={updateHardware}><SaveIcon/></Fab>
                    </>
                    
            ):null
            }
        </>
    )
}

export default Form
