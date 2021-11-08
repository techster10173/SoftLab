import React from 'react'
import {Modal, Box, TextField, FormControl, Button, InputAdornment, OutlinedInput} from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert2';

export class ProjectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            projectDescription: "",
            projectFunds: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.displayModal && !prevProps.displayModal && this.props.pid) {
            axios.get(`/api/projects/${this.props.pid}`).then(res => {
                const data = res.projectData;
                this.setState({
                    projectName: data.projectName,
                    projectDescription: data.description,
                    projectFunds: data.funds,
                    created: data.dateCreated,
                    updated: data.dateUpdated,
                    hardwareData: data.hardwares,
                });
            }).catch(err => console.log(err));
        }
    }

    handleNameChange = (event) => {
        this.setState({projectName: event.target.value});
    }

    handleDescriptionChange = (event) => {
        this.setState({projectDescription: event.target.value});
    }

    handleFundsChange = (event) => {
        this.setState({projectFunds: event.target.value});
    }

    updateProject = (event) => {
        event.preventDefault();
        axios.put(`/api/project/${this.props.pid}`, {
            name: this.state.projectName,
            description: this.state.projectDescription,
            funds: this.state.projectFunds
        }).then(res => {
            swal.fire({
                title: 'Project Updated!',
                text: 'Your project has been updated!',
                type: 'success',
                confirmButtonText: 'Cool'
            })
        }).catch(err => {
            swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                type: 'error',
                confirmButtonText: 'Cool'
            })
        });
    }

    createProject = (event) => {
        event.preventDefault();
        axios.post('/api/projects', {
            name: this.state.projectName,
            description: this.state.projectDescription,
            funds: this.state.projectFunds,
        }).then(res => {
            swal.fire({
                title: 'Project Created!',
                text: 'Your project has been created!',
                icon: 'success',
                confirmButtonText: 'Cool'
            }).catch(e => console.log(e));
        }).catch(err => {
            swal.Fire({
                title: 'Error',
                text: err,
                icon: 'error',
            }).catch(e => console.log(e));
            console.log(err);
        });
    }

    render() {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            padding: 2,
            display: "flex",
            flexWrap: "wrap",
            borderRadius: 4,
          };

        return (
            <Modal
                open={this.props.displayModal}
            >
                <Box sx={style}>
                    <h1>Create Project</h1>
                    <form onSubmit={this.props.pid ? this.updateProject : this.createProject}>
                        <FormControl>
                            <div>
                                <TextField label="Name" sx={{width: '14ch'}} value={this.state.projectName} onChange={this.handleNameChange} />
                                <OutlinedInput
                                    type="number"
                                    label="Funds"
                                    sx={{width: '25ch'}}
                                    value={this.state.projectFunds}
                                    onChange={this.handleFundsChange}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </div>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                rows={4}
                                value={this.state.projectDescription}
                                onChange={this.handleDescriptionChange}
                            />
                            {this.props.pid ? <HardwareTable data={this.state.hardwareData}/> : null}
                            <Button type="submit">{this.props.pid ? "Update" : "Create"}</Button>
                        </FormControl>
                    </form>
                </Box>
            </Modal>
        )
    }
}