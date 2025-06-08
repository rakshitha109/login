import React, { useEffect, useState, useRef } from "react";
import "./UsersPage.css";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  email: string;
  department: string;
  onLogout: () => void;
}

export default function UsersPage(props: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const listDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  async function loadUsers(p: number) {
    setLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=10&_page=${p}`);
      const data = await res.json();
      setUsers(prev => [...prev, ...data]);
    } catch {
      // Keep it simple, no error handling
    }
    setLoading(false);
  }

  useEffect(() => {
    function onScroll() {
      if (!listDiv.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listDiv.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        setPage(prev => prev + 1);
      }
    }

    const div = listDiv.current;
    if (div) {
      div.addEventListener("scroll", onScroll);
    }

    return () => {
      if (div) {
        div.removeEventListener("scroll", onScroll);
      }
    };
  }, [loading]);

  return (
    <div className="usersPage">
      <div className="user-header">
        <span>{props.email} ({props.department})</span>
        <button className="logout-btn" onClick={props.onLogout}>Logout</button>
      </div>

      <div className="user-list" ref={listDiv}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {users.map(user => (
            <li key={user.id} className="user-item">
              <b>{user.name}</b>
              <small>{user.email}</small>
            </li>
          ))}
        </ul>
        {loading && <p className="loading-text">Loading...</p>}
      </div>
    </div>
  );
}
