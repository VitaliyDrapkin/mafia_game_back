import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiManagerUtil } from './api-manager.util';
import { NetworkRequest } from './network-request';
import { HttpRequestMethods } from './http-request-methods.enum';
import { AppLogger } from '@src/core/logger/loger-service';

@Injectable()
export class ApiCommunicationManager {
  private readonly TAG: string = `${this.constructor.name}`;

  constructor(
    private readonly httpService: HttpService,
    private readonly logger: AppLogger,
  ) {
    this.logger.log('Init', { name: this.TAG });
  }

  public exec<T, K>(networkRequest: NetworkRequest<T>): Observable<K> {
    const requestName = networkRequest.constructor.name;
    const method: HttpRequestMethods = networkRequest.getRequestMethod();
    const url: string = networkRequest.getUrl();
    const headers: any = networkRequest.getHeaders();
    const body: T = networkRequest.getBody();
    const parameters: any = ApiManagerUtil.paramMapToObject(
      networkRequest.getQueryParams(),
    );

    const requestConfig: AxiosRequestConfig = {
      url,
      headers,
      params: parameters,
      method,
      data: body,
    };

    if (method === HttpRequestMethods.GET) {
      delete requestConfig.data;
    }

    this.logger.log(
      `Api request ${requestName} send ${JSON.stringify(requestConfig)}`,
    );

    return this.httpService.request(requestConfig).pipe(
      map((response: AxiosResponse<K>) => response.data),
      catchError((err) => {
        this.logger.error('Request failed', {
          error: err.message,
          requestName,
        });

        return throwError(() => err);
      }),
    );
  }
}
