import React from "react";

function Recorder(setRecord) {
  const { transcript, resetTranscript } = useSpeechRecognition();

  //For starting voice transcription
  var [record, setRecord] = useState(() => null);

  if (record != null) {
    if (record === true) {
      SpeechRecognition.startListening();
      document.getElementById("transcript_input").value = transcript;
    }
    if (record === false) {
      SpeechRecognition.stopListening();
    }
  }
}

export default Recorder;
