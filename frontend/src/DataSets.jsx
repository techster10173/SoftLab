import {Navbar} from "./Toolbar.jsx";
import React from "react";
import './Projects.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

    
  function createData(name, description, memory, download) {
      return {name, description, memory, download};
    }
    
    const rows = [
      createData('Abdominal and Direct Fetal ECG Database', 'The research material included in the Abdominal and Direct Fetal Electrocardiogram Database contains multichannel fetal electrocardiogram (FECG) recordings obtained from 5 different women in labor, between 38 and 41 weeks of gestation. The recordings were acquired in the Department of Obstetrics at the Medical University of Silesia, by means of the KOMPOREL system for acquisition and analysis of fetal electrocardiogram (ITAM Institute, Zabrze, Poland). Each recording comprises four differential signals acquired from maternal abdomen and the reference direct fetal electrocardiogram registered from the fetal head.', '14.6 MB',<a href='https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip' download>Click to download</a>),
      createData('AF Termination Challenge Database', 'This database of two-channel ECG recordings has been created for use in the Computers in Cardiology Challenge 2004, an open competition with the goal of developing automated methods for predicting spontaneous termination of atrial fibrillation (AF).', '2.4 MB',<a href='https://physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip' download>Click to download</a>),
      createData('ANSI/AAMI EC13 Test Waveforms', 'The files in this set can be used for testing a variety of devices that monitor the electrocardiogram. The recordings include both synthetic and real waveforms.', '1.1 MB',<a href='https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
      createData('Project 3', 'testing', '30 mb',<a href='/somefile.txt' download>Click to download</a>),
    ];

export class DataSets extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
          <Box
              sx={{
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10,
                
                boxShadow: '0 0 1px 3px rgba(0, 0, 0, .125)',
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="middle">Name</TableCell>
                    <TableCell align="middle">Description</TableCell>
                    <TableCell align="middle">Download Memory</TableCell>
                    <TableCell align="middle">Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="middle">{row.name}</TableCell>
                      <TableCell align="middle">{row.description}</TableCell>
                      <TableCell align="middle">{row.memory}</TableCell>
                      <TableCell align="middle">{row.download}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            </Box>
        </div>
           
        )
    }
}