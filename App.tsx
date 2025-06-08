import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import UsersPage from "./components/UsersPage";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");

  if (!loggedIn) {
    return (
    <LoginPage
  onLogin={(e: string, d: string) => {
    setEmail(e);
    setDept(d);
    setLoggedIn(true);
  }}
/>

    );
  } else {
    return (
      <UsersPage email={email} department={dept} onLogout={() => setLoggedIn(false)} />
    );
  }
}
