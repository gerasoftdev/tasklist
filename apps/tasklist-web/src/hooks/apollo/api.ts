/* eslint-disable -- auto-generated */
/* v8 ignore start */

import * as Types from '@repo/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@/hooks/apollo/default';
const defaultOptions = {} as const;

export const SignUpDocument = gql`
  mutation signUp($data: SignUpInput!) {
    signUp(data: $data)
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  Types.SignUpMutation,
  Types.SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.SignUpMutation,
    Types.SignUpMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.SignUpMutation,
    Types.SignUpMutationVariables
  >(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<Types.SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  Types.SignUpMutation,
  Types.SignUpMutationVariables
>;
export const VerifyEmailDocument = gql`
  mutation verifyEmail($data: VerifyEmailInput!) {
    verifyEmail(data: $data) {
      passwordTokenId
    }
  }
`;
export type VerifyEmailMutationFn = Apollo.MutationFunction<
  Types.VerifyEmailMutation,
  Types.VerifyEmailMutationVariables
>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyEmailMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.VerifyEmailMutation,
    Types.VerifyEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.VerifyEmailMutation,
    Types.VerifyEmailMutationVariables
  >(VerifyEmailDocument, options);
}
export type VerifyEmailMutationHookResult = ReturnType<
  typeof useVerifyEmailMutation
>;
export type VerifyEmailMutationResult =
  Apollo.MutationResult<Types.VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<
  Types.VerifyEmailMutation,
  Types.VerifyEmailMutationVariables
>;
export const VerifyPasswordTokenDocument = gql`
  query verifyPasswordToken($data: VerifyPasswordTokenInput!) {
    verifyPasswordToken(data: $data)
  }
`;

/**
 * __useVerifyPasswordTokenQuery__
 *
 * To run a query within a React component, call `useVerifyPasswordTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyPasswordTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyPasswordTokenQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVerifyPasswordTokenQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    Types.VerifyPasswordTokenQuery,
    Types.VerifyPasswordTokenQueryVariables
  > &
    (
      | { variables: Types.VerifyPasswordTokenQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    Types.VerifyPasswordTokenQuery,
    Types.VerifyPasswordTokenQueryVariables
  >(VerifyPasswordTokenDocument, options);
}
export function useVerifyPasswordTokenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Types.VerifyPasswordTokenQuery,
    Types.VerifyPasswordTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    Types.VerifyPasswordTokenQuery,
    Types.VerifyPasswordTokenQueryVariables
  >(VerifyPasswordTokenDocument, options);
}
export function useVerifyPasswordTokenSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        Types.VerifyPasswordTokenQuery,
        Types.VerifyPasswordTokenQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    Types.VerifyPasswordTokenQuery,
    Types.VerifyPasswordTokenQueryVariables
  >(VerifyPasswordTokenDocument, options);
}
export type VerifyPasswordTokenQueryHookResult = ReturnType<
  typeof useVerifyPasswordTokenQuery
>;
export type VerifyPasswordTokenLazyQueryHookResult = ReturnType<
  typeof useVerifyPasswordTokenLazyQuery
>;
export type VerifyPasswordTokenSuspenseQueryHookResult = ReturnType<
  typeof useVerifyPasswordTokenSuspenseQuery
>;
export type VerifyPasswordTokenQueryResult = Apollo.QueryResult<
  Types.VerifyPasswordTokenQuery,
  Types.VerifyPasswordTokenQueryVariables
>;
export const SetPasswordDocument = gql`
  mutation setPassword($data: SetPasswordInput!) {
    setPassword(data: $data)
  }
`;
export type SetPasswordMutationFn = Apollo.MutationFunction<
  Types.SetPasswordMutation,
  Types.SetPasswordMutationVariables
>;

