
import React from 'react'

function HardwareList(props) {

    const editArticle = (article) => {
        props.editArticle(article)
    }

    return (
        <div>
            {props.articles && props.articles.map(article => {
            return(
                <div>
                    <h1>Hardware Name: {article.name}</h1>
                    <h3>Capacity: {article.capacity}</h3>
                    <h3>Unit Price: {article.unitPrice}</h3>
                    <h3>Units Used: {article.unitsUsed}</h3>

                    <div className = "row">
                        <div className = "col-md-1">
                            <button className = "btn btn-primary"
                            onClick = {() => editArticle(article)}
                            >Update</button>
                        </div>
                    </div>
                    <hr/>
                </div>
            )
            })}            
        </div>
    )
}

export default HardwareList
