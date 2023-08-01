import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/sass/app.scss";
import DefaultLayout from "@/components/layout/DefaultLayout/defaultLayout";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";
import { CustomNavigationClient } from "../utils/NavigationClient";
import { MyContext } from "../MyContext";

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  console.log("Accounts: ", accounts);
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
});

export default function App({ Component, pageProps }) {
  /* const check = typeof window !== "undefined"; */
  if (typeof window !== "undefined") {
    var defaultIsAdmin =
      localStorage.getItem("isAdmin") === "true" ? true : false;
    var defaultIsLogged =
      localStorage.getItem("isLogged") === "true" ? true : false;
  }
  const [isAdmin, setIsAdmin] = useState(defaultIsAdmin);
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  const router = useRouter();
  const navigationClient = new CustomNavigationClient(router);
  msalInstance.setNavigationClient(navigationClient);

  /* useEffect(() => {
    console.log("DAYANE");
    console.log("localStorage isAdmin: ", localStorage.getItem("isAdmin"));
    console.log("localStorage isLogged: ", localStorage.getItem("isLogged"));
    setIsAdmin(localStorage.getItem("isAdmin") === "true" ? true : false);
    setIsLogged(localStorage.getItem("isLogged") === "true" ? true : false);

    console.log("Napo isLogged: ", isLogged);
    console.log("Napo isAdmin: ", isAdmin);
  }, []); */

  useEffect(() => {
    console.log("isLogged: ", isLogged);
    console.log("isLogged TYPE: ", typeof isLogged);
    localStorage.setItem("isLogged", isLogged);
  }, [isLogged]);

  useEffect(() => {
    console.log("isAdmin: ", isAdmin);
    console.log("isAdmin TYPE: ", typeof isAdmin);
    localStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  return (
    <MyContext.Provider value={{ isAdmin, setIsAdmin, isLogged, setIsLogged }}>
      <MsalProvider instance={msalInstance}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </MsalProvider>
    </MyContext.Provider>
  );
}