/**
 * __useSetPasswordMutation__
 *
 * To run a mutation, you first call `useSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordMutation, { data, loading, error }] = useSetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.SetPasswordMutation,
    Types.SetPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.SetPasswordMutation,
    Types.SetPasswordMutationVariables
  >(SetPasswordDocument, options);
}
export type SetPasswordMutationHookResult = ReturnType<
  typeof useSetPasswordMutation
>;
export type SetPasswordMutationResult =
  Apollo.MutationResult<Types.SetPasswordMutation>;
export type SetPasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.SetPasswordMutation,
  Types.SetPasswordMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation resetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<
  Types.ResetPasswordMutation,
  Types.ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.ResetPasswordMutation,
    Types.ResetPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.ResetPasswordMutation,
    Types.ResetPasswordMutationVariables
  >(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult =
  Apollo.MutationResult<Types.ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.ResetPasswordMutation,
  Types.ResetPasswordMutationVariables
>;
export const SignInDocument = gql`
  mutation signIn($data: SignInInput!) {
    signIn(data: $data) {
      accessToken
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  Types.SignInMutation,
  Types.SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.SignInMutation,
    Types.SignInMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.SignInMutation,
    Types.SignInMutationVariables
  >(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<Types.SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  Types.SignInMutation,
  Types.SignInMutationVariables
>;
export const RefreshTokensDocument = gql`
  mutation refreshTokens($data: RefreshTokensInput) {
    refreshTokens(data: $data) {
      accessToken
      refreshToken
    }
  }
`;
export type RefreshTokensMutationFn = Apollo.MutationFunction<
  Types.RefreshTokensMutation,
  Types.RefreshTokensMutationVariables
>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRefreshTokensMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.RefreshTokensMutation,
    Types.RefreshTokensMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.RefreshTokensMutation,
    Types.RefreshTokensMutationVariables
  >(RefreshTokensDocument, options);
}
export type RefreshTokensMutationHookResult = ReturnType<
  typeof useRefreshTokensMutation
>;
export type RefreshTokensMutationResult =
  Apollo.MutationResult<Types.RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<
  Types.RefreshTokensMutation,
  Types.RefreshTokensMutationVariables
>;
export const LogoutDocument = gql`
  mutation logout($data: LogoutInput) {
    logout(data: $data)
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  Types.LogoutMutation,
  Types.LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.LogoutMutation,
    Types.LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.LogoutMutation,
    Types.LogoutMutationVariables
  >(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<Types.LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  Types.LogoutMutation,
  Types.LogoutMutationVariables
>;
export const HealthDocument = gql`
  query health {
    health
  }
`;

/**
 * __useHealthQuery__
 *
 * To run a query within a React component, call `useHealthQuery` and pass it any options that fit your needs.
 * When your component renders, `useHealthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHealthQuery({
 *   variables: {
 *   },
 * });
 */
export function useHealthQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    Types.HealthQuery,
    Types.HealthQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    Types.HealthQuery,
    Types.HealthQueryVariables
  >(HealthDocument, options);
}
export function useHealthLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Types.HealthQuery,
    Types.HealthQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    Types.HealthQuery,
    Types.HealthQueryVariables
  >(HealthDocument, options);
}
export function useHealthSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        Types.HealthQuery,
        Types.HealthQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    Types.HealthQuery,
    Types.HealthQueryVariables
  >(HealthDocument, options);
}
export type HealthQueryHookResult = ReturnType<typeof useHealthQuery>;
export type HealthLazyQueryHookResult = ReturnType<typeof useHealthLazyQuery>;
export type HealthSuspenseQueryHookResult = ReturnType<
  typeof useHealthSuspenseQuery
>;
export type HealthQueryResult = Apollo.QueryResult<
  Types.HealthQuery,
  Types.HealthQueryVariables
