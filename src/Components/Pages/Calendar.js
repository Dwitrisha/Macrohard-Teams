import React, { useState, useEffect } from "react";
import Event from "./Scheduler/Event";
import db from "../Pages/firebase";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "../css/Calendar.css";
import EventBox from "./Scheduler/EventBox";
import { Scrollbars } from "react-custom-scrollbars";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function ShowEventForm() {
  if (document.getElementById("event_add_form").style.display === "none")
    document.getElementById("event_add_form").style.display = "block";
  else document.getElementById("event_add_form").style.display = "none";
}


function CloseEventForm() {
  document.getElementById("event-show-form").style.display = "none";
  }

function Calendar() {
  const { eventId } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    db.collection("events")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) => {
        setEvents(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              date: doc.data().date,
              name: doc.data().name,
              start: doc.data().start,
              end: doc.data().end,
              details: doc.data().details,
              organizer: doc.data().organizer,
            };
          })
        );
      });
  }, []);

  return (
    <div id="scheduler-page">
      <Header />
      <Sidebar />

      <div id="scheduler-container">
        <div id="add-button" onClick={ShowEventForm}>
          <AddIcon style={{ color: "white" }} fontSize="large" />
          Add Event
        </div>

        <div id="event_add_form" style={{ display: "none" }}>
          <Event />
        </div>

        <div className="event_boxes" id="event_boxes">
          {events.map((event) => (
            <EventBox
              id={event.id}
              date={event.date}
              start={event.start}
              end={event.end}
              name={event.name}
              details={event.details}
              organizer={event.organizer}
            />
          ))}
        </div>
        <h4>Event Details:</h4>
       
        <div id="event-show-form" style={{ display: "none" }}>
        <HighlightOffIcon id="close_form_icon" style={{marginLeft:"90%"}} onClick={CloseEventForm}/>
          <div id="form-grid">
            <div>
              <label className="form_label">Date:</label>
              <br/>
              <input className="form_input" id="event-show-date" readOnly />
            </div>
            <div>
              <label className="form_label">Slot:</label>
              <br/>
              <input className="form_input" id="event-show-time" readOnly />
            </div>
            <div>
              <label className="form_label">Organizer:</label>
              <br/>
              <input
                className="form_input"
                id="event-show-organizer"
                readOnly
              />
            </div>

          </div>
       
          <h3 className="form_label">Details:</h3>
          <textarea className="form_input" style={{width:"92%",height:"10vh"}} id="event-show-details" readOnly />
        </div>
        <div id="note">Click on an event to view!</div>
      </div>
    </div>
  );
}

export default Calendar;
