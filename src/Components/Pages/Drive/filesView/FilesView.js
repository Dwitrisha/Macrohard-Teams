import React, { useState, useEffect } from "react";
import "../styles/FilesView.css";

import FileItem from "./FileItem";
import FileCard from "./FileCard";

import db from "../../firebase";

//set files view 

const FilesView = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    db.collection("myFiles").onSnapshot((snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
  }, []);

  console.log(files);

  return (
    <div className="fileView">
      <div className="fileView__titles">
        <div className="fileView__titles--left">
          <p>Name</p>
        </div>
        <div className="fileView__titles--right">
          <p>Last modified</p>
          <p>File size</p>
        </div>
      </div>
      <div id="files-list">
        {files.map(({ id, item }) => (
          <FileItem
            id={id}
            caption={item.caption}
            timestamp={item.timestamp}
            username={item.username}
            fileUrl={item.fileUrl}
            size={item.size}
          />
        ))}

        <div id="files-card-grid">
          {files.map(({ id, item }) => (
            <FileCard
              name={item.caption}
              fileUrl={item.fileUrl}
              username={item.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilesView;
