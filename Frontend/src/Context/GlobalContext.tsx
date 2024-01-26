/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalContextProps {
  token: string;
  setToken: (newToken: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [token, setToken] = useState("");

  const handleTokenChange = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <GlobalContext.Provider value={{ token, setToken: handleTokenChange }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextProps => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("UseGlobal deve ser usado dentro de um GlobalProvider");
  }

  return context;
};
