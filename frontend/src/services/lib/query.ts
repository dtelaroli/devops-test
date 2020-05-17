import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import { useContext } from "react";
import { GlobalContext } from "../../components";

interface QueryConfig {
  fetchPolicy?: "cache-first" | "network-only" | "cache-only" | "no-cache" | "standby" | "cache-and-network" | undefined;
  skip?: boolean;
  lazy?: boolean;
}

export default (literals: DocumentNode, variables: any, onCompleted: any, options?: QueryConfig) => {
  const { setLoading, setError } = useContext(GlobalContext);
  let result: any;
  const config = {
    variables,
    onCompleted: (data: any) => {
      return onCompleted ? onCompleted(data) : onCompleted;
    },
    ...options,
  };

  if (options?.lazy) {
    result = useLazyQuery(literals, config);
  } else {
    result = useQuery(literals, config);
  }

  if (result.error) {
    setError(result.error);
  }
  setLoading(result.loading);

  return result;
};
