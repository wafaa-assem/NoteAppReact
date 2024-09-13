import { createContext, useEffect, useState } from "react";

export const userContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("tkn");
    if (localToken) {
      setToken(localToken); // change hena => done handel refresh hena
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
