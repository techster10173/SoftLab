import './App.css';
import './Hardware.css';
import {useState, useEffect} from "react";
import Form from './Form';
import {Navbar} from "./Toolbar.jsx"
import axios from 'axios';
import { HardwareTable } from './HardwareTable';
import {Grid, ListItem, Pagination} from '@mui/material';

export function Hardware () {

  const [hardware, setHardwares] = useState([]);
  const [projects, setProjects] = useState([]);
  const [focusHardware, setFocusHardware] = useState(null);
  const [projectOffset, setProjectOffset] = useState(0);
  const [hardwareOffset, setHardwareOffset] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalHardware, setTotalHardwares] = useState(0);


  const updateOffsetProject = (e, val) => {
    setProjectOffset( val - 1);
  }

  const updateOffsetHardware = (e, val) => {
    setHardwareOffset(val - 1);
  }

  useEffect(() => {
    axios.get(`/api/hardware/?offset=${hardwareOffset}`)
    .then(resp => {
      setHardwares(resp.data.hardwareData)
      const totalHardware = resp.data.totalHardware;
      setTotalHardwares(totalHardware)
    })
    .catch(error => console.error(error))
  }, [hardwareOffset]);

  useEffect(() => {
    axios.get(`/api/projects/?offset=${projectOffset}`)
    .then(resp => {
      setProjects(resp.data.projectData);
      const totalProjects = resp.data.totalProjects;
      setTotalProjects(totalProjects)

    })
    .catch(error => console.error(error))
  },[projectOffset]);

  const editFocusHardware = (hardware) => {
    setFocusHardware(hardware);
  }

  const setNewHardwares = () => {
    axios.get("/api/hardware")
    .then(resp => setHardwares(resp.data.hardwareData))
    .catch(error => console.log(error));
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
          <Grid item xs = {6}>
            <ListItem>
              <Pagination sx={{width: 'auto' , marginBottom: 5, justifyContent: 'left', display : 'flex'}} align="middle" count={Math.floor(totalHardware/11)+1} onChange={updateOffsetHardware}/>
            </ListItem>
          </Grid>
          <Grid item xs = {6}>
            <ListItem>
              {focusHardware ? <Pagination sx={{width: 'auto' , marginBottom: 5, justifyContent: 'left', display : 'flex'}} align="middle" count={Math.floor(totalProjects/11)+1} onChange={updateOffsetProject}/> : null}
            </ListItem>
          </Grid>
        </Grid>
    </>
  );
}

