


import React, {useState, useEffect} from 'react'
import APIService from './APIService'

function Form(props) {

    const[name, setName] = useState(props.article.name)
    const[unitsUsed, setunitsUsed] = useState(props.article.unitsUsed)

    useEffect(() => {
        setunitsUsed(props.article.unitsUsed)
        setName(props.article.name)
    }, [props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.name, unitsUsed)
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    }

    return (
        <div>
            {props.article ? (
                            <div className = "mb=3">
                            <label htmlFor = "name" className = "form-label">Name</label>
                            <input type = "text" className = "form-control"
                            value = {name}
                            placeholder = "Please Enter Name"
                            onChange = {(e) => setName(e.target.value)}
                            />

                            <label htmlFor = "unitsUsed" className = "form-label">Units Used</label>
                            <input type = "text" className = "form-control"
                            value = {unitsUsed}
                            placeholder = "Please Enter Units Used"
                            onChange = {(e) => setunitsUsed(e.target.value)}
                            />

                            <button
                            className = "btn btn-success mt-3"
                            onClick = {updateArticle}
                            >Update</button>

                            
                        </div>
            ):null

            }

        </div>
    )
}

export default Form
