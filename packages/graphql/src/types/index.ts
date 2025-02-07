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

export type HealthQueryVariables = Exact<{ [key: string]: never }>;

export type HealthQuery = { health: boolean };
