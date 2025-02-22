import { configPlugin } from '@/plugins/config';
import { authPlugin } from '@/plugins/auth';
import { authServicePlugin } from '@/plugins/authService';
import { taskServicePlugin } from '@/plugins/taskService';

export const plugins = [
  configPlugin,
  authPlugin,
  authServicePlugin,
  taskServicePlugin,
];
