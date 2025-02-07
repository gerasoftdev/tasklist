/* v8 ignore start */

import gql from 'graphql-tag';

export const commonTypeDefs = gql`
  scalar RegExp
  scalar BigInt

  input StringFilters {
    eq: String
    ne: String
    in: [String!]
    nin: [String!]
    regex: RegExp
    not: RegExp
    options: String
  }

  input ArrayOfStringFilters {
    eq: [String]
    ne: [String]
    in: [String]
    nin: [String]
    regex: RegExp
    options: String
  }

  input NumberFilters {
    eq: BigInt
    ne: BigInt
    gt: BigInt
    ngt: BigInt
    gte: BigInt
    lt: BigInt
    nlt: BigInt
    lte: BigInt
    in: [BigInt]
    nin: [BigInt]
  }

  input ArrayFilters {
    size: BigInt
  }

  enum SortMethod {
    asc
    desc
  }
`;
