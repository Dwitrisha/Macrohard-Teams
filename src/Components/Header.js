import React from 'react'
import './css/Header.css'
import {Button} from '@material-ui/core'
import {Input} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { FormControl} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Dark from "./img/Dark.png"
import Light from "./img/Light.png"
import DarkMode from './Pages/Modes/DarkMode';
import LightMode from './Pages/Modes/LightMode';

function Show_Options(){
if(document.getElementById("settings_menu").style.display==="none")
document.getElementById("settings_menu").style.display="block";
else
document.getElementById("settings_menu").style.display="none";
}
function Header() {
    return (
        <div id="header">
            
            <div id="headergrid">
                

           <div id="teams_heading"><DashboardIcon style={{ fontSize:20}}/> Macrohard Teams</div> 
 <Input id="searchbar" placeholder="Search" /> <SearchIcon id="searchicon" style={{color: "#818183", fontSize:25, marginTop: 5 }}/>



<div id="header_right">
<img id="user_image" src="data:image/jpeg;base64,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"/>
<MoreHorizIcon style={{ color: "white", fontSize:25 }} id="settings_icon" onClick={Show_Options} />
</div>
<div id="settings_menu">
 <h3 id="theme_heading">Themes</h3>
    <img className="settings_menu_img" src={Dark} onClick={DarkMode}/>
   
    <img className="settings_menu_img" src={Light} onClick={LightMode}/>
    <p id="modes">Dark Mode    <div className="light_mode_title">Default Mode </div> </p> 

</div>
          </div>
          </div>
    )
}

export default Header
