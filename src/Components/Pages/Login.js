import { db, auth } from "./firebase";
import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import "../css/Login.css";
import { Link,Redirect} from "react-router-dom";
import Home from "../../Home";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

      
  };




  return (
    
    <div>
      <div id="login_page">
        <div className="login-container" style={{ textAlign: "right" }}>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
        <form className="login_form">
          <Input
            placeholder="EMAIL"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <Input
            placeholder="PASSWORD"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button style={{ marginTop: "2rem" }} onClick={handleLogin}>
            Login
          </Button>
        </form>

        {user?.displayName ? (
     <Home/>
      
      ) : (
        <center>
          <h3>Login to upload</h3>
        </center>
      )}
      
      </div>

      
    </div>
    
  );
}

export default Login;
