import { useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";

const Register = () => {
  const { handleRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSave = () => {
    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      alert("Заполните данные");
      return;
    }
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirm", passwordConfirm);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    handleRegister(formData);
    // console.log(formData);
  };

  return (
    <div style={{ marginTop: "80px" }}>
      <h1>Register</h1>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <input
        onChange={(e) => setPasswordConfirm(e.target.value)}
        type="password"
        placeholder="password-confirm"
      />
      <input
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        placeholder="first-name"
      />{" "}
      <input
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        placeholder="last-name"
      />
      <button onClick={handleSave}>Register</button>
    </div>
  );
};

export default Register;
