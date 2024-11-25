// NOTE: If you wish to keep this endpoint private in a production build,
// delete this file before the build.

import { type LifeCycleEventsMap, handleRequest } from 'msw';
import { Emitter } from 'strict-event-emitter';

import { handlers } from '@/testing/mocks/handlers';

const emitter = new Emitter<LifeCycleEventsMap>();

async function handleRequestByHandlers(request: Request): Promise<Response> {
  const requestId = crypto.randomUUID();
  const response = await handleRequest(
    request,
    requestId,
    handlers,
    { onUnhandledRequest: 'error' },
    emitter,
  );
  if (response === undefined) throw new Error('Response is undefined');
  return response;
}

export const dynamic = 'force-dynamic';

export const GET = handleRequestByHandlers;
export const POST = handleRequestByHandlers;
export const PUT = handleRequestByHandlers;
export const PATCH = handleRequestByHandlers;
export const DELETE = handleRequestByHandlers;
export const HEAD = handleRequestByHandlers;
export const OPTIONS = handleRequestByHandlers;
