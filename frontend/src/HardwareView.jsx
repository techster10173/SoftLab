import React from "react";
import './project.css';
import {TableBody, TableCell, TableRow, TableContainer, TableHead, Paper, Table} from '@mui/material';

export class HardwareView extends React.Component{
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
                  width: '70%',
                  height: 'auto',
                  marginLeft: 3,
                  marginRight: 1,
                  // marginTop: 1,
                  // marginBottom: 1, 
                  boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
                }}>
                  <Table aria-label="simple table">
                    <TableHead sx={{backgroundColor: 'primary.color'}}>
                      <TableRow>
                        <TableCell align="middle">Hardwares</TableCell>
                      </TableRow>
                    </TableHead>
                    {/* <TableBody>
                      {this.hardwareList.map((row) => {
                        return (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="middle">{row.name}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody> */}
                  </Table>
            </TableContainer>
        );
    }
}