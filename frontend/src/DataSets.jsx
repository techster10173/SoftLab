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


export class DataSets extends React.Component {
    render() {
        return (
            <div>
                 <>
                <Navbar />
            </>
          <Box
              sx={{
                height: 50,
                marginLeft: 80,
                marginRight: 80,
                marginTop: 20,
                p: 5, 
            }}
          >
            <Button>Create Project</Button>
          </Box>
          <Box
              sx={{
                height: 300,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: 'primary.dark',
                
                boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
            }}
          >
            <TableContainer component={Paper} left>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="middle">Project Name</TableCell>
                    <TableCell align="middle">Date Created</TableCell>
                    <TableCell align="middle">Last Updated</TableCell>
                    <TableCell align="middle">Creator</TableCell>
                    <TableCell align="middle">Funds</TableCell>
                    <TableCell align="middle">Edit</TableCell>
                    <TableCell align="middle">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.projectName}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="middle">{row.projectName}</TableCell>
                      <TableCell align="middle">{row.dateCreated}</TableCell>
                      <TableCell align="middle">{row.lastUpdate}</TableCell>
                      <TableCell align="middle">{row.creator}</TableCell>
                      <TableCell align="middle">{row.funds}</TableCell>
                      <TableCell align="middle">{row.edit}</TableCell>
                      <TableCell align="middle">{row.del}</TableCell>
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