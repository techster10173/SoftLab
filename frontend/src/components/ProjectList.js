

import { TextField } from '@material-ui/core'
import React from 'react'

function ProjectList(props) {
    return (
        <div>
            {props.projects && props.projects.map(project => {
            return(
                <div key = {project.id}>
                    <h1>Project Name: {project.projectName}</h1>
                    <h3>Funds Available: {project.funds}</h3>
                    {/* <h3>Date Created: {project.dateCreated}</h3>
                    <h3>Date Updated : {project.dateUpdated}</h3> */}
                    {/* <h3>Date Updated : {project.dateUpdated}</h3> */}
                    <label>Enter Unit Amount</label>
                    <TextField>Change Units</TextField>
                </div>
                
            )
            })}
            
        </div>
    )
}

export default ProjectList
