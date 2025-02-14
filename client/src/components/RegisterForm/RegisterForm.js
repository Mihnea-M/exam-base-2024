import "./RegisterForm.css";
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../state/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("regular");
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    user.register(email, password, selectedRole);
  };

  useEffect(() => {
    user.emitter.addListener("REGISTER_SUCCESS", () => {
      navigate("/login");
    });
  }, []);

  return (
    <div className="register-form">
      <div className="form-container">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="regular">Regular</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
}

export default RegisterForm;
