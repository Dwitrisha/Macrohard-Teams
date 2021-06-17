import React from 'react'
import './css/SidebarOption.css'

function SidebarOption(props) {
    return (
        <div id="icon" >
        <div id="icon_img">
            {props.icon_img} 
        </div>
        <div id="icon_name">{props.icon_name} </div>
        </div>
    )
}

export default SidebarOption