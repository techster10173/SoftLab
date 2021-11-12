import './App.css';
import './Hardware.css';
import {useState, useEffect} from "react";
import HardwareList from './components/HardwareList';
import Form from './components/Form';
import {Navbar} from "./Toolbar.jsx"
import axios from 'axios';
import { HardwareTable } from './HardwareTable';

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
      <div className = "big_container">
        <div className = "container1">
            <HardwareTable hardware={hardware} editFocusHardware={editFocusHardware} />
        </div>

        <div className = "container2">
          {focusHardware ? <Form focusHardware={focusHardware} projects={projects} setProjects={setProjects} setNewHardwares={setNewHardwares} setHardwares={setHardwares}/> : null}
        </div>
      </div>
    </>
  );
}

