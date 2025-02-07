const config = {
  schema: './src/schemas/**/*.ts',
  documents: './src/queries/**/*.ts',
  overwrite: true,
  config: {
    scalars: {
      BigInt: 'number',
      RegExp: 'string',
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  generates: {
    // Generate API types from graphQL endpoint
    './src/types/index.ts': {
      plugins: [
        {
          add: {
            content:
              '/* eslint-disable -- auto-generated */\n/* v8 ignore start */\n\n',
          },
        },
        'typescript',
        'typescript-operations',
      ],
      config: {
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
