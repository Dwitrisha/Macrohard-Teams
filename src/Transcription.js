import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import MicIcon from "@material-ui/icons/Mic";
import MicNoneIcon from "@material-ui/icons/MicNone";
import "./Components/css/Transcription.css";

const Transcription = () => {

  //declare state for transcription
  const { transcript, resetTranscript } = useSpeechRecognition();

  //For starting voice transcription
  var [record, setRecord] = useState(() => null);

  //check if transcription mic is switched on or not
  if (record != null) {
    if (record === true) {
      SpeechRecognition.startListening();
      document.getElementById("transcription_input").value = transcript;
    }
  }
  return (
    <div id="mic">
      {record ? (
        <MicIcon
          id="recording"
          style={{ fontSize: 40, backgroundColor: "white" }}
          onClick={(e) => setRecord(false)}
        />
      ) : (
        <MicNoneIcon
          id="not_recording"
          style={{ fontSize: 40, backgroundColor: "white" }}
          onClick={(e) => setRecord(true)}
        />
      )}
      <input id="transcription_input" />
    </div>
  );
};
export default Transcription;
