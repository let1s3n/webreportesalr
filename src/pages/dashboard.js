import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const getProfile = async () => {
    try {
      const response = await axios.get("/api/profile");

      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={getProfile}>get profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default dashboard;
