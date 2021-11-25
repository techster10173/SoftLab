import React from 'react';
import './project.css';
import {ProjectModal} from "./ProjectModal";
import {Navbar} from "./Toolbar";
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {ProjectsTable} from "./ProjectsTable";
import {Navigate} from "react-router-dom";
import {ShareModal} from "./ShareModal"

export class Projects extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        currentProject: null,
        showEditModal: false,
        showShareModal: false,
    }
  }
  
  componentDidMount(){
    document.cookie.includes("session") !== "" ? <Projects/> : <Navigate to="/login" />
  }
  
  projectHandler = (pid) => {
    this.setState({currentProject: pid, showEditModal: true});
  }

  openCreateModal = () => {
      this.projectHandler(null);
  }

  closeEditModal = () => {
      this.setState({showEditModal: false});
  }

  openShareModal = (pid) => {
      this.setState({showShareModal: true, currentProject: pid});
  }

  closeShareModal = () => {
      this.setState({showShareModal: false});
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
          <ProjectsTable openShare={this.openShareModal} openProject={this.projectHandler} modalOpen={this.state.showEditModal}/>
          <Fab sx={
            fabStyle
          } onClick={this.openCreateModal}><AddIcon/></Fab>
          <ProjectModal closeModalHandler={this.closeEditModal} displayModal={this.state.showEditModal} pid={this.state.currentProject} />
          <ShareModal closeModalHandler={this.closeShareModal} displayModal={this.state.showShareModal} pid={this.state.currentProject} />
        </>
    )
  } 
}
