import { NetworkRequest } from '@src/core/api-communication-manager/network-request';
import { HttpRequestMethods } from '@src/core/api-communication-manager/http-request-methods.enum';

export class GetPokemonNetworkRequest extends NetworkRequest<void> {
  constructor(
    private readonly apiUrl: string,
    private readonly name: string,
  ) {
    super();
  }

  public getRequestMethod(): HttpRequestMethods {
    return HttpRequestMethods.GET;
  }

  public getBody(): void {
    return;
  }

  public getQueryParams(): Map<string, any> | undefined {
    const parameters = new Map();

    parameters.set('offset', '0');

    return parameters;
  }

  public getUrl(): string {
    return `${this.apiUrl}/${this.name}`;
  }
}
