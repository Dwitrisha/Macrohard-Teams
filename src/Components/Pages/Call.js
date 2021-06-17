import React from 'react'
import '../css/Call.css'
import Sidebar from '../Sidebar'
import CallOption from './Call/CallOption'
import CallBox from './Call/CallBox'


function Call() {
    return (
        <div id="call">

               <Sidebar/>
               <div id="call_boxes_wrapper">
                <CallOption/>
                </div>
         
        </div>
    )
}

export default Call
