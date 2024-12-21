import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('network', () => ({
  API_URL: process.env.POKEMON_API_URL,
}));
