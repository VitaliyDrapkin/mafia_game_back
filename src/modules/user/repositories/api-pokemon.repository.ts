import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { ApiCommunicationManager } from '@src/core/api-communication-manager/api-communication-manager.service';
import { AppLogger } from '@src/core/logger/loger-service';
import { GetPokemonNetworkRequest } from '@src/modules/user/network-requests/get-pokemon.network-request';
import { AppConfigService } from '@src/config/app-config.service';

@Injectable()
export class ApiPokemonRepository {
  private readonly apiUrl: string;
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly apiCommunicationManager: ApiCommunicationManager,
    private readonly appLogger: AppLogger,
  ) {
    this.apiUrl = this.appConfigService.apiUrl;
  }

  async getPokemonInfo(name: string): Promise<any> {
    const networkRequest = new GetPokemonNetworkRequest(this.apiUrl, name);
    return await lastValueFrom(
      this.apiCommunicationManager.exec(networkRequest),
    );
  }
}
