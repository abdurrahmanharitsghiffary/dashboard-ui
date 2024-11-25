export const ENV = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  ENABLE_API_MOCKING: process.env.NEXT_PUBLIC_ENABLE_API_MOCKING,
  NODE_ENV: process.env.NODE_ENV,
} as const;
