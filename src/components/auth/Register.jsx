import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import "./Register.css";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSave = async () => {
    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirm", passwordConfirm);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    try {
      await handleRegister(formData);
      navigate("/login");
    } catch (error) {
      alert("Error during registration. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-container">
      <video autoPlay loop playsInline className="video-bg">
        <source src="/videos/foodvideo.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div className="register-form">
        <h1>Register</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          placeholder="Confirm the password"
        />
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First name"
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last name"
        />
        <button onClick={handleSave}>Register</button>
        <Link to="/reset-password" className="forgot-password-link">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default Register;
