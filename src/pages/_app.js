import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const navigationClient = new CustomNavigationClient(router);
  msalInstance.setNavigationClient(navigationClient);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.status === 200) {
        setIsLogged(true);

        const roles = response.data.roles;
        for (let role of roles) {
          if (role.name === "admin") {
            setIsAdmin(true);
          }
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

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
