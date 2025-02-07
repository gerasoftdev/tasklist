/* v8 ignore start */

import gql from 'graphql-tag';

export const healthTypeDefs = gql`
  type Query {
    health: Boolean!
  }
`;
