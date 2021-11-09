

import React from 'react'

function ProjectList(props) {
    return (
        <div>
            {props.projects && props.projects.map(project => {
            return(
                <div key = {project.id}>
                    <h1>Name: {project.projectName}</h1>
                    <h3>Funds: {project.funds}</h3>
                    <h3>Date Created: {project.dateCreated}</h3>
                    <h3>Date Updated : {project.dateUpdated}</h3>
                </div>
            )
            })}
            
        </div>
    )
}

export default ProjectList
