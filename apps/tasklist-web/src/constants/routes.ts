type TasksRouteParams = {
  taskId?: string;
};
const TASKS = ({ taskId }: TasksRouteParams | undefined = {}) =>
  `/${taskId ? taskId : ''}`;

const SIGN_UP = `/signUp`;

const SIGN_IN = `/signIn`;

type SetPasswordRouteParams = {
  passwordTokenId: string;
};
const SET_PASSWORD = ({ passwordTokenId }: SetPasswordRouteParams) =>
  `/setPassword/${passwordTokenId}`;

const RESET_PASSWORD = `/resetPassword`;

type VerifyEmailRouteParams = {
  verificationTokenId: string;
};
const VERIFY_EMAIL = ({ verificationTokenId }: VerifyEmailRouteParams) =>
  `/verifyEmail/${verificationTokenId}`;

export const ROUTES = {
  TASKS,
  SIGN_UP,
  SIGN_IN,
  SET_PASSWORD,
  RESET_PASSWORD,
  VERIFY_EMAIL,
};
