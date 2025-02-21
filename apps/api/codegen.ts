import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['./node_modules/@repo/graphql/src/schemas/*.ts'],
  overwrite: true,
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  generates: {
    './src/types/graphql/index.ts': {
      plugins: [
        {
          add: {
            content:
              '/* eslint-disable -- auto-generated */\n/* v8 ignore start */\n\n',
          },
        },
        'typescript',
        'typescript-resolvers',
      ],
      config: {
        inputMaybeValue: 'T | undefined',
        maybeValue: 'T | null',
        mapperTypeSuffix: 'Model',
        mappers: {
          Task: '@repo/types#Task',
        },
        skipTypename: true,
        arrayInputCoercion: false,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: true,
        },
        namingConvention: {
          enumValues: 'change-case#camelCase',
        },
        scalars: {
          BigInt: 'number',
          RegExp: 'string',
        },
      },
    },
  },
};
export default config;
