import { configPlugin } from '@/plugins/config';
import { authPlugin } from '@/plugins/auth';
import { authServicePlugin } from '@/plugins/authService';

export const plugins = [configPlugin, authPlugin, authServicePlugin];
