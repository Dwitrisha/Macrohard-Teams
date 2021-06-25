import React from 'react'
import Call from '../Call'
import Chat from '../Chat'

function DarkMode() {

 
    //Dark Mode for header 

   document.getElementById("Sidebar_column").style.backgroundColor="#141414";
   document.getElementById("header").style.backgroundImage="linear-gradient(to left, black ,#232324)";
   document.getElementById("searchbar").style.backgroundColor="grey";
   document.getElementById("searchbar").style.color="white";
   document.getElementById("searchicon").style.backgroundColor="grey";
   document.getElementById("searchicon").style.color="black";
   document.getElementById("settings_menu").style.backgroundColor="black";
   document.getElementById("settings_menu").style.color="black";
   document.getElementById("theme_heading").style.color="white";
   document.getElementById("modes").style.color="white";
   

    //Dark Mode styling for chat page 
    if(document.getElementById("chat_page")!=null)
    {
   document.getElementById("chat_menu").style.backgroundColor="#141414";
   document.getElementById("chat_menu_heading").style.color="white";
   document.getElementById("message_heading").style.color="white";
   document.getElementById("conversation_name").style.color="white";
   document.getElementById("conversation").style.color="white";
   document.getElementById("conversation").style.backgroundColor="rgba(99, 99, 99, 0)";
   document.getElementById("chat_box").style.backgroundColor="#1f1f1f";
   document.getElementById("chat_box_bottom").style.backgroundColor="#1f1f1f";
   document.getElementById("chat_send").style.backgroundColor="#1f1f1f";
   document.getElementById("chat_message_input").style.backgroundColor="rgb(56, 56, 56)";
   document.getElementById("chat_message_input").style.color="white";
   document.getElementById("chat_message_input").style.borderBottom="solid 2px #9ea2ff";
   document.getElementById("message_heading").style.borderBottom="solid 1.5px  #0a0a0a";
   document.getElementById("chat_menu_heading").style.borderBottom=" solid 1.5px #000000 ";
   document.getElementById("chat_send").style.color="white";
   
    }


   //Dark Mode styling for call page
   if(document.getElementById("homepage")!=null)
   {
    document.getElementById("call_grid").style.backgroundImage="linear-gradient(to top,black,#282829)";
    document.getElementById("call_heading").style.color="white";
    document.getElementById("call_heading2").style.color="white";

    
   }

   //Dark Mode for connecting page

   if(document.getElementById("video_div")!=null)
   {
    document.getElementById("video_div").style.backgroundImage="linear-gradient(to top,black,#282829)";
    document.getElementById("call_heading").style.color="white";
    document.getElementById("person_icon").style.color="white";
    document.getElementById("input_name").style.color="white";



   }
   
  
   
  
}

export default DarkMode


