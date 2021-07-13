import React from "react";
import NewFile from "./filesView/NewFile";
import FilesView from "./filesView/FilesView";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import "./Drive.css";
function Drive() {
  return (
    <div>
      <Header />
      <div id="drive_page">
        <Sidebar />
        <div id="drive-container">
          <div id="new-file">
            <NewFile />
          </div>

          <div id="drive-files">
            <FilesView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drive;
