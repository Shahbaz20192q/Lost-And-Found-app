import { createContext, useEffect, useState } from "react";

export const ContextStore = createContext(null);

const ContextProvider = ({ children }) => {
  const baseUrl = "http://localhost:3001";
  const [btnLoader, setBtnLoader] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [loggedIn, setLoggedIn] = useState({});
  const [items, setItems] = useState([]); // New state for storing mixed items
  const [loadingItems, setLoadingItems] = useState(false); // Loading state for items

  useEffect(() => {
    setBtnLoader(false);
  }, []);

  // Fetch logged in user
  const fetchLoggdIn = async () => {
    try {
      if (!sessionStorage.getItem("token")) {
        return;
      }
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

  // Fetch both lost and found items
  const fetchAllItems = async () => {
    setLoadingItems(true);
    try {
      const [lostRes, foundRes] = await Promise.all([
        fetch(`${baseUrl}/lostApplications/all`),
        fetch(`${baseUrl}/foundApplications/all`),
      ]);

      const lostItems = await lostRes.json();
      const foundItems = await foundRes.json();

      // Combine and sort by date (newest first)
      const combinedItems = [...lostItems.data, ...foundItems.data].sort(
        (a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
      );

      setItems(combinedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchLoggdIn();
    fetchAllItems(); // Fetch items when component mounts
  }, [token]);

  const contextValue = {
    baseUrl,
    btnLoader,
    setBtnLoader,
    token,
    setToken,
    loggedIn,
    fetchLoggdIn,
    items, // Make items available in context
    loadingItems, // Make loading state available
    fetchAllItems, // Allow manual refresh
    setItems,
  };

  return (
    <ContextStore.Provider value={contextValue}>
      {children}
    </ContextStore.Provider>
  );
};

export default ContextProvider;
