import { configSchema } from '@/config/schema';
import 'dotenv/config';

export const config = configSchema.parse(process.env);
