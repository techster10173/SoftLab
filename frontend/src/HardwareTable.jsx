import {Navbar} from "./Toolbar.jsx";
import React from "react";
import './projects.css';
import {TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, Table} from '@mui/material';

export class HardwareTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentProject: null,
            showModal: false
        }
      } 
    render(){
        return(
            <TableContainer component={Paper}
                sx={{
                  width: 'auto',
                  height: 500,
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 5,
                  marginBottom: 5, 
                  boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
                }}>
                  <Table aria-label="simple table">
                    <TableHead sx={{backgroundColor: 'primary.color'}}>
                      <TableRow>
                        <TableCell align="middle">Hardwares</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row) => {
                        return (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="middle">{row.name}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
            </TableContainer>
        );
    }
}