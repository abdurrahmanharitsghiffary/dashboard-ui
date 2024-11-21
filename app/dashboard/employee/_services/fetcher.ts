'use server';

import { ApiResponse } from '@/utils/api-response';
import { Employee } from '@prisma/client';

export async function fetchEmployee(): Promise<ApiResponse<Employee[]>> {
  const response = await fetch('http://localhost:3000/api/v1/employee', {
    next: { tags: ['employee'] }
  });

  if (!response.ok) throw new Error('Failed to fetch employee');

  const data = await response.json();

  return data;
}

export async function fetchEmployeeById(
  id: string
): Promise<ApiResponse<Employee>> {
  const response = await fetch('http://localhost:3000/api/v1/employee/' + id, {
    next: { tags: ['employee', id] }
  });

  if (!response.ok) throw new Error('Failed to fetch employee');

  const data = await response.json();

  return data;
}
