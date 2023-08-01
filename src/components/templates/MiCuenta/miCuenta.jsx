import React, { useState } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';
import { useRouter } from "next/navigation";

const miCuenta = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const getProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      setUser({ email: response.data.email, username: response.data.username });
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  return (
    <Container>
      <h1>Mi Cuenta</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={getProfile}>get profile</button>
      {/* <button onClick={logout}>Logout</button> */}
    </Container>
  )
}

export default miCuenta