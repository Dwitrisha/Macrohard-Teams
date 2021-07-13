import React, { useState, useEffect } from "react";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Event.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";


const Event = () => {
  const [{ user }, dispatch] = useStateValue();
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");


  //create new event on submit
  
  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("events")
      .add({
        date: date,
        name: name,
        start: start,
        end: end,
        details: details,
        organizer: user.displayName,
      })
      .then(() => {
        alert("Your has been created!👍");
        document.getElementById("event_add_form").style.display = "none";
      })
      .catch((error) => {
        alert(error.message);
      });

    setStart("");
    setEnd("");
    setName("");
    setDetails("");
    setDate("");
  };

  return (
    <form className="event_form" id="event_form" onSubmit={handleSubmit}>
 
      <center>
        <label id="event_time_title" style={{ fontSize: 20 }}>
          Create Event    
        </label>
      </center>
      <label id="event_time_title" style={{ marginLeft: "0.5rem" }}>
        Name:
      </label>
      <input
        className="form_input"
        style={{ marginLeft: "0.7rem" }}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label id="event_time_title" style={{ marginLeft: "0.8rem" }}>
        Date:
      </label>
      <input
        className="form_input"
        style={{ marginLeft: "1.2rem" }}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div id="event_time">
        <label id="event_time_title">Start:</label>
        <input
          className="form_input"
          style={{ marginLeft: "1rem" }}
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <label style={{ marginTop: "0.4rem" }} id="event_time_title">
          End:
        </label>

        <input
          className="form_input"
          style={{ marginLeft: "1rem" }}
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      <label id="event_time_title">Details:</label>
      <textarea
        className="form_input"
        id="text_area"
        placeholder="Add event details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>

      <button type="submit" id="submit_button">
        Submit
      </button>
    </form>
  );
};

export default Event;
