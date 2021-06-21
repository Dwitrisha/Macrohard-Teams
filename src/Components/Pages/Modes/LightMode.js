import React from 'react'
import Call from '../Call'
import Chat from '../Chat'

function LightMode() {

  
  //Light Mode for header 
   document.getElementById("Sidebar_column").style.backgroundColor="#ebebeb";
   document.getElementById("header").style.backgroundColor=" #464775";
   document.getElementById("searchbar").style.backgroundColor="#dadae3";
   document.getElementById("searchicon").style.backgroundColor="#dadae3";
   document.getElementById("searchbar").style.color="black";
   document.getElementById("settings_menu").style.color="black";
   document.getElementById("settings_menu").style.backgroundColor="white";
   document.getElementById("header").style.backgroundImage="linear-gradient(to left, #464775 ,#717396, #464775 )";

    //Light Mode styling for chat page 

    if(document.getElementById("chat_page")!=null)
    {
   document.getElementById("chat_menu").style.backgroundColor="#f0f0f0";
   document.getElementById("chat_menu_heading").style.color="black";
   document.getElementById("message_heading").style.color="black";
   document.getElementById("conversation_name").style.color="black";
   document.getElementById("conversation").style.backgroundColor="rgba(99, 99, 99, 0)";
   document.getElementById("chat_box").style.backgroundColor="#f5f5f5";
   document.getElementById("chat_send").style.backgroundColor="#f5f5f5";
   document.getElementById("chat_message_input").style.backgroundColor="white";
   document.getElementById("chat_message_input").style.borderBottom=" solid 2px #464775";
   document.getElementById("message_heading").style.backgroundColor="#f5f5f5";
   document.getElementById("message_heading").style.borderBottom="solid 1.5px  #f5f5f5";
   document.getElementById("chat_menu_heading").style.borderBottom=" solid 1.5px rgb(207, 207, 207)";
   document.getElementById("chat_send").style.color="#464775";
   document.getElementById("chat_message_input").style.color="black";
    }
  
   //Light Mode for call mode
   if(document.getElementById("call")!=null)
   {
    document.getElementById("callbox_grid").style.backgroundImage="linear-gradient(to top,#ede9f7,#f5f5f5,#ede9f7)";
 
   }
   

}

   
export default LightMode
