import usePathName from '@/hooks/usePathName';
import Image from 'next/image';
import { useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

import styles from './navbar.module.scss';
const NavBar = () => {
  const currentPath = usePathName();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar
      className={styles.customNavbar + ' p-0 w-100'}
      bg="transparent"
      expand="lg"
    >
      <Container className="g-0 px-5 px-xl-0" style={{ columnGap: '1rem' }}>
        <Navbar.Brand
          href="/"
          className="p-0 m-0 d-flex align-items-center"
          style={{ columnGap: '20px' }}
        >
          <Image
            className={styles.logo}
            src={`${process.env.NEXT_PUBLIC_CDN}images/logo.png`}
            alt="Hexagon Logo"
            width={53}
            height={0}
            style={{ height: 'auto' }}
            priority
            quality={100}
          />
        </Navbar.Brand>

        <Navbar.Toggle className={styles.toggler} onClick={handleShow} />
        <Nav
          className="d-none d-lg-flex align-items-center"
          style={{ columnGap: '2rem', rowGap: '2rem' }}
        >
          <Nav.Link className="position-relative p-0 text-lg-white" href="/">
            Inicio
          </Nav.Link>
          <Nav.Link
            className="position-relative p-0 text-lg-white"
            href="/dashboard"
          >
            Proyectos

          </Nav.Link>

        </Nav>

      </Container>
    </Navbar>
  );
};

export default NavBar;
