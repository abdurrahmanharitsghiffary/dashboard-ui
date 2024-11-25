import axios from 'axios';

import type { ApiErrorResponse } from '@/utils/api-response';
import HttpStatusCode from '@/utils/http-code';

export class ExceptionHandler {
  error(error: unknown): ApiErrorResponse {
    console.error('Error: ', error);

    if (axios.isAxiosError(error) && error.response) {
      let message = String(error.response.data);
      if (error.response.data?.message) {
        message = error.response.data.message;
      }

      if (
        !error.response.data?.message &&
        typeof error.response.data === 'object'
      ) {
        message = JSON.stringify(error.response.data);
      }

      return {
        message,
        statusCode: error.response.status,
        data: null,
      };
    }

    return {
      message: 'Internal Server Error',
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      data: null,
    };
  }
}
