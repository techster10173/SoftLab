import './Form.css';

import axios from 'axios';import React, {useState, useEffect} from 'react'
import APIService from './APIService'
import { TextField } from '@material-ui/core';

function Form(props) {

    const[name, setName] = useState(props.article.name)
    const[unitsUsed, setunitsUsed] = useState(props.article.unitsUsed)

    const [project , setProject] = useState([])

    // const [newHardwareUnits, setNewHardwareUnits] = ([])

    let handleProjectChange = (e) => {
        setProject(e.target.value)
      }

    useEffect(() => {
        setunitsUsed(props.article.unitsUsed)
        setName(props.article.name)
    }, [props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.name, unitsUsed)
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    }

    const setNewHardwareUnits = (event) => {
        {props.projects.filter(project => {
            if (project.projectName === event.target.id){
                project.hardwares[name] = Number(event.target.value)              
            }
        })}
        // event.target.id // has project Name
        // event.target.value // new items used
        // name // hardware id
        
    }

    // const printAllHardware = () => {
    //     console.log("printing all projects")
    //     console.log(props.projects)
    //     return(
    //         <div>
    //             {props.projects.map(project => {
    //                 return(
    //                     <div key = {project.projectName}>
    //                         <h1>Project Name: {project.projectName}</h1>
    //                         <h3>Units Used for {name}: {project.hardwares[name] || 0}</h3>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     )
    // }

    const [status, updateStatus] = useState(0)
    const [hardware, updateHardware] = useState([])

    const printAllHardware = () => {
        console.log("printing all projects")
        console.log(props.projects)

        let sum = 0;
        props.projects.forEach(project => {
            sum += parseInt(project.hardwares[name])
        });
        console.log((sum));

        // APIService.UpdateProjects(props.projects)
        // .then(resp => props.setProjects(resp))
        // .catch(error => console.log(error))

        // APIService.UpdateProjects(props.projects)
        // .then(resp => console.log(resp))
        // .catch(error => console.log(error))

        // const sta

        axios.put(`/updateHardwareCount/`, 
            {hardwareName: name, unitSum: sum})
            .then(resp => 
                APIService.UpdateProjects(props.projects)
                .then(resp => props.setProject(resp))
                .catch(error => console.log(error))
                )
            .catch(error => console.log(error));

        // APIService.UpdateHardwareCount(name, sum)
        // .then(resp => updateStatus(resp["status"]))
        // .catch(error => console.log(error))

        // console.log("printing projects")
        // console.log(props.projects)

        console.log(status)

        if (status === 200){
            console.log("less than capacity")
            // console.log("printing all projects after status of 200")
            // console.log(props.projects)
            // console.log(hardware)
            // APIService.UpdateProjects(props.projects)
            // .then(resp => props.setProjects(resp))
            // .catch(error => console.log(error))
        }
        
        
        // console.log("printing all projects")
        // console.log(props.projects)
    }


    return (
        <div>
            {props.article ? (
                            <div className = "mb=3">
                            <label htmlFor = "name" className = "form-label">Hardware Name: </label>
                            <label onChange = {(e) => setName(e.target.value)}>{name}</label>

                            {props.projects && props.projects.map(project => {
                                return(
                                    <div key = {project.projectName}>
                                        <h1>Project Name: {project.projectName}</h1>
                                        <h3>Funds: {project.funds}</h3>
                                        <h3>Units Used for {name}: {project.hardwares[name] || 0}</h3>
                                        <input type = "number"
                                        id={project.projectName}
                                        onChange={setNewHardwareUnits}
                                        // value = {project.hardwares[name] || 0}
                                        placeholder = "Enter a Quantity"
                                        />

                                    </div>
                                )
                            })}


                            {/* <input type = "text" className = "form-control"
                            value = {name}
                            placeholder = "Please Enter Name"
                            onChange = {(e) => setName(e.target.value)}
                            /> */}

                            {/* <label htmlFor = "unitsUsed" className = "form-label">Units Used</label>
                            <input type = "text" className = "form-control"
                            value = {unitsUsed}
                            placeholder = "Please Enter Units Used"
                            onChange = {(e) => setunitsUsed(e.target.value)}
                            />

                            {project}
                            <br/>
                            <select onChange = {handleProjectChange}>
                                <option value = "Select a Project"> Select a Project</option>
                                {props.projects.map((project) => <option key = {project.projectName}>{project.projectName} and {project.funds}</option>)}
                            </select> */}

                            {/* <button
                            className = "btn btn-success mt-3"
                            onClick = {updateArticle}
                            >Update Projects</button> */}

                            <button
                            className = "btn btn-success mt-3"
                            onClick = {printAllHardware}
                            >Update Projects</button>

                            
                        </div>
            ):null

            }

        </div>
    )
}

export default Form
