import React from 'react'
import "./SchedulerForm.css";

function SchedulerForm() {
    return (
        <div id="schedule_form">
            <form>
                <label>Start Time</label>
                <br/>
                <input type="text" id="start_time"/>
                <br/>
                <label>End Time</label>
                <br/>
                <input type="text" id="end_time"/>
                <br/>
                <label>Event Name</label>
                <br/>
                <input type="text" id="text"/>
            </form>
        </div>
    )
}

export default SchedulerForm
