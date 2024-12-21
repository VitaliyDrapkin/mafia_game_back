import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get isProduction(): boolean {
    return this.configService.get('application.nodeEnv') === 'production';
  }

  getKey(key: string): string | undefined {
    return this.configService.get(`application.${key}`);
  }

  get apiUrl(): string {
    return this.configService.get('network.API_URL');
  }
}
