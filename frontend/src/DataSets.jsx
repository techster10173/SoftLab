import {Navbar} from "./Toolbar.jsx";
import React from "react";
import './Projects.css';

import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    
  function createData(name, description, memory, download) {
      return {name, description, memory, download};
    }
    
    const rows = [
      createData('Project 1', 'testing', '30mb',<a href='/somefile.txt' download>Click to download</a>)
    ];

export class DataSets extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
          <Box
              sx={{
                height: 300,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10,
                // backgroundColor: 'primary.dark',
                
                boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
            }}
          >
            <TableContainer component={Paper} left>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="middle">Name</TableCell>
                    <TableCell align="middle">Description</TableCell>
                    <TableCell align="middle">Download Memory</TableCell>
                    <TableCell align="middle">Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="middle">{row.name}</TableCell>
                      <TableCell align="middle">{row.description}</TableCell>
                      <TableCell align="middle">{row.memory}</TableCell>
                      <TableCell align="middle">{row.download}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            </Box>
        </div>
           
        )
    }
}