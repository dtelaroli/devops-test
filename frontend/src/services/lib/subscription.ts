import { DocumentNode } from "graphql";
import { useSubscription } from "react-apollo";

export default (document: DocumentNode, variables: object, onSubscriptionData: any) => {
  return useSubscription(document, { variables, onSubscriptionData });
};
