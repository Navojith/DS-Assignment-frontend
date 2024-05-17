import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HEADERS } from '../constants/common.constants';
import { generateTraceId } from '../utils/generateTraceId';
import { getAccessToken } from '../utils/userAuthentication';

class APIRequestService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
  }

  async sendRequest(
    url: string,
    method: string = 'post',
    headers: any = {},
    params?: any,
    body?: any,
    signal?: AbortSignal
  ): Promise<any> {
    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        headers,
        params,
        data: body,
        signal,
      };

      this.instance.interceptors.request.use(
        async (config) => {
          try {
            const userAccessToken = await getAccessToken();
            console.log('userAccessToken', userAccessToken);
            if (!config.headers['acccess_token'] && userAccessToken) {
              config.headers['access_token'] = `${userAccessToken}`;
              config.headers[HEADERS.TRACE_ID_HEADER] = generateTraceId();
            }
            if (!config.headers[HEADERS.USER_ID_HEADER]) {
              config.headers[HEADERS.USER_ID_HEADER] = userAccessToken;
            }

            return config;
          } catch (error) {
            return Promise.reject(error);
          }
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      const response = await this.instance(config);

      return response.data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
      }
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        throw new Error('API not available');
      } else {
        throw error;
      }
    }
  }
}

export default new APIRequestService();
