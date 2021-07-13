import { Button } from "@material-ui/core";
import React from "react";
import LoginPic from "../img/LoginPic.png";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import "../css/Login.css";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        <div id="login-container">
          <h2 id="login_heading">Please login to continue</h2>
          <img src={LoginPic} style={{ width: "70%" }}></img>
          <br />
          <Button id="login_button" type="submit" onClick={signIn}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
