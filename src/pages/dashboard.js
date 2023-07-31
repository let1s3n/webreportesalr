import React, { useEffect, useState } from "react";
import Dashboard from "@/components/templates/Dashboard/dashboard";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { callMsGraph } from "../utils/MsGraphApiCall";
import { loginRequest } from "../authConfig";

const dashboard = () => {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      console.log("LLEGA ACA");
      callMsGraph()
        .then((response) => setGraphData(response))
        .catch((e) => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount(),
            });
          }
        });
    }
  }, [inProgress, graphData, instance]);

  return <>{graphData ? <Dashboard graphData={graphData} /> : null}</>;
};

export default dashboard;
