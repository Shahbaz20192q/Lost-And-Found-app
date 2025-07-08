import { createContext, useEffect, useState } from "react";

export const ContextStore = createContext(null);

const ContextProvider = ({ children }) => {
  const baseUrl = "http://localhost:3001";
  const [btnLoader, setBtnLoader] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    setBtnLoader(false);
  }, []);

  const contextValue = { baseUrl, btnLoader, setBtnLoader, token, setToken };
  return (
    <ContextStore.Provider value={contextValue}>
      {children}
    </ContextStore.Provider>
  );
};

export default ContextProvider;
