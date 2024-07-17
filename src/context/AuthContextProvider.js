import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../helpers/const";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Функция регистрации
  const handleRegister = async (formData) => {
    try {
      await axios.post(`${API}/user/register/`, formData);
      navigate("/login");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  // Функция входа
  const handleLogin = async (formData, email) => {
    try {
      const { data } = await axios.post(`${API}/user/login/`, formData);
      localStorage.setItem("tokens", JSON.stringify(data));
      localStorage.setItem("email", JSON.stringify(email));
      setCurrentUser(email);
      navigate("/");
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  // Функция проверки аутентификации
  // const checkAuth = async () => {
  //   try {
  //     const tokens = JSON.parse(localStorage.getItem("tokens"));
  //     const { data } = await axios.post(`${API}/user/refresh/`, {
  //       refresh: tokens.refresh,
  //     });
  //     localStorage.setItem(
  //       "tokens",
  //       JSON.stringify({ access: data.access, refresh: tokens.refresh })
  //     );
  //     const email = JSON.parse(localStorage.getItem("email"));
  //     setCurrentUser(email);
  //   } catch (error) {
  //     console.error("Ошибка проверки аутентификации:", error);
  //   }
  // };
  const checkAuth = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      console.log("Токены из localStorage:", tokens);

      if (!tokens || !tokens.refresh) {
        throw new Error("Токены отсутствуют или недействительны");
      }

      console.log("Отправка запроса на обновление токена...");
      const { data } = await axios.post(`${API}/user/refresh/`, {
        refresh: tokens.refresh,
      });

      console.log("Новые токены:", data);
      localStorage.setItem(
        "tokens",
        JSON.stringify({ access: data.access, refresh: tokens.refresh })
      );

      const email = JSON.parse(localStorage.getItem("email"));
      console.log("Текущий пользователь:", email);
      setCurrentUser(email);
    } catch (error) {
      console.error("Ошибка проверки аутентификации:", error);
    }
  };

  // Вызов функции для проверки
  checkAuth();

  // Функция выхода
  const handleLogOut = () => {
    localStorage.clear("tokens");
    localStorage.clear("email");
    setCurrentUser(null);
    navigate("/login");
  };

  // Функция сброса пароля
  const handlePasswordReset = async (emailOrLogin) => {
    try {
      await axios.post(`${API}/user/forgot_password/`, { email: emailOrLogin });
      console.log(`Requesting password reset for: ${emailOrLogin}`);
    } catch (error) {
      console.error("Ошибка восстановления пароля:", error);
      throw new Error(
        "Ошибка восстановления пароля. Пожалуйста, попробуйте снова."
      );
    }
  };

  const values = {
    handleRegister,
    handleLogin,
    currentUser,
    checkAuth,
    handleLogOut,
    handlePasswordReset,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
