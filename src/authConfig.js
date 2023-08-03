// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
      /* clientId: "b5c2e510-4a17-4feb-b219-e55aa5b74144", */
      clientId: "0253a612-c044-40dd-9c4a-a8e5d67d1717",
      authority: "https://login.microsoftonline.com/common",
      redirectUri: "/mi-cuenta",
      postLogoutRedirectUri: "/",
  },
  system: {
      allowNativeBroker: false, // Disables WAM Broker
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  /* scopes: ["User.Read"], */
  scopes: ["https://analysis.windows.net/powerbi/api/.default"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  /* graphMeEndpoint: "https://graph.microsoft.com/v1.0/me", */
  graphMeEndpoint: "https://api.powerbi.com/v1.0/myorg/reports",
};
