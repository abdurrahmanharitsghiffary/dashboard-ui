'use server';

import { CreateEmployeeSchema } from '@/app/dashboard/employee/_schema/create-employee-schema';
import { UpdateEmployeeSchema } from '@/app/dashboard/employee/_schema/update-employee-schema';
import { ApiErrorResponse } from '@/utils/api-response';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createSubmit(values: CreateEmployeeSchema) {
  const response = await fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    body: JSON.stringify(values)
  });

  const data = await response.json();

  if (!response.ok) throw new Error((data as ApiErrorResponse)?.message);

  if (response.ok) {
    revalidateTag('employee');
    redirect('/dashboard/employee');
  }
}

export async function updateSubmit(id: string, values: UpdateEmployeeSchema) {
  const response = await fetch('http://localhost:3000/api/v1/employee/' + id, {
    method: 'PATCH',
    body: JSON.stringify(values)
  });

  const data = await response.json();

  if (!response.ok) throw new Error((data as ApiErrorResponse)?.message);

  if (response.ok) {
    revalidateTag('employee');
    redirect('/dashboard/employee');
  }
}

export async function deleteEmployee(id: string) {
  const response = await fetch('http://localhost:3000/api/v1/employee/' + id, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (!response.ok) throw new Error((data as ApiErrorResponse)?.message);

  if (response.ok) {
    revalidateTag('employee');
    redirect('/dashboard/employee');
  }
}
