import React, { useState, useEffect } from "react";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Event.css"

const Event = () => {
  const [{ user }, dispatch] = useStateValue();
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("events")
      .add({
        date: date,
        start: start,
        end: end,
        details: details,
        organizer:user.displayName,
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
    setDetails("");
  };

  return (
    <form className="event_form" onSubmit={handleSubmit}>
       <center> <label id="event_time_title" style={{fontSize:20}}>Create Event</label></center>
       <label id="event_time_title"  style={{marginLeft:"1rem"}}>Date:</label>
      <input className="form_input" style={{marginLeft:"1rem"}}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
<div id="event_time">
      <label id="event_time_title">Start:</label>
      <div >
        <select className="form_input" value={start} onChange={(e) => setStart(e.target.value)}>
          <option value="00:00">00:00</option>
          <option value="01:00">01:00</option>
          <option value="02:00">02:00</option>
          <option value="03:00">03:00</option>
          <option value="04:00">04:00</option>
          <option value="05:00">05:00</option>
          <option value="06:00">06:00</option>
          <option value="07:00">07:00</option>
          <option value="08:00">08:00</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
          <option value="23:00">23:00</option>
          <option value="24:00">24:00</option>
        </select>
      </div>

      <label style={{marginTop:"0.4rem"}} id="event_time_title">End:</label>
      <div >
        <select className="form_input" value={end} onChange={(e) => setEnd(e.target.value)}>
          <option value="00:00">00:00</option>
          <option value="01:00">01:00</option>
          <option value="02:00">02:00</option>
          <option value="03:00">03:00</option>
          <option value="04:00">04:00</option>
          <option value="05:00">05:00</option>
          <option value="06:00">06:00</option>
          <option value="07:00">07:00</option>
          <option value="08:00">08:00</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
          <option value="23:00">23:00</option>
          <option value="24:00">24:00</option>
        </select>
      </div>

      </div>

      <label id="event_time_title">Details:</label>
      <textarea className="form_input" id="text_area"
        placeholder="Add event details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>

      <button
        type="submit" id="submit_button"
      >
        Submit
      </button>
    </form>
  );
};

export default Event;
