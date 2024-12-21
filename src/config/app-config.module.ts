import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import { AppConfigService } from './app-config.service';
import networkConfig from '@src/config/network.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        'development.local.env',
        'production.env',
        'dev.env',
      ],
      load: [appConfig, databaseConfig, networkConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(4000),
        SALT: Joi.number().integer().positive().required(),
        DATABASE_HOST: Joi.string().hostname().required(),
        DATABASE_PORT: Joi.number().port().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_SCHEMA: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
