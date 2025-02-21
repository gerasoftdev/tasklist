/* v8 ignore start */

import { gql } from 'graphql-tag';

export const GetTasks = gql`
  query getTasks(
    $filters: TaskFilters
    $limit: BigInt
    $offset: BigInt
    $sortBy: [TaskSortBy!]
  ) {
    getTasks(
      filters: $filters
      limit: $limit
      offset: $offset
      sortBy: $sortBy
    ) {
      offset
      limit
      data {
        _id
        name
        isCompleted
      }
    }
  }
`;

export const GetTask = gql`
  query getTask($_id: String!) {
    getTaskById(_id: $_id) {
      _id
      name
    }
  }
`;

export const CreateTask = gql`
  mutation createTask($data: CreateTaskInput!) {
    createTask(data: $data) {
      _id
    }
  }
`;

export const UpdateTask = gql`
  mutation updateTask($data: UpdateTaskInput!) {
    updateTask(data: $data) {
      _id
      name
      isCompleted
      updatedAt
    }
  }
`;

export const DeleteTask = gql`
  mutation deleteTask($data: DeleteTaskInput!) {
    deleteTask(data: $data)
  }
`;
