import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Msal from "msal";
import { useToast } from "@chakra-ui/react";

const Login = ({ children }) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const toast = useToast();
  useEffect(() => {
    auth();
  }, []);

  const auth = async () => {
    let config = {
      auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3001/",
        
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
      },
    };

    var client = new Msal.UserAgentApplication(config);
    var request = { scopes: ["user.read"] };
    client
      .acquireTokenSilent(request)
      .then((res) => {
        console.log(res);
        setLoad(false);
      })
      .catch(async (err) => {
        try {
          let loginResponse = await client.loginPopup(request);
          let token = await client.acquireTokenSilent(request);
          window.location.reload();
        
        } catch (e) {
          toast({ title: "Please Refresh the Page to Login" });
        }
      });
  };

  return <>{load == true ? <h1>Please Login</h1> : children}</>;
};

export default Login;
