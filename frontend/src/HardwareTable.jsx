import React from 'react';
import axios from 'axios';
import './project.css';
import HardwareList from './components/HardwareList';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Grid, ListItem} from '@mui/material';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
  
  export class HardwareTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hardware: [],
            offset: 0,
            totalHardware: 0
        }
      }
  
      componentDidMount(){
        this.requestHardware();
      }
  
  
      requestHardware = () => {
        axios.get(`/api/get/?offset=${this.state.offset}`).then(data => {
          this.setState({hardware: data.data.hardwareData, totalHardware: data.data.totalHardware});
        });
      }

      updateOffset = (e, val) => {
        this.setState({offset: val - 1}, () => {
          this.requestProjects();
        });
      }

    render(){
        return(
          <>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <ListItem>
                    <TableContainer component={Paper}
                    sx={{
                    width: '100%',
                    marginTop: 5,
                    height: "100%",
                    marginBottom: 5, 
                    boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
                    }}>
                    <Table aria-label="simple table">
                        <TableHead sx={{backgroundColor: 'primary.color'}}>
                        <TableRow>
                            <TableCell align="middle">Hardware Name</TableCell>
                            <TableCell align="middle">Capacity</TableCell>
                            <TableCell align="middle">Unit Price</TableCell>
                            <TableCell align="middle">Units Used</TableCell>
                            <TableCell align="middle" sx={{textAlign: "center"}}>Update</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.hardware.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="middle">{row.hardwareName}</TableCell>
                            <TableCell align="middle" sx={{textAlign: "center"}}><Button onClick={(e) => this.props.openProject(row.id)}><LaunchRoundedIcon /></Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </ListItem>
            </Grid>
            <Grid item xs={6}>
                <ListItem>
                    <TableContainer component={Paper}
                    sx={{
                    width: '100%',
                    marginTop: 5,
                    height: "100%",
                    marginBottom: 5, 
                    boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
                        }}>
                    <Table aria-label="simple table">
                        <TableHead sx={{backgroundColor: 'primary.color'}}>
                        <TableRow>
                            <TableCell align="middle">Project Name</TableCell>
                            <TableCell align="middle">Funds</TableCell>
                            <TableCell align="middle">Unit Used</TableCell>
                            <TableCell align="middle" sx={{textAlign: "center"}}>Enter Quantity</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.hardware.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="middle">{row.hardwareName}</TableCell>
                            <TableCell align="middle" sx={{textAlign: "center"}}><Button onClick={(e) => this.props.openProject(row.id)}><LaunchRoundedIcon /></Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </ListItem>
            </Grid>
          </Grid>
                

                
                <div >
                    <Pagination sx={{width: 'auto' , marginBottom: 5, justifyContent: 'left', display : 'flex'}} align="middle" count={Math.floor(this.state.totalHardware/11)+1} onChange={this.updateOffset}/>
                </div>
            </>
        )
      } 
    }