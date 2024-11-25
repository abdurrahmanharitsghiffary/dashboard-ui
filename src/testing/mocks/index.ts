import { ENV } from '@/config/env';

export const enableMocking = async () => {
  if (ENV.ENABLE_API_MOCKING || ENV.NODE_ENV === 'development') {
    // const { initializeDb } = await import('./db');
    // await initializeDb();
  }
};
