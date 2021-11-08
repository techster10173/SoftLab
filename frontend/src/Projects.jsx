import React from 'react';
import './projects.css';

import { Link } from 'react-router-dom';

import {ProjectModal} from "./ProjectModal.jsx";
import {Navbar} from "./Toolbar.jsx";
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {ProjectsTable} from "./ProjectsTable.jsx";

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
        right: 40,
        bottom: 40,
        left: 'auto',
        position: 'fixed',
      }

    return(
        <div>
          <Navbar />
            <ProjectsTable/>
          <Fab sx={
            fabStyle
          } onClick={this.openCreateModal}><AddIcon/></Fab>
          <ProjectModal closeModalHandler={this.closeModal} displayModal={this.state.showModal} pid={this.state.currentProject} />
        </div>
    )
  } 
}
