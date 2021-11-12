import React from 'react';
import {Modal, Box, TextField, FormControl, Button, InputAdornment, OutlinedInput} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "./project.css";
import {HardwareView} from "./HardwareView.jsx";

const MySwal = withReactContent(Swal)

export class ProjectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            projectDescription: "",
            projectFunds: 0,
            fundsError: false,
            nameError: false,
            descError: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.displayModal && !prevProps.displayModal && this.props.pid) {
            axios.get(`/api/projects/${this.props.pid}/`).then(res => {
                const data = res.data.projectData;
                this.setState({
                    projectName: data.projectName,
                    projectDescription: data.description,
                    projectFunds: data.funds,
                    hardwareData: data.hardwares,
                });
            }).catch(err => console.log(err));
        }
        if(!this.props.displayModal && prevProps.displayModal){
            this.setState({projectName: "", projectDescription: "", projectFunds: 0});

        }
    }

    handleNameChange = (event) => {
        this.setState({projectName: event.target.value, nameError: event.target.value === ""});
    }

    handleDescriptionChange = (event) => {
        const description = event.target.value;
        this.setState({projectDescription: description, descError: description === ""});
    }

    handleFundsChange = (event) => {
        const funds = event.target.value;
        this.setState({projectFunds: funds, fundsError: funds < 0});
    }

    updateProject = (event) => {
        event.preventDefault();
        
        this.setState({nameError: this.state.projectName === "", descError: this.state.projectDescription === ""});

        if(this.state.projectName === "" || this.state.projectDescription === "" || this.state.projectFunds < 0){
            return;
        }

        axios.put(`/api/projects/${this.props.pid}/`, {
            projectName: this.state.projectName,
            description: this.state.projectDescription,
            funds: this.state.projectFunds
        }).then(res => {
            MySwal.fire({
                icon: "success",
                title: "Project Updated!",
                text: `${this.state.projectName} has successfully been updated`,
                timer: 1500
            });
            this.props.closeModalHandler();        
        }).catch(err => {
            MySwal.fire({
                icon: "error",
                title: "Whoops! Unexpected Problem",
                text: "Please Try Again",
                timer: 1500
            });
        });
    }

    createProject = (event) => {
        event.preventDefault();

        this.setState({nameError: this.state.projectName === "", descError: this.state.projectDescription === ""});

        if(this.state.projectName === "" || this.state.projectDescription === "" || this.state.projectFunds < 0){
            return;
        }

        axios.post('/api/projects/', {
            projectName: this.state.projectName,
            description: this.state.projectDescription,
            funds: this.state.projectFunds,
        }).then(res => {
            MySwal.fire({
                icon: "success",
                title: "Project Created!",
                text: `${this.state.projectName} has successfully been made`,
                timer: 1500
            });
            this.props.closeModalHandler();
        }).catch(err => {
            MySwal.fire({
                icon: "error",
                title: "Whoops! Unexpected Problem",
                text: "Please Try Again",
                timer: 1500
            });
            console.log(err);
        });
    }

    deleteProject = (event) => {
        event.preventDefault();
        axios.delete(`/api/projects/${this.props.pid}/`).then(res => {
            MySwal.fire({
                icon: "success",
                title: "Project Deleted!",
                timer: 1500
            });
            this.props.closeModalHandler();
        }).catch(err => {
            MySwal.fire({
                icon: "error",
                title: "Whoops! Unexpected Problem",
                text: "Please Try Again",
                timer: 1500
            });
            console.error(err);
        });
    }

    render() {
        const wrapperStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: this.props.pid ? 800: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            padding: 2,
            display: "flex",
            borderRadius: 4,
          };

        const cancelButtonStyle = {
            background: "#f50057", width:"12%", marginRight: "3%", "&:hover": {background: "#ab003c"}
        }

        return (
            <>
            <Modal open={this.props.displayModal}>
                <Box sx={wrapperStyle}>
                    <h1 sx = {{width: "50%"}}>{this.props.pid ? "Update" : "Create"} Project</h1>
                    <form onSubmit={this.props.pid ? this.updateProject : this.createProject}>
                        <FormControl>
                            <div>
                                <TextField label="Name" error={this.state.nameError} sx={{width: '49%', marginBottom: "5%", marginRight: "1%"}} value={this.state.projectName} onChange={this.handleNameChange} />
                                <OutlinedInput
                                    error={this.state.fundsError}
                                    type="number"
                                    sx={{width: '49%', marginBottom: "5%", marginLeft: "1%"}}
                                    value={this.state.projectFunds}
                                    onChange={this.handleFundsChange}
                                    startAdornment={
                                        <InputAdornment position="start">$</InputAdornment>
                                    }
                                />
                            </div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Description"
                                    error={this.state.descError}
                                    multiline
                                    rows={4}
                                    sx={{width: '100%', marginBottom: "5%"}}
                                    value={this.state.projectDescription}
                                    onChange={this.handleDescriptionChange}
                                />
                            <div>
                                <Button variant="contained" sx={cancelButtonStyle} onClick={this.props.closeModalHandler}>Cancel</Button>
                                {this.props.pid ? <Button variant="contained" sx={cancelButtonStyle} onClick={this.deleteProject}>Delete</Button> : null}
                                <Button variant="contained" type="submit" sx={this.props.pid ? {width: "47%"}:{width: "73%"}}>{this.props.pid ? "Update" : "Create"}</Button>
                            </div>
                        </FormControl>
                    </form>
                    {this.props.pid ? <HardwareView ></HardwareView> : null}
                </Box>
            </Modal>
        </>
        )
    }
}