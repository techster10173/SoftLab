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
      createData('Abdominal and Direct Fetal ECG Database', 'The research material included in the Abdominal and Direct Fetal Electrocardiogram Database contains multichannel fetal electrocardiogram (FECG) recordings obtained from 5 different women in labor, between 38 and 41 weeks of gestation. The recordings were acquired in the Department of Obstetrics at the Medical University of Silesia, by means of the KOMPOREL system for acquisition and analysis of fetal electrocardiogram (ITAM Institute, Zabrze, Poland). Each recording comprises four differential signals acquired from maternal abdomen and the reference direct fetal electrocardiogram registered from the fetal head.', '14.6 MB',<a href='https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip' download>Download</a>),
      createData('AF Termination Challenge Database', 'This database of two-channel ECG recordings has been created for use in the Computers in Cardiology Challenge 2004, an open competition with the goal of developing automated methods for predicting spontaneous termination of atrial fibrillation (AF).', '2.4 MB',<a href='https://physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip' download>Download</a>),
      createData('ANSI/AAMI EC13 Test Waveforms', 'The files in this set can be used for testing a variety of devices that monitor the electrocardiogram. The recordings include both synthetic and real waveforms.', '1.1 MB',<a href='https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip' download>Download</a>),
      createData('A Pressure Map Dataset for In-bed Posture Classification', 'In this project, we collected in-bed posture pressure data from multiple adult participants using two different types of pressure sensing mats. To the best of our knowledge, our dataset, PmatData is the first publicly-available dataset of pressure sensor data which includes various sleeping postures. PmatData contains pressure data from two separate experiments.', '102.3 MB',<a href='https://physionet.org/static/published-projects/pmd/a-pressure-map-dataset-for-in-bed-posture-classification-1.0.0.zip' download>Download</a>),
      createData('Behavioral and autonomic dynamics during propofol-induced unconsciousness', 'During general anesthesia, both behavioral and autonomic changes are caused by the administration of anesthetics such as propofol. Propofol produces unconsciousness by creating highly structured oscillations in brain circuits. The anesthetic also has autonomic effects due to its actions as a vasodilator and myocardial depressant. Understanding how autonomic dynamics change in relation to propofol-induced unconsciousness is an important scientific and clinical question since anesthesiologists often infer changes in level of unconsciousness from changes in autonomic dynamics.', '1.3 GB',<a href='https://physionet.org/static/published-projects/propofol-anesthesia-dynamics/behavioral-and-autonomic-dynamics-during-propofol-induced-unconsciousness-1.0.zip' download>Download</a>),
      createData('BIDMC Congestive Heart Failure Database', 'This database includes long-term ECG recordings from 15 subjects (11 men, aged 22 to 71, and 4 women, aged 54 to 63) with severe congestive heart failure (NYHA class 3–4). This group of subjects was part of a larger study group receiving conventional medical therapy prior to receiving the oral inotropic agent, milrinone.', '580.5 MB',<a href='https://physionet.org/static/published-projects/chfdb/bidmc-congestive-heart-failure-database-1.0.0.zip' download>Download</a>),
      createData('BIDMC PPG and Respiration Dataset', 'This dataset contains signals and numerics extracted from the much larger MIMIC II matched waveform Database, along with manual breath annotations made from two annotators, using the impedance respiratory signal.', '207.8 MB',<a href='https://physionet.org/static/published-projects/bidmc/bidmc-ppg-and-respiration-dataset-1.0.0.zip' download>Download</a>),
      createData('Blood Pressure in Salt-Sensitive Dahl Rats', 'Salt-sensitive hypertension is known to be associated with dysfunction of the baroreflex control system in the Dahl salt-sensitive (SS) rat. However, neither the physiological mechanisms nor the genomic regions underlying the baroreflex dysfunction seen in this rat model are definitively known. Here, we have adopted a mathematical modeling approach to investigate the physiological and genetic origins of baroreflex dysfunction in the Dahl SS rat.', '3.4 MB',<a href='https://physionet.org/static/published-projects/bpssrat/blood-pressure-in-salt-sensitive-dahl-rats-1.0.0.zip' download>Download</a>),
      createData('Brno University of Technology ECG Quality Database (BUT QDB)', 'BUT QDB is a database created by the cardiology team at the Department of Biomedical Engineering, Brno University of Technology, for the purpose of evaluating ECG quality.', '2.2 GB',<a href='https://physionet.org/static/published-projects/butqdb/brno-university-of-technology-ecg-quality-database-but-qdb-1.0.0.zip' download>Download</a>),
      createData('CAP Sleep Database', 'The Cyclic Alternating Pattern (CAP) is a periodic EEG activity occurring during NREM sleep. ', '40.1 GB',<a href='https://physionet.org/static/published-projects/capslpdb/cap-sleep-database-1.0.0.zip' download>Download</a>),
      createData('CAST RR Interval Sub-Study Database', 'The Cardiac Arrhythmia Suppression Trial (CAST) was a landmark NHLBI-sponsored study designed to test the hypothesis that the suppression of asymptomatic or mildly symptomatic ventricular premature complexes (PVCs) in survivors of myocardial infarction (MI) would decrease the number of deaths from ventricular arrhythmias and improve survival.', '616.6 MB',<a href='https://physionet.org/static/published-projects/crisdb/cast-rr-interval-sub-study-database-1.0.0.zip' download>Download</a>)
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