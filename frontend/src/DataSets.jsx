import {Navbar} from "./Toolbar.jsx";
import React from "react";
import './projects.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import data from "./Data.json"

export class DataSets extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
          <Box
              sx={{
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10,
                
                boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="middle">Name</TableCell>
                    <TableCell align="middle">Description</TableCell>
                    <TableCell align="middle">Memory</TableCell>
                    <TableCell align="middle">Download</TableCell>
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
                        <TableCell align="middle">{row.description}</TableCell>
                        <TableCell align="middle">{row.memory}</TableCell>
                        <TableCell align="middle">{<a href= {row.download} download>Download</a>}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            
            </Box>
        </div>
           
        )
    }
}

