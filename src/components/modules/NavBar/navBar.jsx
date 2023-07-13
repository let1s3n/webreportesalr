import usePathName from '@/hooks/usePathName';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';

import styles from './navbar.module.scss';
const NavBar = () => {
  const currentPath = usePathName();
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentPath !== "/login") {
      getPayload();
    }

    console.log("currentPath: ", currentPath)
  }, [currentPath])

  const getPayload = async () => {
    try {
      const response = await axios.get("/api/profile");
      /* if (response.status === 200) {
        router.push("/dashboard");
      } */
      const roles = response.data.roles;
      console.log("DATA: ", response.data.roles)
      for (let role of roles) {
        if (role.name === "admin") {
          setIsAdmin(true);
        }
      }

    } catch (error) {
      setIsAdmin(false);
      console.log("Error: ", error);
    }
  }

  return (
    <Navbar
      className={styles.customNavbar + ' p-0 w-100'}
      bg="transparent"
      expand="lg"
    >
      <Container className="g-0 px-5 px-xl-0" style={{ columnGap: '5rem' }}>
        <Navbar.Brand
          href="/"
          className="p-0 m-0"
        >
          <Image
            className={styles.logo}
            src={`${process.env.NEXT_PUBLIC_CDN}images/logo2.png`}
            alt="Hexagon Logo"
            width={40}
            height={0}
            style={{ height: 'auto' }}
            priority
            quality={100}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} onClick={handleShow} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="d-none d-lg-flex align-items-center"
            style={{ columnGap: '2rem', rowGap: '2rem' }}
          >
            <Link className="position-relative p-0 text-black" href="/">
              Inicio
            </Link>
            <Link
              className="position-relative p-0 text-black"
              href="/precios-internacionales"
            >
              Precios Internacionales
            </Link>
            <Link
              className="position-relative p-0 text-black"
              href="/dashboard"
            >
              Dashboard
            </Link>

            {
              isAdmin
                ?
                <Link
                  className="position-relative p-0 text-black"
                  href="/create"
                >
                  Create
                </Link>
                :
                null
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
