import React from "react";
import {ProjectModal} from "./ProjectModal.jsx";
import {Navbar} from "./Toolbar.jsx";
import {Button} from '@mui/material';

export class Projects extends React.Component {
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

    render() {
        return (
            <>
                <Navbar />
                <div>
                    <Button onClick={this.openCreateModal}>Create Project!</Button>
                    {/* <ProjectsTable projectHandler={this.projectHandler}></ProjectsTable> */}
                    <ProjectModal displayModal={this.state.showModal} pid={this.state.currentProject} />
                </div>
            </>
        )
    }
}