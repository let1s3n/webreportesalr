import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { MyContext } from '@/MyContext';
import { loginRequest } from "@/authConfig";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from './login.module.scss'
const login = () => {
  const { instance } = useMsal();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { isLogged, isAdmin, setIsAdmin, setIsLogged } = useContext(MyContext);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin("popup");

    try {
      const response = await axios.post("/api/auth/login", credentials);

      console.log("LOGIN RESPONSE STATUS: ", response.status)
      if (response.status === 200) {
        router.push("/mi-cuenta");
      }

      const response2 = await axios.get("/api/profile");
      if (response2.status === 200) {
        setIsLogged(true);

        const roles = response2.data.roles;
        for (let role of roles) {
          if (role.name === "admin") {
            setIsAdmin(true);
          }
        }
      }
    } catch (error) {
      console.log("ERROR NAPO");
      console.log("Error: ", error);
      setIsAdmin(false);
      setIsLogged(false);
      console.log("Error: ", error);
    }
  };

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => { console.error(`loginPopup failed: ${e}`) });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => { console.error(`loginRedirect failed: ${e}`) })
    };
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

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
          <div className="position-relative">
            <Form.Control
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              onChange={handleChange}
            />
            {
              showPassword
                ?
                <AiFillEyeInvisible onClick={handleShowPassword} className="position-absolute" style={{ cursor: "pointer", width: "1rem", top: "50%", right: ".5rem", transform: "translateY(-0.5rem)" }} />
                :
                <AiFillEye onClick={handleShowPassword} className="position-absolute" style={{ cursor: "pointer", width: "1rem", top: "50%", right: ".5rem", transform: "translateY(-0.5rem)" }} />
            }

          </div>
        </Form.Group>

        <Button className="mx-auto d-block" variant="primary" type="submit">Login</Button>

      </Form>
    </Container>
  )
}

export default login