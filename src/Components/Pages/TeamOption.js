import React from 'react'
import './css/TeamOption.css'

function TeamOption(props) {
    return (
        <div id="team_box">
       
        <img id="team_img" src= {props.team_img}/>
            <div id="team_name">{props.team_name} </div>
 
        </div>
    )
}

export default TeamOption