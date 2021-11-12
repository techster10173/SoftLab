import './App.css';
import './Hardware.css';
import {useState, useEffect} from "react";
import HardwareList from './components/HardwareList';
import Form from './components/Form';
import {Navbar} from "./Toolbar.jsx"
import axios from 'axios';
import { HardwareTable } from './HardwareTable';
import {Table, TableContainer, TableCell, TableBody, TableHead, TableRow, Paper, Button, Pagination, Grid, ListItem} from '@mui/material';

export function Hardware () {

  const [hardware, setHardwares] = useState([])
  const [focusHardware, setFocusHardware] = useState(null)
  const [offset, setOffset] = useState(0);
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get("/api/hardware")
    .then(resp => setHardwares(resp.data.hardwareData))
    .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    axios.get(`/api/projects/?offset=${offset}`)
    .then(resp => setProjects(resp.data.projectData))
    .catch(error => console.error(error))
  },[offset]);

  const editFocusHardware = (hardware) => {
    console.log(hardware);
    setFocusHardware(hardware);
  }

  const setNewHardwares = (name, sum) => {
    console.log(name)
    console.log(sum)

    let newHardware = hardware

    newHardware.map(article => {
      if (article.name === name){
        article.unitsUsed = sum;
      }
      return article
    });

    setHardwares(newHardware);
    // axios.get("/api/hardware")
    // .then(resp => setHardwares(resp.data.hardwareData))
    // .catch(error => console.log(error))
  }


  return (
    <>
      <Navbar/>
        <Grid container rowSpacing={1} columnSpacing={{xs:1, sm:2, md:3}}>
          <Grid item xs = {6}>
            <ListItem>
              <HardwareTable hardware={hardware} editFocusHardware={editFocusHardware} />
            </ListItem>
          </Grid>
          <Grid item xs = {6}>
            <ListItem>
              {focusHardware ? <Form focusHardware={focusHardware} projects={projects} setProjects={setProjects} setNewHardwares={setNewHardwares} setHardwares={setHardwares}/> : null}
            </ListItem>
          </Grid>
        </Grid>
    </>
  );
}

