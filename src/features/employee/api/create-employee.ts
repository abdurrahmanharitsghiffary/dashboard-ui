import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { fetchEmployeesOptions } from '@/features/employee/api/fetch-employees';
import { api } from '@/lib/api';
import type { MutationConfig } from '@/lib/react-query';
import type { Employee } from '@/types/schema/employee';
import type { ApiResponse } from '@/utils/api-response';

export const createEmployeeSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  country: z.enum(['ID', 'USA', 'ENG', 'KOR'], {
    required_error: 'Please select a country.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  company: z.string().min(1, {
    message: 'Company name is required.',
  }),
  gender: z.enum(['MALE', 'FEMALE'], {
    required_error: 'Please select a gender.',
  }),
});
export type CreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;

export async function createEmployee(values: CreateEmployeeSchema) {
  const response = await api.post<ApiResponse<Employee>>('/employee', values);
  return response.data;
}

interface UseCreateEmployeeOptions {
  mutationConfig?: MutationConfig<typeof createEmployee>;
}

export const useCreateEmployee = (options?: UseCreateEmployeeOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = options?.mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: fetchEmployeesOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createEmployee,
  });
};
