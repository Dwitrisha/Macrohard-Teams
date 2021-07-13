import React, { useState } from "react";
import "./EventBox.css";
import DeleteIcon from "@material-ui/icons/Delete";
import db from "../firebase";

function EventBox(props) {
  const [events, setEvents] = useState([]);

  //delete event on click from db

  const deleteEvent = (id) => {
    db.collection("events")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  const showEventDetails = (id) => {
    var details = props.details;
    var start = props.start;
    var end = props.end;
    var date = props.date;
    var organizer = props.organizer;

    document.getElementById("event-show-form").style.display = "block";
    document.getElementById("event-show-date").value = date;
    document.getElementById("event-show-time").value = start + "-" + end;
    document.getElementById("event-show-details").value = details;
    document.getElementById("event-show-organizer").value = organizer;
  };

  return (
    <div>
      <div id="event_box">
        <div id="event_title">
          <div id="event_name">{props.name}</div>
          <DeleteIcon id="delete_icon" onClick={() => deleteEvent(props.id)} />
        </div>

        <div id="event_date">{props.date}</div>

        <button id="view_button" onClick={() => showEventDetails(props.id)}>
          View
        </button>
      </div>
    </div>
  );
}

export default EventBox;
