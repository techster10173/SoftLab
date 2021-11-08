import React from 'react';
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  
function createData(projectName, dateCreated, lastUpdate, creator, funds, edit, del) {
    return {projectName, dateCreated, lastUpdate, creator, funds, edit, del };
  }
  
  const rows = [
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button >Edit</Button>, <Button>Delete</Button>),
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button >Edit</Button>, <Button>Delete</Button>),
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button >Edit</Button>, <Button>Delete</Button>),
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button >Edit</Button>, <Button>Delete</Button>),
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button >Edit</Button>, <Button>Delete</Button>),
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button >Edit</Button>, <Button>Delete</Button>),
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button >Edit</Button>, <Button>Delete</Button>),
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button >Edit</Button>, <Button>Delete</Button>),
  ];

export function Projects(props){
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
    return(
        <div>
          {/* <Button onClick={handleOpen}>Edit</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal> */}
          <Box
              sx={{
                // width: 400,
                height: 50,
                marginLeft: 80,
                marginRight: 80,
                marginTop: 20,
                // backgroundColor: 'primary.dark',
                p: 5, 
            }}
          >
            {/* <button class="button button1">Create Project</button> */}
            <Button>Create Project</Button>
          </Box>
          <Box
              sx={{
                // width: 1500,
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
                    <TableCell align="middle">Last Updated&nbsp;</TableCell>
                    <TableCell align="middle">Creator&nbsp;</TableCell>
                    <TableCell align="middle">Funds&nbsp;</TableCell>
                    <TableCell align="middle">Edit&nbsp;</TableCell>
                    <TableCell align="middle">Delete&nbsp;</TableCell>
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
    );
    
}
