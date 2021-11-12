import React from 'react';
import './project.css';
import {ProjectModal} from "./ProjectModal.jsx";
import {Navbar} from "./Toolbar.jsx";
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {ProjectsTable} from "./ProjectsTable.jsx";
import {Navigate} from "react-router-dom";

export class Projects extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        currentProject: null,
        showModal: false
    }
  }
  
  componentDidMount(){
    document.cookie.includes("session") !== "" ? <Projects/> : <Navigate to="/login" />
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
    const fabStyle = {
        margin: 0,
        top: 'auto',
        right: 40,
        bottom: 40,
        left: 'auto',
        position: 'fixed',
      }

    return(
        <>
          <Navbar />
          <ProjectsTable openProject={this.projectHandler} modalOpen={this.state.showModal}/>
          <Fab sx={
            fabStyle
          } onClick={this.openCreateModal}><AddIcon/></Fab>
          <ProjectModal closeModalHandler={this.closeModal} displayModal={this.state.showModal} pid={this.state.currentProject} />

        </>
    )
  } 
}
