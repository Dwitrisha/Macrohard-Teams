import React from "react";
import Scheduler from "./Scheduler/Scheduler";
import Sidebar from "../Sidebar";
import "../css/Calendar.css";
import Header from "../Header";

function Calendar() {
  const data = [
    {
      start_date: "2020-06-10 6:00",
      end_date: "2020-06-10 8:00",
      text: "Event 1",
      id: 1,
    },
    {
      start_date: "2020-06-13 10:00",
      end_date: "2020-06-13 18:00",
      text: "Event 2",
      id: 2,
    },
  ];

  return (
    <div>
      <Header />
      <div id="calendar_page">
        <Sidebar />
        <div id="scheduler-container" className="scheduler-container">
          <Scheduler events={data} />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
