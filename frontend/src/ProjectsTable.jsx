import React from 'react';
import './projects.css';
import axios from 'axios';
import { HardwareTable } from './HardwareTable';


import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';

  
  export class ProjectsTable extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          projects: [],
          offset: 0
      }
    }

    componentDidMount(){
      axios.get(`/api/projects/${this.state.offset}`).then(res => res.json()).then(data => {
        data.projectData.map(project => {
          return {
            projectName: project.projectName,
            dateCreated: project.dateCreated,
            lastUpdate: project.dateUpdated,
            creator: project.creator,
            funds: project.funds, 
            edit: <button>Edit</button>
          }
        });
        this.setState({projects: data.projectData});
      });
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
                        <TableCell align="middle">Project Name</TableCell>
                        <TableCell align="middle">Date Created</TableCell>
                        <TableCell align="middle">Last Updated</TableCell>
                        <TableCell align="middle">Creator</TableCell>
                        <TableCell align="middle">Funds</TableCell>
                        <TableCell align="middle">Edit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.projects.map((row) => (
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