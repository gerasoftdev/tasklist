/* v8 ignore start */

import gql from 'graphql-tag';

export const taskTypeDefs = gql`
  type Task {
    _id: String!
    orgId: String!
    name: String!
    isCompleted: Boolean!
    completedAt: BigInt
    updatedAt: BigInt!
    createdAt: BigInt!
  }

  input TaskFilters {
    _id: StringFilters
    name: StringFilters
  }

  enum TaskSortField {
    name
    createdAt
    updatedAt
  }
  input TaskSortBy {
    field: TaskSortField!
    method: SortMethod!
  }

  type GetTasksResponse {
    data: [Task!]!
    limit: BigInt!
    offset: BigInt!
  }

  type Query {
    getTasks(
      filters: TaskFilters
      limit: BigInt = 100
      offset: BigInt = 0
      sortBy: [TaskSortBy!] = []
    ): GetTasksResponse!
    getTaskById(_id: String!): Task
  }

  input CreateTaskInput {
    _id: String
    name: String!
  }

  input UpdateTaskInput {
    _id: String!
    name: String
    isCompleted: Boolean
  }

  input DeleteTaskInput {
    _id: String!
  }

  type Mutation {
    createTask(data: CreateTaskInput!): Task!
    updateTask(data: UpdateTaskInput!): Task
    deleteTask(data: DeleteTaskInput!): Boolean!
  }
`;
