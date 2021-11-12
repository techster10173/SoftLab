import React from 'react';
import './project.css';
import {Table, TableContainer, TableCell, TableBody, TableHead, TableRow, Paper, Button, Pagination, Grid, ListItem} from '@mui/material';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
  
  export class HardwareTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
      }

    render(){
        return(
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
                            <TableCell align="middle">Hardware Name</TableCell>
                            <TableCell align="middle">Capacity</TableCell>
                            <TableCell align="middle">Unit Price</TableCell>
                            <TableCell align="middle">Units Used</TableCell>
                            <TableCell align="middle" sx={{textAlign: "center"}}>Update</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.props.hardware && this.props.hardware.map((row) => (
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="middle">{row.name}</TableCell>
                            <TableCell align="middle">{row.capacity}</TableCell>
                            <TableCell align="middle">{row.unitPrice}</TableCell>
                            <TableCell align="middle">{row.unitsUsed}</TableCell>
                            <TableCell align="middle" sx={{textAlign: "center"}}><Button onClick={(e) => this.props.editFocusHardware(row)}><LaunchRoundedIcon /></Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

        )
      } 
    }