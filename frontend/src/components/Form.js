import './Form.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react'

function Form(props) {

    const[name, setName] = useState(props.article.name);
    const[delta, setDelta] = useState({});

    // useEffect(() => {
    //     setunitsUsed(props.article.unitsUsed)
    //     setName(props.article.name)
    // }, [props.article])

    const setNewHardwareUnits = (event) => 
    {
        props.projects.forEach(project => {
            if (project.id === event.target.id){
                let deltaEntry = {}
                deltaEntry[event.target.id] = event.target.value - (project.hardwares[name] || 0);
                setDelta({...delta, ...deltaEntry});
            }
        });   
    }

    const printAllHardware = () => {
        let sum = props.article.unitsUsed;
        
        for (const property in delta) {
            sum += delta[property];
        }

        axios.put("/api/hardware/", {
            hardwareName: name,
            unitSum: sum,
            projectsDelta: delta
        }).then(resp => {
            props.setProjects(resp.data.projectData[0]);
            props.setNewHardwares(name, sum)
        }).catch(err => {
            console.error(err);
        });
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
                                        <h3>Units Used for {name}: {(project.hardwares[name] || 0)}</h3>
                                        <input type = "number"
                                        id={project.id}
                                        onChange={setNewHardwareUnits}
                                        // value = {project.hardwares[name] || 0}
                                        placeholder = "Enter a Quantity"
                                        />

                                    </div>
                                )
                            })}


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
