import { useMutation } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../components";

export interface MutationProps {
  literals: DocumentNode;
  refetchQueries?: RefetchQueries;
  showSuccess?: boolean;
  onError?: Function;
}

type RefetchQuery = {
  query: DocumentNode;
  variables: any;
};
export type RefetchQueries = RefetchQuery | Array<RefetchQuery>;

const parseRefetchQueries = (refetchQueries: RefetchQueries = []) => {
  refetchQueries = refetchQueries instanceof Array ? refetchQueries : [refetchQueries];

  return refetchQueries.map(({ query, variables }) => {
    return {
      query,
      variables,
    };
  });
};

export default ({ literals, refetchQueries, showSuccess = false, onError }: MutationProps): Array<any> => {
  const [method, result] = useMutation(literals, {
    refetchQueries: parseRefetchQueries(refetchQueries),
  });
  const { setLoading, setError, setSuccess } = useContext(GlobalContext);

  const methosVariables = (variables?: any) => {
    return method({ variables });
  };

  useEffect(() => {
    if (result.error) {
      // @ts-ignore
      const errors = result.error.networkError?.result?.errors || [result.error];
      if (onError) {
        onError(errors);
      } else {
        const error = errors.map((error: any) => error.message).join(", ");
        setError(error);
      }
    }
    if (showSuccess) {
      setSuccess(result.data ? "Operation success" : false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  setLoading(result.loading);

  return [methosVariables, result];
};
