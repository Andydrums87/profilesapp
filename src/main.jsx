import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, getCurrentUser } from "aws-amplify/auth";



Hub.listen("auth", async ({ payload }) => {
  switch (payload.event) {
    case "signInWithRedirect":
      const user = await getCurrentUser();
      console.log(user.username);
      break;
    case "signInWithRedirect_failure":
      // handle sign in failure
      break;
    case "customOAuthState":
      const state = payload.data; // this will be customState provided on signInWithRedirect function
      console.log(state);
      break;
  }
});

function handleSignInClick(customState) {
  signInWithRedirect({
    provider: "Google",
    customState
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authenticator>
      <App />
   
    </Authenticator>
    <button onClick={handleSignInClick}>Google</button>
    <p>hello ate</p>
  </React.StrictMode>
);