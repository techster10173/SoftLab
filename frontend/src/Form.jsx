import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Table, TableContainer, TableCell, TableBody, TableHead, TableRow, Paper, Button, Pagination, Grid, ListItem, TextField} from '@mui/material';

function Form(props) {
    const[delta, setDelta] = useState({});

    useEffect(() => {
        setDelta({});
    }, [props.focusHardware]);

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
            setDelta({});
            props.getProjects();
            props.setNewHardwares(props.focusHardware.name, sum)
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div>
            {props.projects ? (
                        <>
                        <TableContainer component={Paper}
                            sx={{
                            width: '100%',
                            marginTop: 5,
                            height: "100%",
                            marginBottom: 5, 
                            boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
                                }}>
                            <Table aria-label="simple table">
                                <TableHead sx={{backgroundColor: 'primary.color'}}>
                                <TableRow>
                                    <TableCell align="middle">Project Name</TableCell>
                                    <TableCell align="middle">Funds</TableCell>
                                    <TableCell align="middle">Unit Used</TableCell>
                                    <TableCell align="middle" sx={{textAlign: "center"}}>Enter Quantity</TableCell>
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
                                        <TextField type = "number"
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
                    <Button variant="contained" onClick={updateHardware}>Update Projects</Button>
                    </>
            ):null
            }
        </div>
    )
}

export default Form
