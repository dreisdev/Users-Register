/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface GlobalContextProps {
  user_Id: string;
  setUser_Id: (newId: string) => void;
  dataUser: string[];
  setDataUser: (newData: string[]) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user_Id, setUser_Id] = useState<string>("");
  const [dataUser, setDataUser] = useState<string[]>([]);

  const handleUserIdChange = (newId: string) => {
    setUser_Id(newId);
    console.log("contexto funcionando");
    console.log(user_Id);
  };

  const handleUserData = (newData: string[]) => {
    setDataUser(newData);
  };

  useEffect(() => {
    console.log(user_Id);
  }, [user_Id]);

  return (
    <GlobalContext.Provider
      value={{
        user_Id,
        setUser_Id: handleUserIdChange,
        dataUser,
        setDataUser: handleUserData,
      }}
    >
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
