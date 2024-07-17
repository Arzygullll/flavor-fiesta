import React, { useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importing the CSS file

const Login = () => {
  const { handleLogin, handleLogOut, currentUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Заполните поля!");
      return;
    }

    setLoading(true);

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await handleLogin(formData, email);
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/"); // Redirect after successful login
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    handleLogOut();
    // Optionally, add redirection to the logout page or another page
  };

  return (
    <div className="login-container">
      <video autoPlay loop playsInline className="video-bg">
        <source src="/videos/cookvideo.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div className={`login-form ${loading ? "loading" : ""}`}>
        <h1>Login</h1>
        <form>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleSave}>
            Войти
          </button>
          {currentUser && (
            <button className="logout-button" onClick={handleLogoutClick}>
              Выйти
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
