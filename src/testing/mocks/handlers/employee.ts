import { HttpResponse, http } from 'msw';

import { ENV } from '@/config/env';
import type { CreateEmployeeSchema } from '@/features/employee/api/create-employee';
import type { UpdateEmployeeSchema } from '@/features/employee/api/update-employee';
import { db, persistDb } from '@/testing/mocks/db';
import { networkDelay } from '@/testing/mocks/utils';
import { ApiErrorResponse, ApiResponse } from '@/utils/api-response';
import HttpStatusCode from '@/utils/http-code';

export const employeeHandlers = [
  http.get(`${ENV.BACKEND_URL}/api/v1/employee`, async () => {
    await networkDelay();

    try {
      const employee = db.employee.findMany({});

      return HttpResponse.json(new ApiResponse(employee, HttpStatusCode.OK));
    } catch (error: any) {
      return HttpResponse.json(
        new ApiErrorResponse(
          'Internal Server Error',
          HttpStatusCode.INTERNAL_SERVER_ERROR,
        ),
        { status: HttpStatusCode.INTERNAL_SERVER_ERROR },
      );
    }
  }),

  http.get(
    `${ENV.BACKEND_URL}/api/v1/employee/:employeeId`,
    async ({ params }) => {
      await networkDelay();

      try {
        const employeeId = params?.employeeId?.toString() ?? '';

        const employee = db.employee.findFirst({
          where: { id: { equals: employeeId } },
        });

        if (!employee)
          return HttpResponse.json(
            new ApiErrorResponse('Not found', HttpStatusCode.NOT_FOUND),
            { status: HttpStatusCode.NOT_FOUND },
          );

        return HttpResponse.json(new ApiResponse(employee, HttpStatusCode.OK));
      } catch (error: any) {
        return HttpResponse.json(
          new ApiErrorResponse(
            'Internal Server Error',
            HttpStatusCode.INTERNAL_SERVER_ERROR,
          ),
          { status: HttpStatusCode.INTERNAL_SERVER_ERROR },
        );
      }
    },
  ),

  http.post(`${ENV.BACKEND_URL}/api/v1/employee`, async ({ request }) => {
    await networkDelay();

    try {
      const data = (await request.json()) as CreateEmployeeSchema;
      const result = db.employee.create(data);

      await persistDb('employee');

      return HttpResponse.json(
        new ApiResponse(result, HttpStatusCode.CREATED),
        { status: HttpStatusCode.CREATED },
      );
    } catch (error: any) {
      return HttpResponse.json(
        new ApiErrorResponse(
          'Internal Server Error',
          HttpStatusCode.INTERNAL_SERVER_ERROR,
        ),
        { status: HttpStatusCode.INTERNAL_SERVER_ERROR },
      );
    }
  }),

  http.delete(
    `${ENV.BACKEND_URL}/api/v1/employee/:employeeId`,
    async ({ params }) => {
      await networkDelay();

      try {
        const employeeId = (params?.employeeId as string) ?? '';

        db.employee.delete({
          where: {
            id: {
              equals: employeeId,
            },
          },
        });

        await persistDb('employee');
        return new Response(null, {
          status: HttpStatusCode.NO_CONTENT,
        });
      } catch (error: any) {
        console.error(error, 'Error');
        return HttpResponse.json(
          new ApiErrorResponse(
            'Internal Server Error',
            HttpStatusCode.INTERNAL_SERVER_ERROR,
          ),
          { status: HttpStatusCode.INTERNAL_SERVER_ERROR },
        );
      }
    },
  ),

  http.patch(
    `${ENV.BACKEND_URL}/api/v1/employee/:employeeId`,
    async ({ params, request }) => {
      await networkDelay();

      try {
        const body = (await request.json()) as UpdateEmployeeSchema;
        const employeeId = (params?.employeeId as string) ?? '';

        db.employee.update({
          where: {
            id: {
              equals: employeeId,
            },
          },
          data: body,
        });

        await persistDb('employee');
        return new Response(null, {
          status: HttpStatusCode.NO_CONTENT,
        });
      } catch (error: any) {
        return HttpResponse.json(
          new ApiErrorResponse(
            'Internal Server Error',
            HttpStatusCode.INTERNAL_SERVER_ERROR,
          ),
          { status: HttpStatusCode.INTERNAL_SERVER_ERROR },
        );
      }
    },
  ),
];