>;
export const GetTasksDocument = gql`
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

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useGetTasksQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    Types.GetTasksQuery,
    Types.GetTasksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    Types.GetTasksQuery,
    Types.GetTasksQueryVariables
  >(GetTasksDocument, options);
}
export function useGetTasksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Types.GetTasksQuery,
    Types.GetTasksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    Types.GetTasksQuery,
    Types.GetTasksQueryVariables
  >(GetTasksDocument, options);
}
export function useGetTasksSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        Types.GetTasksQuery,
        Types.GetTasksQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    Types.GetTasksQuery,
    Types.GetTasksQueryVariables
  >(GetTasksDocument, options);
}
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<
  typeof useGetTasksLazyQuery
>;
export type GetTasksSuspenseQueryHookResult = ReturnType<
  typeof useGetTasksSuspenseQuery
>;
export type GetTasksQueryResult = Apollo.QueryResult<
  Types.GetTasksQuery,
  Types.GetTasksQueryVariables
>;
export const GetTaskDocument = gql`
  query getTask($_id: String!) {
    getTaskById(_id: $_id) {
      _id
      name
    }
  }
`;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetTaskQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    Types.GetTaskQuery,
    Types.GetTaskQueryVariables
  > &
    (
      | { variables: Types.GetTaskQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    Types.GetTaskQuery,
    Types.GetTaskQueryVariables
  >(GetTaskDocument, options);
}
export function useGetTaskLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Types.GetTaskQuery,
    Types.GetTaskQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    Types.GetTaskQuery,
    Types.GetTaskQueryVariables
  >(GetTaskDocument, options);
}
export function useGetTaskSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        Types.GetTaskQuery,
        Types.GetTaskQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    Types.GetTaskQuery,
    Types.GetTaskQueryVariables
  >(GetTaskDocument, options);
}
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskSuspenseQueryHookResult = ReturnType<
  typeof useGetTaskSuspenseQuery
>;
export type GetTaskQueryResult = Apollo.QueryResult<
  Types.GetTaskQuery,
  Types.GetTaskQueryVariables
>;
export const CreateTaskDocument = gql`
  mutation createTask($data: CreateTaskInput!) {
    createTask(data: $data) {
      _id
    }
  }
`;
export type CreateTaskMutationFn = Apollo.MutationFunction<
  Types.CreateTaskMutation,
  Types.CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.CreateTaskMutation,
    Types.CreateTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.CreateTaskMutation,
    Types.CreateTaskMutationVariables
  >(CreateTaskDocument, options);
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult =
  Apollo.MutationResult<Types.CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateTaskMutation,
  Types.CreateTaskMutationVariables
>;
export const UpdateTaskDocument = gql`
  mutation updateTask($data: UpdateTaskInput!) {
    updateTask(data: $data) {
      _id
      name
      isCompleted
      updatedAt
    }
  }
`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<
  Types.UpdateTaskMutation,
  Types.UpdateTaskMutationVariables
>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.UpdateTaskMutation,
    Types.UpdateTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.UpdateTaskMutation,
    Types.UpdateTaskMutationVariables
  >(UpdateTaskDocument, options);
}
export type UpdateTaskMutationHookResult = ReturnType<
  typeof useUpdateTaskMutation
>;
export type UpdateTaskMutationResult =
  Apollo.MutationResult<Types.UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateTaskMutation,
  Types.UpdateTaskMutationVariables
>;
export const DeleteTaskDocument = gql`
  mutation deleteTask($data: DeleteTaskInput!) {
    deleteTask(data: $data)
  }
`;
export type DeleteTaskMutationFn = Apollo.MutationFunction<
  Types.DeleteTaskMutation,
  Types.DeleteTaskMutationVariables
>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Types.DeleteTaskMutation,
    Types.DeleteTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    Types.DeleteTaskMutation,
    Types.DeleteTaskMutationVariables
  >(DeleteTaskDocument, options);
}
export type DeleteTaskMutationHookResult = ReturnType<
  typeof useDeleteTaskMutation
>;
export type DeleteTaskMutationResult =
  Apollo.MutationResult<Types.DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteTaskMutation,
  Types.DeleteTaskMutationVariables
>;
