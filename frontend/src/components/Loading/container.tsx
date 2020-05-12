import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import { LoadingView } from "./view";

export const Loading = (props: any) => {
  const { loading, setLoading } = useContext(GlobalContext);

  const handleClick = (e: any) => {
    setLoading(false);
  };

  return <LoadingView loading={loading || props.loading} handleClick={handleClick} />;
};
