
import React from 'react'
import ProjectList from './ProjectList'

function Dropdown(props) {
    return (
        <div className = "dropdown">
            <div className = "dropdown-btn">Choose One</div>
            <div className = "dropdown-content">
                <div className = "dropdown-item">
                    React
                </div>
                <div className = "dropdown-item">
                    Django
                </div>
            </div>
        </div>
    )
}

export default Dropdown
