import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const loginName = "julian";
const loginPass = "123";

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (username.trim() === loginName && password.trim() === loginPass) {
      console.log(username);
      console.log(password);
      login();
      onClose();
    } else {
      console.log("wrong");
      setErrorMessage("wrong username or password");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="m-4">
      <h2>Login to view private events</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="m-4" onClick={handleLogin}>
          Login
        </button>
        <button className="m-4" onClick={handleClose}>
          Close
        </button>
      </form>
      {errorMessage && <h3>{errorMessage}</h3>}
    </div>
  );
};

export default Login;
