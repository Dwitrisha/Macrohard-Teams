import React, { useState } from 'react';
import '../css/Chat.css'
import Sidebar from '../Sidebar' 
import Conversation from './Conversation/Conversation'
import Message from './Message/Message'
import CreateIcon from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Picker from 'emoji-picker-react';


function showEmoji() {



    var x = document.getElementById("Emoji_List");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

function Chat() {
 
        const [chosenEmoji, setChosenEmoji] = useState(null);
         
       
        const onEmojiClick = (event, emojiObject) => {
          setChosenEmoji(emojiObject);
          if(chosenEmoji)
         document.getElementById("mytextarea").value+= chosenEmoji.emoji;
        
        };


        
    return (
        <div>
<div className="messenger" >
<Sidebar/>
   <div id="chat_menu">
      <div className="chat_menu_wrapper">
       <div id="chat_menu_heading" >
           <div style={{marginLeft:"1rem"}}>Chat<CreateIcon style={{fontSize:20, marginLeft:"12rem"}}/></div>
           </div>
           <Conversation/>
      </div>
      </div>

   <div id="chat_box">
   <div className="chat_box_wrapper">
   <div className="chat_box_top">
   <div id="message_heading">Jane Doe</div>
   <div id="Emoji_List">
        <Picker onEmojiClick={onEmojiClick} />
        </div>
       <div className="chat_box_background">
      
   <div className="chat_box_bottom"> 
       
    <textarea id="mytextarea" id="chat_message_input" placeholder="Type a new message" 
     
    />
    
    <div id="chat_send">
   
        <AttachFileIcon />
        <SentimentVerySatisfiedIcon onClick={showEmoji}/>
        <SendIcon style={{ marginLeft:"42rem"}}/>
      
        </div>
    </div>
   </div>
   <div id="messages" className="chat_messages_wrapper">
   <Message/>
   <Message own={true}/>
   <Message/>
   <Message/>
   <Message own={true}/>
   <Message/>
   <Message/>
   <Message own={true}/>
   <Message/>
   </div>
  
   </div>

  
   </div>
   </div>
  
   </div>
 </div>
    )
}

export default Chat
