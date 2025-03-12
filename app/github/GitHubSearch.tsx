"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import GitHubUser from "./GitHubUser";

export default function GitHubSearch() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUserData(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError("User not found. Try another username.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Find GitHub User</h1>
      <form onSubmit={fetchUser}>
      <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Find</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {userData && <GitHubUser user={userData} />}
    </div>
  );
}