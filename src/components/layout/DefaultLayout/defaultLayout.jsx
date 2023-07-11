import React from 'react';

import Footer from '@/components/modules/Footer/footer';
import NavBar from '@/components/modules/NavBar/navBar';

export default function DefaultLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className="main-container">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
