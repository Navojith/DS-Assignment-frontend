import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
//import { getUserAccessToken } from '../utils/userAuthentication';
import { HEADERS } from '../constants/common.constants';
import { generateTraceId } from '../utils/generateTraceId';

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

      console.log(config);
      this.instance.interceptors.request.use(
        async (config) => {
          try {
            // TODO: Shenan: add token here
            // const userAccessToken = await getUserAccessToken();
            const userAccessToken = 'aaaa';
            if (!config.headers['Authorization'] && userAccessToken) {
              config.headers['Authorization'] = `Bearer ${userAccessToken}`;
              config.headers[HEADERS.TRACE_ID_HEADER] = generateTraceId();
            }
            if (!config.headers[HEADERS.USER_ID_HEADER]) {
              // TODO: Shenan: add user id here
              config.headers[HEADERS.USER_ID_HEADER] = 'user-001';
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
