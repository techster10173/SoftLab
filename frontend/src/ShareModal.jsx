import React from 'react';
import {Modal, ListItem, Box, TextField, IconButton, FormControl, Autocomplete, Button, List, ListItemText} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "./project.css";
import {debounce} from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';

const MySwal = withReactContent(Swal)

export class ShareModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            options: [],
            members: [],
        };
    }

    componentDidUpdate(prevProps){
        if(this.props.displayModal && !prevProps.displayModal){
            axios.get(`/api/projects/${this.props.pid}/invite/`).then(res => {
                this.setState({
                    members: res.data.users
                });
            });
        }
    }

    onChangeHandle = async value => {
        debounce(async () => {
            const {data} = await axios.get(`/api/users/?query=${value}`);
            this.setState({options: data.users});
        },500)();
    }

    addMembers = () => {
        const {members} = this.state;
        const {pid} = this.props;

        let newMembers = [];
        members.forEach(member => {
            newMembers.push(member.id);
        });


        axios.put(`/api/projects/${pid}/invite/`, {members: newMembers}).then(res => {
            this.props.closeModalHandler();
            MySwal.fire({
                title: 'Success',
                text: 'Members updated successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }).catch(err => {
            console.error(err);
            MySwal.fire({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        });    
    }
    
    deleteMember = (id) => {
        let newMembers = this.state.members.filter(member => member.id !== id);
        this.setState({members: newMembers});
    }

    render() {
        const wrapperStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 400,
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
            <Modal open={this.props.displayModal}>
                <Box sx={wrapperStyle}>
                    <h1>Share Project</h1>
                    <FormControl sx={{width: "100%"}}>
                        <Autocomplete
                            id="asynchronous-demo"
                            style={{ width: "100%" }}
                            open={this.state.open}
                            onOpen={() => {
                                this.setState({open: true});
                            }}
                            onClose={() => {
                                this.setState({open: false});
                            }}
                            onChange={(event, value) => {
                                this.setState({members: [...this.state.members, value]});
                            }}
                            getOptionLabel={option => option.uname}
                            options={this.state.options}
                            renderInput={params => (
                                <TextField
                                {...params}
                                variant="outlined"
                                onChange={ev => {
                                    // dont fire API if the user delete or not entered anything
                                    if (ev.target.value !== "" || ev.target.value !== null) {
                                        this.onChangeHandle(ev.target.value);
                                    }
                                }}
                                />
                            )}
                            />
                        <List>
                            {this.state.members.map(option => (
                                <ListItem key={option.uname} secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => this.deleteMember(option.id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  }>
                                    <ListItemText primary={option.uname} />
                                </ListItem>
                            ))}
                        </List>
                        <div style={{position: "fixed", bottom: "3%", right: 0}}>
                            <Button variant="contained" sx={cancelButtonStyle} onClick={this.props.closeModalHandler}>Cancel</Button>
                            <Button variant="contained" color="primary" onClick={this.addMembers}>Save</Button>
                        </div>
                    </FormControl>
                </Box>
            </Modal>
        );
    }
}