import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_ME = gql`
  query {
    me {
      id
      email
      name
      role
    }
  }
`;

export function useMe() {
  const { data, loading, error } = useQuery(GET_ME);

  return {
    user: data?.me,
    loading,
    error,
  };
}