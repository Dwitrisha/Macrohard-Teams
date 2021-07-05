import React, { useState, useEffect } from "react";
import "./css/Header.css";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { FormControl } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Dark from "./img/Dark.png";
import Light from "./img/Light.png";
import DarkMode from "./Pages/Modes/DarkMode";
import LightMode from "./Pages/Modes/LightMode";
import { useStateValue } from "./Pages/StateProvider";

function Show_Options() {
  if (document.getElementById("settings_menu").style.display === "none")
    document.getElementById("settings_menu").style.display = "block";
  else document.getElementById("settings_menu").style.display = "none";
}

function search_package() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();

  if(document.getElementById("conversation")!=null)
  {
  let x = document.getElementsByClassName("conversation");
  let y=document.getElementsByClassName("chat_messages_wrapper")


  for (var i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "list-item";
    }
  }
}
}

function Header() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div id="header">
      <div id="headergrid">
        <div id="teams_heading">
          <DashboardIcon style={{ fontSize: 20 }} /> Macrohard Teams
        </div>

        <Input id="searchbar" placeholder="Search" onKeyUp={search_package}/>
        <SearchIcon
          id="searchicon"
          style={{ color: "#818183", fontSize: 22, marginTop: 5 }}
        />

        <div id="header_right">
          <img id="user_image" src={user?.photoURL} />
          <MoreHorizIcon
            style={{ color: "white", fontSize: 25 }}
            id="settings_icon"
            onClick={Show_Options}
          />
        </div>
        <div id="settings_menu">
          <h3 id="theme_heading">Themes</h3>
          <img className="settings_menu_img" src={Dark} onClick={DarkMode} />

          <img className="settings_menu_img" src={Light} onClick={LightMode} />
          <p id="modes">
            Dark Mode <div className="light_mode_title">Default Mode </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
