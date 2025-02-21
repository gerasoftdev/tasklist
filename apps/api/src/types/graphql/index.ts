/* eslint-disable -- auto-generated */
/* v8 ignore start */

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { Task as TaskModel } from '@repo/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | undefined;
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
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
  verifyPasswordToken: Scalars['Boolean']['output'];
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

export type MutationVerifyPasswordTokenArgs = {
  data: VerifyPasswordTokenInput;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ArrayFilters: ArrayFilters;
  ArrayOfStringFilters: ArrayOfStringFilters;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateTaskInput: CreateTaskInput;
  DeleteTaskInput: DeleteTaskInput;
  GetTasksResponse: ResolverTypeWrapper<
    Omit<GetTasksResponse, 'data'> & { data: Array<ResolversTypes['Task']> }
  >;
  LogoutInput: LogoutInput;
  Mutation: ResolverTypeWrapper<{}>;
  NumberFilters: NumberFilters;
  Query: ResolverTypeWrapper<{}>;
  RefreshTokensInput: RefreshTokensInput;
  RegExp: ResolverTypeWrapper<Scalars['RegExp']['output']>;
  ResetPasswordInput: ResetPasswordInput;
  SetPasswordInput: SetPasswordInput;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  SortMethod: SortMethod;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFilters: StringFilters;
  Task: ResolverTypeWrapper<TaskModel>;
  TaskFilters: TaskFilters;
  TaskSortBy: TaskSortBy;
  TaskSortField: TaskSortField;
  TokensResponse: ResolverTypeWrapper<TokensResponse>;
  UpdateTaskInput: UpdateTaskInput;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailResponse: ResolverTypeWrapper<VerifyEmailResponse>;
  VerifyPasswordTokenInput: VerifyPasswordTokenInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ArrayFilters: ArrayFilters;
  ArrayOfStringFilters: ArrayOfStringFilters;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  CreateTaskInput: CreateTaskInput;
  DeleteTaskInput: DeleteTaskInput;
  GetTasksResponse: Omit<GetTasksResponse, 'data'> & {
    data: Array<ResolversParentTypes['Task']>;
  };
  LogoutInput: LogoutInput;
  Mutation: {};
  NumberFilters: NumberFilters;
  Query: {};
  RefreshTokensInput: RefreshTokensInput;
  RegExp: Scalars['RegExp']['output'];
  ResetPasswordInput: ResetPasswordInput;
  SetPasswordInput: SetPasswordInput;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  String: Scalars['String']['output'];
  StringFilters: StringFilters;
  Task: TaskModel;
  TaskFilters: TaskFilters;
  TaskSortBy: TaskSortBy;
  TokensResponse: TokensResponse;
  UpdateTaskInput: UpdateTaskInput;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailResponse: VerifyEmailResponse;
  VerifyPasswordTokenInput: VerifyPasswordTokenInput;
};

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type GetTasksResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['GetTasksResponse'] = ResolversParentTypes['GetTasksResponse'],
> = {
  data?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createTask?: Resolver<
    ResolversTypes['Task'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTaskArgs, 'data'>
  >;
  deleteTask?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTaskArgs, 'data'>
  >;
  logout?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    Partial<MutationLogoutArgs>
  >;
  refreshTokens?: Resolver<
    ResolversTypes['TokensResponse'],
    ParentType,
    ContextType,
    Partial<MutationRefreshTokensArgs>
  >;
  resetPassword?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationResetPasswordArgs, 'data'>
  >;
  setPassword?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationSetPasswordArgs, 'data'>
  >;
  signIn?: Resolver<
    ResolversTypes['TokensResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, 'data'>
  >;
  signUp?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, 'data'>
  >;
  updateTask?: Resolver<
    Maybe<ResolversTypes['Task']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTaskArgs, 'data'>
  >;
  verifyEmail?: Resolver<
    ResolversTypes['VerifyEmailResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationVerifyEmailArgs, 'data'>
  >;
  verifyPasswordToken?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationVerifyPasswordTokenArgs, 'data'>
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  getTaskById?: Resolver<
    Maybe<ResolversTypes['Task']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetTaskByIdArgs, '_id'>
  >;
  getTasks?: Resolver<
    ResolversTypes['GetTasksResponse'],
    ParentType,
    ContextType,
    RequireFields<QueryGetTasksArgs, 'limit' | 'offset' | 'sortBy'>
  >;
  health?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export interface RegExpScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['RegExp'], any> {
  name: 'RegExp';
}

export type TaskResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Task'] = ResolversParentTypes['Task'],
> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  completedAt?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orgId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TokensResponse'] = ResolversParentTypes['TokensResponse'],
> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyEmailResponseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['VerifyEmailResponse'] = ResolversParentTypes['VerifyEmailResponse'],
> = {
  passwordTokenId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BigInt?: GraphQLScalarType;
  GetTasksResponse?: GetTasksResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegExp?: GraphQLScalarType;
  Task?: TaskResolvers<ContextType>;
  TokensResponse?: TokensResponseResolvers<ContextType>;
  VerifyEmailResponse?: VerifyEmailResponseResolvers<ContextType>;
};
