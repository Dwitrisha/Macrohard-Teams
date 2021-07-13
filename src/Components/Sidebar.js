import React, { useParams } from "react";
import SidebarOption from "./SidebarOption";
import "./css/Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import TodayIcon from "@material-ui/icons/Today";
import PhoneIcon from "@material-ui/icons/Phone";
import Call from "./Pages/Call";
import Chat from "./Pages/Chat";
import Header from "./Header";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ConversationBar from "./Pages/Conversation/ConversationBar";
import { Link } from "react-router-dom";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

// function to pass props to SidebarOption and links all pages in the app

//responsible for navigation from page to page

function Sidebar() {
  return (
    <div>
      <div id="Sidebar_column">
        <div>
          <Link to="/home">
            <SidebarOption icon_img={<PhoneIcon />} icon_name="Calls" />
          </Link>

          <Link to="/rooms/Uzt62yRmfjlPfwtHlEvA">
            <SidebarOption icon_img={<ChatIcon />} icon_name="Chat" />
          </Link>

          <Link to="/drive">
            <SidebarOption
              icon_img={<CreateNewFolderIcon />}
              icon_name="Drive"
            />
          </Link>

          <Link to="/schedule">
            <SidebarOption icon_img={<TodayIcon />} icon_name="Events" />
          </Link>

          <Link to="/task">
            <SidebarOption icon_img={<ListAltIcon />} icon_name="Task" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
