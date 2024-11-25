import { HttpResponse, http } from 'msw';

import { ENV } from '@/config/env';
import { employeeHandlers } from '@/testing/mocks/handlers/employee';

import { networkDelay } from '../utils';

export const handlers = [
  ...employeeHandlers,
  http.get(`${ENV.BACKEND_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
