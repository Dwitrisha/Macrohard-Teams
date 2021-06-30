import React from "react";
import { Button } from "@material-ui/core";

function CallBox(props) {
  return (
    <div id="call_option">
      <div>{props.call_icon}</div>
      <Button id="call_button">{props.call_name}</Button>
    </div>
  );
}

export default CallBox;
