import { configPlugin } from '@/plugins/config';
import { counterPlugin } from '@/plugins/counter';
import { authPlugin } from '@/plugins/auth';
import { authServicePlugin } from '@/plugins/authService';

export const plugins = [
  configPlugin,
  counterPlugin,
  authPlugin,
  authServicePlugin,
];
