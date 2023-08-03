import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import styles from './create.module.scss';

const create = () => {
  const [params, setParams] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const router = useRouter();

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/create", params);
      if (response.status === 200) {
        router.push("/create");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <Container>
      <Form className={styles.customForm} onSubmit={handleSubmit} autoComplete="nope">
        <Form.Group className="mb-3">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
            autoComplete="nope"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            autoComplete="nope"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
            autoComplete="new-password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          {/* <Form.Label>Es admin?</Form.Label> */}
          <Form.Check
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            value={true}
            label="Es admin?"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Crear</Button>
      </Form>
    </Container>
  )
}

export default create