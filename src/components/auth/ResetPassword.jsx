import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { handlePasswordReset } = useAuth();
  const navigate = useNavigate();
  const [emailOrLogin, setEmailOrLogin] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      videoRef.current.volume = 0.3;
    }
  }, []);

  const handleResetPassword = async () => {
    if (!emailOrLogin.trim()) {
      alert("Please enter your email or login to recover your password.");
      return;
    }

    try {
      await handlePasswordReset(emailOrLogin);
      alert("A password recovery link has been sent to your email.");
      navigate("/login"); // Перенаправляем на страницу входа после успешного восстановления
    } catch (error) {
      alert("Error recovering password. Please try again.");
      console.error("Password recovery error:", error);
    }
  };

  return (
    <div className="reset-password-container">
      <video autoPlay loop playsInline className="video-bg">
        <source src="/videos/restaurantvideo.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div className="reset-password-form">
        <h1>Password recovery</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Your email or login:
            <input
              type="text"
              value={emailOrLogin}
              onChange={(e) => setEmailOrLogin(e.target.value)}
              placeholder="Enter your email or login"
            />
          </label>
          <button onClick={handleResetPassword}>Restore password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
