import React, { useState } from "react";
import "./LoginPage.css";

interface Props {
  onLogin: (email: string, dept: string) => void;
}

export default function LoginPage(props: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const userEmail = "user@abc.com";
  const userPass = "12345";
  const userDept = "IT";

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!email || !password || !department) {
      setError("Please fill all fields");
      return;
    }
    if (!email.includes("@")) {
      setError("Email is invalid");
      return;
    }
    if (email === userEmail && password === userPass && department === userDept) {
      props.onLogin(email, department);
    } else {
      setError("Wrong email/password/department");
    }
  }

  return (
    
    <div className="loginPage">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div>
          <label>Department</label>
          <input
            value={department}
            onChange={e => setDepartment(e.target.value)}
            type="text"
          />
        </div>
        {error && <p className="errormsg">{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}
