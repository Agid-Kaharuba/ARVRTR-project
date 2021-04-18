import React, { useReducer, useEffect } from "react";

const AuthContext = React.createContext();
const localState = JSON.parse(localStorage.getItem("authState"));
const initialState = {
  authenticated: false,
  user: undefined,
  token: undefined
};

const reducer = (authState, newAuthState) => {
  if (newAuthState === null) {
    localStorage.removeItem("authState");
    return initialState;
  }
  return { ...authState, ...newAuthState };
};

const AuthProvider = (props) => {
  const [authState, setAuthState] = useReducer(
    reducer,
    localState || initialState
  );

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
