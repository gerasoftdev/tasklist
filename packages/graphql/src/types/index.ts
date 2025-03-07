/* eslint-disable -- auto-generated */
/* v8 ignore start */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigInt: { input: number; output: number };
  RegExp: { input: string; output: string };
};

export type ArrayFilters = {
  size?: InputMaybe<Scalars['BigInt']['input']>;
};

export type ArrayOfStringFilters = {
  eq?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ne?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  options?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['RegExp']['input']>;
};

export type CreateTaskInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type DeleteTaskInput = {
  _id: Scalars['String']['input'];
};

export type GetTasksResponse = {
  data: Array<Task>;
  limit: Scalars['BigInt']['output'];
  offset: Scalars['BigInt']['output'];
};

export type LogoutInput = {
  refreshToken: Scalars['String']['input'];
};

export type Mutation = {
  createTask: Task;
  deleteTask: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
  refreshTokens: TokensResponse;
  resetPassword: Scalars['Boolean']['output'];
  setPassword: Scalars['Boolean']['output'];
  signIn: TokensResponse;
  signUp: Scalars['Boolean']['output'];
  updateTask: Maybe<Task>;
  verifyEmail: VerifyEmailResponse;
};

export type MutationCreateTaskArgs = {
  data: CreateTaskInput;
};

export type MutationDeleteTaskArgs = {
  data: DeleteTaskInput;
};

export type MutationLogoutArgs = {
  data?: InputMaybe<LogoutInput>;
};

export type MutationRefreshTokensArgs = {
  data?: InputMaybe<RefreshTokensInput>;
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationSetPasswordArgs = {
  data: SetPasswordInput;
};

export type MutationSignInArgs = {
  data: SignInInput;
};

export type MutationSignUpArgs = {
  data: SignUpInput;
};

export type MutationUpdateTaskArgs = {
  data: UpdateTaskInput;
};

export type MutationVerifyEmailArgs = {
  data: VerifyEmailInput;
};

export type NumberFilters = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  ne?: InputMaybe<Scalars['BigInt']['input']>;
  ngt?: InputMaybe<Scalars['BigInt']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  nlt?: InputMaybe<Scalars['BigInt']['input']>;
};

export type Query = {
  getTaskById: Maybe<Task>;
  getTasks: GetTasksResponse;
  health: Scalars['Boolean']['output'];
  verifyPasswordToken: Scalars['Boolean']['output'];
};

export type QueryGetTaskByIdArgs = {
  _id: Scalars['String']['input'];
};

export type QueryGetTasksArgs = {
  filters?: InputMaybe<TaskFilters>;
  limit?: InputMaybe<Scalars['BigInt']['input']>;
  offset?: InputMaybe<Scalars['BigInt']['input']>;
  sortBy?: InputMaybe<Array<TaskSortBy>>;
};

export type QueryVerifyPasswordTokenArgs = {
  data: VerifyPasswordTokenInput;
};

export type RefreshTokensInput = {
  refreshToken: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
};

export type SetPasswordInput = {
  password: Scalars['String']['input'];
  passwordTokenId: Scalars['String']['input'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
};

export enum SortMethod {
  asc = 'asc',
  desc = 'desc',
}

export type StringFilters = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
  not?: InputMaybe<Scalars['RegExp']['input']>;
  options?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['RegExp']['input']>;
};

export type Task = {
  _id: Scalars['String']['output'];
  completedAt: Maybe<Scalars['BigInt']['output']>;
  createdAt: Scalars['BigInt']['output'];
  isCompleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  orgId: Scalars['String']['output'];
  updatedAt: Scalars['BigInt']['output'];
};

export type TaskFilters = {
  _id?: InputMaybe<StringFilters>;
  name?: InputMaybe<StringFilters>;
};

export type TaskSortBy = {
  field: TaskSortField;
  method: SortMethod;
};

export enum TaskSortField {
  createdAt = 'createdAt',
  name = 'name',
  updatedAt = 'updatedAt',
}

export type TokensResponse = {
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UpdateTaskInput = {
  _id: Scalars['String']['input'];
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyEmailInput = {
  verificationTokenId: Scalars['String']['input'];
};

export type VerifyEmailResponse = {
  passwordTokenId: Maybe<Scalars['String']['output']>;
};

export type VerifyPasswordTokenInput = {
  passwordTokenId: Scalars['String']['input'];
};

export type SignUpMutationVariables = Exact<{
  data: SignUpInput;
}>;

export type SignUpMutation = { signUp: boolean };

export type VerifyEmailMutationVariables = Exact<{
  data: VerifyEmailInput;
}>;

export type VerifyEmailMutation = {
  verifyEmail: { passwordTokenId: string | null };
};

export type VerifyPasswordTokenQueryVariables = Exact<{
  data: VerifyPasswordTokenInput;
}>;

export type VerifyPasswordTokenQuery = { verifyPasswordToken: boolean };

export type SetPasswordMutationVariables = Exact<{
  data: SetPasswordInput;
}>;

export type SetPasswordMutation = { setPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;

export type ResetPasswordMutation = { resetPassword: boolean };

export type SignInMutationVariables = Exact<{
  data: SignInInput;
}>;

export type SignInMutation = { signIn: { accessToken: string } };

export type RefreshTokensMutationVariables = Exact<{
  data?: InputMaybe<RefreshTokensInput>;
}>;

export type RefreshTokensMutation = {
  refreshTokens: { accessToken: string; refreshToken: string };
};

export type LogoutMutationVariables = Exact<{
  data?: InputMaybe<LogoutInput>;
}>;

export type LogoutMutation = { logout: boolean };

export type HealthQueryVariables = Exact<{ [key: string]: never }>;

export type HealthQuery = { health: boolean };

export type GetTasksQueryVariables = Exact<{
  filters?: InputMaybe<TaskFilters>;
  limit?: InputMaybe<Scalars['BigInt']['input']>;
  offset?: InputMaybe<Scalars['BigInt']['input']>;
  sortBy?: InputMaybe<Array<TaskSortBy>>;
}>;

export type GetTasksQuery = {
  getTasks: {
    offset: number;
    limit: number;
    data: Array<{ _id: string; name: string; isCompleted: boolean }>;
  };
};

export type GetTaskQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;

export type GetTaskQuery = {
  getTaskById: { _id: string; name: string } | null;
};

export type CreateTaskMutationVariables = Exact<{
  data: CreateTaskInput;
}>;

export type CreateTaskMutation = { createTask: { _id: string } };

export type UpdateTaskMutationVariables = Exact<{
  data: UpdateTaskInput;
}>;

export type UpdateTaskMutation = {
  updateTask: {
    _id: string;
    name: string;
    isCompleted: boolean;
    updatedAt: number;
  } | null;
};

export type DeleteTaskMutationVariables = Exact<{
  data: DeleteTaskInput;
}>;

export type DeleteTaskMutation = { deleteTask: boolean };
