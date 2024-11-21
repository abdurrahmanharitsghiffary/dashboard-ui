import { ApiErrorResponse, ApiResponse } from '@/utils/api-response';
import HttpStatusCode from '@/utils/http-code';
import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/config/db';
import { ApiMeta } from '@/types/metadata/api-meta';
import {
  getApiMetaData,
  getApiUrl,
  getIsMethodAllowed
} from '@/utils/api-utils';

export async function GET(request: NextRequest) {
  const [basePath, id] = getApiUrl(request.nextUrl);

  try {
    const apiMetadata: ApiMeta = await getApiMetaData(request.nextUrl);
    const isMethodAllowed = getIsMethodAllowed(request, apiMetadata);

    if (!isMethodAllowed)
      return NextResponse.json(
        new ApiErrorResponse(
          'Method not allowed',
          HttpStatusCode.METHOD_NOT_ALLOWED,
          []
        ),
        { status: HttpStatusCode.METHOD_NOT_ALLOWED }
      );

    const modelName = (apiMetadata.modelName[0].toLowerCase() +
      apiMetadata.modelName.slice(1)) as keyof typeof prisma;

    if (!id) {
      const data = await (prisma[modelName] as any).findMany();

      return NextResponse.json(
        new ApiResponse(data, HttpStatusCode.OK, `Success get ${basePath}(s).`),
        { status: HttpStatusCode.OK }
      );
    }

    const data = await (prisma[modelName] as any).findUnique({
      where: {
        [apiMetadata.modelPrimaryColumn]: id
      }
    });

    if (!data) {
      return NextResponse.json(
        new ApiErrorResponse(
          basePath + ' not found.',
          HttpStatusCode.NOT_FOUND
        ),
        {
          status: HttpStatusCode.NOT_FOUND
        }
      );
    }

    return NextResponse.json(
      new ApiResponse(data, HttpStatusCode.OK, `Success get ${basePath}.`),
      { status: HttpStatusCode.OK }
    );
  } catch (err) {
    if (err instanceof ApiErrorResponse) {
      return NextResponse.json(err, { status: err.statusCode });
    }
    return NextResponse.json(
      new ApiErrorResponse(
        'Something went wrong',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        []
      ),
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const [basePath] = getApiUrl(request.nextUrl);

  try {
    const apiMetadata: ApiMeta = await getApiMetaData(request.nextUrl);
    const isMethodAllowed = getIsMethodAllowed(request, apiMetadata);

    if (!isMethodAllowed)
      return NextResponse.json(
        new ApiErrorResponse(
          'Method not allowed',
          HttpStatusCode.METHOD_NOT_ALLOWED,
          []
        ),
        { status: HttpStatusCode.METHOD_NOT_ALLOWED }
      );

    const modelName = (apiMetadata.modelName[0].toLowerCase() +
      apiMetadata.modelName.slice(1)) as keyof typeof prisma;

    try {
      const data = await (prisma[modelName] as any).create({ data: body });

      return NextResponse.json(
        new ApiResponse(
          data,
          HttpStatusCode.CREATED,
          `Success create ${basePath}.`
        ),
        { status: HttpStatusCode.CREATED }
      );
    } catch (err) {
      return NextResponse.json(
        new ApiErrorResponse(
          'Failed to create ' + basePath,
          HttpStatusCode.BAD_REQUEST,
          []
        ),
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }
  } catch (err) {
    if (err instanceof ApiErrorResponse) {
      return NextResponse.json(err, { status: err.statusCode });
    }
    return NextResponse.json(
      new ApiErrorResponse(
        'Something went wrong',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        []
      ),
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const [basePath, id] = getApiUrl(request.nextUrl);

  if (!id) {
    return NextResponse.json(
      new ApiErrorResponse('Route not found.', HttpStatusCode.NOT_FOUND),
      {
        status: HttpStatusCode.NOT_FOUND
      }
    );
  }

  try {
    const apiMetadata: ApiMeta = await getApiMetaData(request.nextUrl);
    const isMethodAllowed = getIsMethodAllowed(request, apiMetadata);

    if (!isMethodAllowed)
      return NextResponse.json(
        new ApiErrorResponse(
          'Method not allowed',
          HttpStatusCode.METHOD_NOT_ALLOWED,
          []
        ),
        { status: HttpStatusCode.METHOD_NOT_ALLOWED }
      );

    const modelName = (apiMetadata.modelName[0].toLowerCase() +
      apiMetadata.modelName.slice(1)) as keyof typeof prisma;

    try {
      const data = await (prisma[modelName] as any).findUnique({
        where: {
          [apiMetadata.modelPrimaryColumn]: id
        }
      });

      if (!data) {
        return NextResponse.json(
          new ApiErrorResponse(
            basePath + ' not found.',
            HttpStatusCode.NOT_FOUND
          ),
          {
            status: HttpStatusCode.NOT_FOUND
          }
        );
      }

      const deletedData = await (prisma[modelName] as any).delete({
        where: {
          [apiMetadata.modelPrimaryColumn]: id
        }
      });

      return NextResponse.json(
        new ApiResponse(
          deletedData,
          HttpStatusCode.OK,
          `Success delete ${basePath}.`
        ),
        { status: HttpStatusCode.OK }
      );
    } catch (err) {
      return NextResponse.json(
        new ApiErrorResponse(
          'Failed to delete ' + basePath,
          HttpStatusCode.BAD_REQUEST,
          []
        ),
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }
  } catch (err) {
    if (err instanceof ApiErrorResponse) {
      return NextResponse.json(err, { status: err.statusCode });
    }
    return NextResponse.json(
      new ApiErrorResponse(
        'Something went wrong',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        []
      ),
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const [basePath, id] = getApiUrl(request.nextUrl);

  if (!id) {
    return NextResponse.json(
      new ApiErrorResponse('Route not found.', HttpStatusCode.NOT_FOUND),
      {
        status: HttpStatusCode.NOT_FOUND
      }
    );
  }

  try {
    const apiMetadata: ApiMeta = await getApiMetaData(request.nextUrl);
    const isMethodAllowed = getIsMethodAllowed(request, apiMetadata);

    if (!isMethodAllowed)
      return NextResponse.json(
        new ApiErrorResponse('Method not allowed', HttpStatusCode.OK, []),
        { status: HttpStatusCode.OK }
      );

    const modelName = (apiMetadata.modelName[0].toLowerCase() +
      apiMetadata.modelName.slice(1)) as keyof typeof prisma;

    try {
      const data = await (prisma[modelName] as any).findUnique({
        where: {
          [apiMetadata.modelPrimaryColumn]: id
        }
      });

      if (!data) {
        return NextResponse.json(
          new ApiErrorResponse(
            basePath + ' not found.',
            HttpStatusCode.NOT_FOUND
          ),
          {
            status: HttpStatusCode.NOT_FOUND
          }
        );
      }

      const updatedData = await (prisma[modelName] as any).update({
        data: body,
        where: {
          [apiMetadata.modelPrimaryColumn]: id
        }
      });

      return NextResponse.json(
        new ApiResponse(
          updatedData,
          HttpStatusCode.OK,
          `Success update ${basePath}.`
        ),
        { status: HttpStatusCode.OK }
      );
    } catch (err) {
      return NextResponse.json(
        new ApiErrorResponse(
          'Failed to update ' + basePath,
          HttpStatusCode.BAD_REQUEST,
          []
        ),
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }
  } catch (err) {
    if (err instanceof ApiErrorResponse) {
      return NextResponse.json(err, { status: err.statusCode });
    }
    return NextResponse.json(
      new ApiErrorResponse(
        'Something went wrong',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        []
      ),
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
