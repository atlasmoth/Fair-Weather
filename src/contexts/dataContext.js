import { createContext, useContext } from "react";

export const dataContext = createContext();

export const useDataContext = () => useContext(dataContext);
