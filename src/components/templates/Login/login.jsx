import React, { useState, useContext } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { MyContext } from '@/MyContext';
import styles from './login.module.scss'
const login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { setIsAdmin, setIsLogged } = useContext(MyContext);
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", credentials);
      if (response.status === 200) {
        router.push("/dashboard");
      }

      const response2 = await axios.get("/api/profile");
      const roles = response2.data.roles;
      setIsLogged(true);
      for (let role of roles) {
        if (role.name === "admin") {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      setIsAdmin(false);
      setIsLogged(false);
      console.log("Error: ", error);
    }
  };

  return (
    <Container className="g-0">
      <Form className={styles.customForm} onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="mx-auto d-block" variant="primary" type="submit">Login</Button>

      </Form>
    </Container>
  )
}

export default login