/* eslint-disable -- auto-generated */
/* v8 ignore start */

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
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
  health: Scalars['Boolean']['output'];
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
  NumberFilters: NumberFilters;
  Query: ResolverTypeWrapper<{}>;
  RegExp: ResolverTypeWrapper<Scalars['RegExp']['output']>;
  SortMethod: SortMethod;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFilters: StringFilters;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ArrayFilters: ArrayFilters;
  ArrayOfStringFilters: ArrayOfStringFilters;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  NumberFilters: NumberFilters;
  Query: {};
  RegExp: Scalars['RegExp']['output'];
  String: Scalars['String']['output'];
  StringFilters: StringFilters;
};

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  health?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export interface RegExpScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['RegExp'], any> {
  name: 'RegExp';
}

export type Resolvers<ContextType = any> = {
  BigInt?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RegExp?: GraphQLScalarType;
};
