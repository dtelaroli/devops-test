import { useQuery } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import { useContext } from "react";
import { GlobalContext } from "../../components";

interface QueryConfig {
  fetchPolicy?: "cache-first" | "network-only" | "cache-only" | "no-cache" | "standby" | "cache-and-network" | undefined;
  skip?: boolean;
}

export default (literals: DocumentNode, variables: any, onCompleted: any, options?: QueryConfig) => {
  const { setLoading, setError } = useContext(GlobalContext);

  const result = useQuery(literals, {
    variables,
    onCompleted: (data) => {
      return onCompleted ? onCompleted(data) : onCompleted;
    },
    ...options,
  });

  if (result.error) {
    setError(result.error);
  }
  setLoading(result.loading);

  return result;
};
