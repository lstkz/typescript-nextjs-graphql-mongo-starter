import { gql } from '@apollo/client';

export const GQL_FRAGMENTS = gql`
  fragment defaultAuthResult on AuthResult {
    token
    user {
      ...allUserProps
    }
  }
  fragment allUserProps on User {
    id
    username
  }
`;
