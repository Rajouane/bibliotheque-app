import React, { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext(null);

// Custom hook for easy access
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
console.log("user",user)
  // You can expose user + actions
  const value = {
    user,
    setUser,
    logout: () => setUser(null),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
