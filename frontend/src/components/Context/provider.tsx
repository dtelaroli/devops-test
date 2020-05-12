import React, { useState } from "react";
import { GlobalContext } from "./context";

export const GlobalProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
