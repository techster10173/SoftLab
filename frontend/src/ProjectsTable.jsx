import React from 'react';
import './projects.css';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';

function createData(projectName, dateCreated, lastUpdate, creator, funds, edit, del) {
    return {projectName, dateCreated, lastUpdate, creator, funds, edit, del };
  }
  
  const rows = [
    createData('Project 1', '11/7/2021', '11/7/2021', 'BBois', 100, <Button>Edit</Button>)
    
  ];

  export class ProjectsTable extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          currentProject: null,
          showModal: false
      }
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
                        <TableCell align="middle">Project Name</TableCell>
                        <TableCell align="middle">Date Created</TableCell>
                        <TableCell align="middle">Last Updated</TableCell>
                        <TableCell align="middle">Creator</TableCell>
                        <TableCell align="middle">Funds</TableCell>
                        <TableCell align="middle">Edit</TableCell>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
        )
      } 
    }