import { useContext } from 'react';
import { useMsal } from "@azure/msal-react";
import usePathName from '@/hooks/usePathName';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';
import SignInSignOutButton from "@/ui-components/SignInSignOutButton";
import { useRouter } from "next/router";
import { MyContext } from '@/MyContext';
import { loginRequest } from "@/authConfig";
import styles from './navbar.module.scss';
const NavBar = () => {
  const { instance } = useMsal();
  const currentPath = usePathName();
  const [show, setShow] = useState(false);
  const { isAdmin, isLogged, setIsAdmin, setIsLogged } = useContext(MyContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  useEffect(() => {
    getUser();
  }, [])



  const logout = async () => {
    handleLogout("popup");
    try {
      await axios.post("/api/auth/logout");
      setIsLogged(false);
      setIsAdmin(false);
      router.push("/login");
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/api/profile");

      if (response.status === 200) {
        setIsLogged(true);
        const roles = response.data.roles;
        for (let role of roles) {
          if (role.name === "admin") {
            setIsAdmin(true);
          }
        }
      }
      console.log("DATA: ", response.data)
    } catch (error) {
      setIsAdmin(false);
      setIsLogged(false);
      console.log("Error: ", error);
    }
  }

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup().catch((e) => { console.error(`logoutPopup failed: ${e}`) });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect().catch((e) => { console.error(`logoutRedirect failed: ${e}`) });
    }
  }

  return (
    <Navbar
      className={styles.customNavbar + ' p-0 w-100'}
      /* variant="dark" */
      bg="transparent"
      expand="lg"
    >
      <Container className="g-0 py-4 px-3 px-md-5" style={{ columnGap: '5rem' }}>
        <Navbar.Brand
          href="/"
          className="p-0 m-0"
        >
          <Image
            className={styles.logo}
            src={`${process.env.NEXT_PUBLIC_CDN}images/logo3.png`}
            alt="Hexagon Logo"
            width={100}
            height={0}
            style={{ height: 'auto' }}
            priority
            quality={100}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.toggler} />
        <Navbar.Collapse className={styles.customMenu} id="basic-navbar-nav">
          <Nav
            style={{ columnGap: '2rem', rowGap: '2rem' }}
          >
            <Link className="position-relative p-0 text-black" href="/">
              Inicio
            </Link>
            {/* <Link
              className="position-relative p-0 text-black"
              href="/precios-internacionales"
            >
              Precios Internacionales
            </Link> */}
            <Link
              className="position-relative p-0 text-black"
              href="/mi-cuenta"
            >
              Cuenta
            </Link>

            {
              isAdmin
                ?
                <>
                  <Link
                    className="position-relative p-0 text-black"
                    href="/create"
                  >
                    Crear Cuenta
                  </Link>

                  <Link
                    className="position-relative p-0 text-black"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </>
                :
                null
            }
            <Link
              className="position-relative p-0 text-black"
              href={isLogged ? "/" : "/login"}
              onClick={isLogged ? logout : null}
            >
              {
                isLogged
                  ?
                  "Logout"
                  :
                  "Login"
              }

            </Link>

            {/* <SignInSignOutButton/> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
