import React, { useState } from "react";
import "@/sass/app.scss";
import DefaultLayout from "@/components/layout/DefaultLayout/defaultLayout";
import { MyContext } from "../MyContext";
export default function App({ Component, pageProps }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  return (
    <MyContext.Provider value={{ isAdmin, setIsAdmin, isLogged, setIsLogged }}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </MyContext.Provider>
  );
}
