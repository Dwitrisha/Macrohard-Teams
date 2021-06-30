import { db, auth } from "./firebase";
import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import "../css/Register.css";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password);
    alert("Registration Successful!").catch((error) => alert(error.message));
  };
  
  return (
    <div id="register_page">
      <div style={{ textAlign: "right" }}>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      </div>
      <form className="register_form">
        <Input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

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
        <Button onClick={handleRegister}>Register</Button>
      </form>

    </div>
  );
}

export default Register;
