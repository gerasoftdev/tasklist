type TasksRouteParams = {
  taskId?: string;
};
const TASKS = ({ taskId }: TasksRouteParams | undefined = {}) =>
  `/${taskId ? taskId : ''}`;

export const ROUTES = {
  TASKS,
};
