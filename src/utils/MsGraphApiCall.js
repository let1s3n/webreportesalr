import { loginRequest, graphConfig } from "../authConfig";
import { msalInstance } from "../pages/_app";

export async function callMsGraph() {
  console.log("CACA");
  const account = msalInstance.getActiveAccount();

  console.log("account: ", account);

  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account,
  });
  /* console.log("RESPONSE: ", response); */

  const headers = new Headers();
  const bearer = `Bearer ${response.accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}