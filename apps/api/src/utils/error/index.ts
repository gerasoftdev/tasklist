import type { GraphQLErrorOptions } from 'graphql';
import { v4 as uuid } from 'uuid';
import { GraphQLError } from 'graphql';
import errors from '@repo/translation/en/errors.json';

type ErrorProps = {
  doLogout?: boolean;
  statusCode?: number;
};

const errorsProps: Partial<Record<keyof typeof errors, ErrorProps>> = {
  somethingWentWrong: {
    statusCode: 500,
  },
};

type Props = GraphQLErrorOptions & {
  message?: string;
  statusCode?: number;
};

export class GeneralError extends GraphQLError {
  statusCode: number;

  constructor(
    code: keyof typeof errors,
    {
      message = errors[code],
      statusCode = errorsProps[code]?.statusCode || 500,
      extensions = {},
      ...graphqlErrorProps
    }: Props = {},
  ) {
    super(message, { ...graphqlErrorProps, extensions });

    this.extensions.code = code;
    this.extensions.doLogout =
      this.extensions.doLogout ?? (errorsProps[code]?.doLogout || false);

    this.extensions.id = this.extensions.id || uuid();
    this.extensions.isHandled = true;
    this.statusCode = statusCode || 500;
  }
}
