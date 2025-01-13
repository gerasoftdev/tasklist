/* eslint-disable @typescript-eslint/consistent-type-definitions -- match type */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV?: 'dev' | 'test' | 'stag' | 'prod';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
