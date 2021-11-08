import React from 'react';
import './Projects.css';

import { Link } from 'react-router-dom';

import {ProjectModal} from "./ProjectModal.jsx";
import {Navbar} from "./Toolbar.jsx";
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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


  
function createData(projectName, dateCreated, lastUpdate, creator, funds, edit, del) {
    return {projectName, dateCreated, lastUpdate, creator, funds, edit, del };
  }
  
  const rows = [
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button>Edit</Button>, <Button>Delete</Button>),
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button>Edit</Button>, <Button>Delete</Button>),

    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button>Edit</Button>, <Button>Delete</Button>),

    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button>Edit</Button>, <Button>Delete</Button>),

    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button>Edit</Button>, <Button>Delete</Button>),

    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button>Edit</Button>, <Button>Delete</Button>),

    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button>Edit</Button>, <Button>Delete</Button>),

    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button>Edit</Button>, <Button>Delete</Button>),

  ];

export class Projects extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        currentProject: null,
        showModal: false
    }
  } 
  projectHandler = (pid) => {
    this.setState({currentProject: pid, showModal: true});
  }

  openCreateModal = () => {
      this.projectHandler(null);
  }

  closeModal = () => {
      this.setState({showModal: false});
  }
  render(){
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }

    const fabStyle = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    }
  
    return(
      
        <div>
          <Button sx={{
              // width: 400,
              height: 50,
              marginLeft: 80,
              marginRight: 80,
              marginTop: 20,
              // backgroundColor: 'primary.dark',
              p: 5, 
          }}>Create Project</Button>
            <TableContainer component={Paper}
            sx={{
              // width: 1000,
              height: 300,
              margnLeft: 20,
              marginRight: 20,
              marginTop: 10,
              marginBottom: 10,
              // backgroundColor: 'primary.dark',
              
              boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
          }}>
              <Table sx={{ minWidth: 200 }} aria-label="simple table">
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
        </div>
    )
  } 
}
