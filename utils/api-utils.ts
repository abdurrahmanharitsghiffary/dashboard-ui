import path from 'path';
import fs from 'fs/promises';
import { ApiMeta } from '@/types/metadata/api-meta';
import HttpStatusCode from '@/utils/http-code';
import { ApiErrorResponse } from '@/utils/api-response';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest } from 'next/server';

export const getApiMetaData = async (nextUrl: NextURL) => {
  const pathname = nextUrl.pathname;

  const [basePath] = pathname.split('/api/v1/')[1].split('/');

  const apiFileMetadataPath = path.resolve(
    __dirname,
    `../../../metadata/api/api_${basePath}.json`
  );

  try {
    const fileApi = await fs.readFile(apiFileMetadataPath, 'utf-8');

    const apiMetadata: ApiMeta = JSON.parse(fileApi);

    return apiMetadata;
  } catch (err) {
    console.error(err, 'Error Response');

    throw new ApiErrorResponse(
      'Route not found.',
      HttpStatusCode.NOT_FOUND,
      []
    );
  }
};

export const getApiUrl = (nextUrl: NextURL) => {
  const pathname = nextUrl.pathname;

  const [basePath, id] = pathname.split('/api/v1/')[1].split('/');
  return [basePath, id];
};

export const getIsMethodAllowed = (request: NextRequest, apiMeta: ApiMeta) => {
  return (
    !apiMeta.allowedModelMethods ||
    apiMeta?.allowedModelMethods?.includes(request.method)
  );
};
