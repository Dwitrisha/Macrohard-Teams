import React from 'react'
import Header from '../../Header'
import Sidebar from '../../Sidebar'
import "./Note.css"
function Note() {
    return (
        <div>
            <Header/>
            <div id="note_page">
              <Sidebar/>
              <div id="note-container">
       
            </div>
            </div>
         
        </div>
    )
}

export default Note