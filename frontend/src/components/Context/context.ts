import { createContext } from "react";

export interface ILoading {
  setLoading: Function;
  loading: boolean;
  error: boolean | string;
  setError: Function;
  success: boolean | string;
  setSuccess: Function;
}

const empty: ILoading = {
  setLoading: () => {},
  loading: false,
  setError: () => {},
  error: false,
  setSuccess: () => {},
  success: false
};
export const GlobalContext = createContext(empty);
