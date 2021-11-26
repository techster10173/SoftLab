import React from 'react';
import axios from 'axios';
import './project.css';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination} from '@mui/material';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
  
  export class ProjectsTable extends React.Component{
    constructor(props) {
      super(props);

      const value = `; ${document.cookie}`;
      const parts = value.split(`; uid=`);

      this.state = {
          projects: [],
          offset: 0,
          totalProjects: 0,
          uid: parts.pop().split(';').shift(),
      }


    }

    componentDidMount(){
      this.requestProjects();
    }

    componentDidUpdate(prevProps, prevState){
      if(!this.props.modalOpen && prevProps.modalOpen){
        this.requestProjects();
      }
    }

    requestProjects = () => {
      axios.get(`/api/projects/?offset=${this.state.offset}`).then(data => {
        this.setState({projects: data.data.projectData, totalProjects: data.data.totalProjects});
      });
    }

    updateOffset = (e, val) => {
      this.setState({offset: val - 1}, () => {
        this.requestProjects();
      });
    }

    getUname = () => {
      
    }

    render(){
        return(
          <>
                <TableContainer component={Paper}
                sx={{
                  width: 'auto',
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 5,
                  height: "100%",
                  marginBottom: 5, 
                  boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
              }}>
                  <Table aria-label="simple table">
                    <TableHead sx={{backgroundColor: 'primary.color'}}>
                      <TableRow>
                        <TableCell align="middle">Project Name</TableCell>
                        <TableCell align="middle">Description</TableCell>
                        <TableCell align="middle">Date Created</TableCell>
                        <TableCell align="middle">Last Updated</TableCell>
                        <TableCell align="middle">Creator</TableCell>
                        <TableCell align="middle">Funds</TableCell>
                        <TableCell align="middle" sx={{textAlign: "center"}}>Edit</TableCell>
                        <TableCell align="middle" sx={{textAlign: "center"}}>Share</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.projects.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="middle">{row.projectName}</TableCell>
                          <TableCell align="middle">{row.description}</TableCell>
                          <TableCell align="middle">{(new Date(row.dateCreated)).toLocaleString()}</TableCell>
                          <TableCell align="middle">{(new Date(row.dateUpdated)).toLocaleString()}</TableCell>
                          <TableCell align="middle">{row.creator}</TableCell>
                          <TableCell align="middle">${row.funds}</TableCell>
                          <TableCell align="middle" sx={{textAlign: "center"}}><Button onClick={(e) => this.props.openProject(row.id)}><LaunchRoundedIcon /></Button></TableCell>
                          <TableCell align="middle" sx={{textAlign: "center"}}><Button disabled={this.state.uid !== row.creator} onClick={(e) => this.props.openShare(row.id)}><PersonAddIcon /></Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div >
                    <Pagination sx={{width: 'auto' , marginBottom: 5, justifyContent: 'center', display : 'flex'}} align="middle" count={Math.floor(this.state.totalProjects/11)+1} onChange={this.updateOffset}/>
                </div>
              </>
        )
      } 
    }