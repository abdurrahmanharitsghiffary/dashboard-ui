import axios from 'axios';

import { ENV } from '@/config/env';

export const api = axios.create({
  baseURL: ENV.BACKEND_URL + '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});
