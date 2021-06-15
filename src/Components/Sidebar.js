import React from 'react'
import SidebarOption from './SidebarOption'
import './css/Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat'
import TodayIcon from '@material-ui/icons/Today';
import PhoneIcon from '@material-ui/icons/Phone';
import Calendar from './Pages/Calendar'
import Call from './Pages/Call';
import Chat from './Pages/Chat';
import Header from './Header'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
function Sidebar() {

    return (
        <div>
            
            <div id="Sidebar_column">

    <main>
<div >
<SidebarOption icon_img={<PeopleOutlineIcon />} icon_name="Teams"/> 
<SidebarOption icon_img={<TodayIcon />} icon_name="Calendar"/>
<SidebarOption icon_img={<ChatIcon />} icon_name="Chat"/>
<SidebarOption icon_img={<PhoneIcon/>} icon_name="Calls"/>
</div>

    </main>

  
      
    
        

            

         
    
              </div>
        </div>
    )
}

export default Sidebar
