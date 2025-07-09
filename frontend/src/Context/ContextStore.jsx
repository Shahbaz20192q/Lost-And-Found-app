import { createContext, useEffect, useState } from "react";

export const ContextStore = createContext(null);

const ContextProvider = ({ children }) => {
  const baseUrl = "http://localhost:3001";
  const [btnLoader, setBtnLoader] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState({});

  useEffect(() => {
    setBtnLoader(false);
  }, []);

  const fetchLoggdIn = async () => {
    try {
      const res = await fetch(`${baseUrl}/user/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setLoggedIn(data.data);
      } else {
        sessionStorage.removeItem("token");
        setToken("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoggdIn();
  }, [token]);

  const contextValue = {
    baseUrl,
    btnLoader,
    setBtnLoader,
    token,
    setToken,
    loggedIn,
    fetchLoggdIn,
  };
  return (
    <ContextStore.Provider value={contextValue}>
      {children}
    </ContextStore.Provider>
  );
};

export default ContextProvider;
