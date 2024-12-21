import { HttpRequestMethods } from './http-request-methods.enum';

export abstract class NetworkRequest<T> {
  public abstract getRequestMethod(): HttpRequestMethods;

  public abstract getUrl(): string;

  public getBody(): T {
    return null;
  }

  public getQueryParams(): Map<string, any> | undefined {
    return undefined;
  }

  public getHeaders(): any {
    return {
      'Content-Type': 'application/json',
    };
  }
}
