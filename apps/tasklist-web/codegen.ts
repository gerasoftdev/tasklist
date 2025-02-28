const config = {
  schema: ['./node_modules/@repo/graphql/src/schemas/*.ts'],
  documents: './node_modules/@repo/graphql/src/queries/*.ts',
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
    // Use generated types from queries to generate typed hooks
    './src/hooks/apollo/api.ts': {
      preset: 'import-types',
      presetConfig: {
        typesPath: '@repo/graphql',
      },
      plugins: [
        'typescript-react-apollo',
        {
          add: {
            content:
              '/* eslint-disable -- auto-generated */\n/* v8 ignore start */\n\n',
          },
        },
      ],
      config: {
        apolloReactHooksImportFrom: '@/hooks/apollo/default',
        reactApolloVersion: 3,
        arrayInputCoercion: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: true,
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
