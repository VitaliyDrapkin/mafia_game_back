import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('application', () => ({
  name: process.env.APP_NAME,
  port: Number.parseInt(process.env.PORT, 10),
  salt: Number.parseInt(process.env.SALT, 10),
  nodeEnv: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
}));
