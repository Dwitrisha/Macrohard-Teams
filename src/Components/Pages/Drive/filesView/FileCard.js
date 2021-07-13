import React from "react";
import "../styles/FileCard.css";

import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

//each item card

const FileCard = ({ name, fileUrl, username }) => {
  return (
    <div>
      <a href={fileUrl} target="_blank" download>
        <div className="fileCard">
          <div className="fileCard--top">
            <InsertDriveFileIcon style={{ fontSize: 130, color: "#464775" }} />
          </div>

          <div className="fileCard--bottom">
            <p className="item-name">
              {name}
              <br />~{username}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default FileCard;
