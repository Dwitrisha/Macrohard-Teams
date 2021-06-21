import React from 'react'
import SidebarOption from './SidebarOption'
import './css/Sidebar.css'
import ChatIcon from '@material-ui/icons/Chat'
import TodayIcon from '@material-ui/icons/Today';
import PhoneIcon from '@material-ui/icons/Phone';
import Call from './Pages/Call';
import Chat from './Pages/Chat';
import Header from './Header'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import {Link} from 'react-router-dom';
function Sidebar() {

    return (
        <div>
            <div id="Sidebar_column"> 
                <div >
                    <Link><SidebarOption icon_img={<PeopleOutlineIcon />} icon_name="Teams"/> </Link>
                    
                    <Link to="/calendar"><SidebarOption icon_img={<TodayIcon />} icon_name="Events"/></Link>
               
                    <Link to="/chat"><SidebarOption icon_img={<ChatIcon />} icon_name="Chat"/></Link>

                   <Link to="/"><SidebarOption icon_img={<PhoneIcon/>} icon_name="Calls"/></Link>
                </div>
              </div>
        </div>
    )
}

export default Sidebar
