import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEmployeeSchema } from '@/features/employee/api/create-employee';
import { fetchEmployeeOptions } from '@/features/employee/api/fetch-employee';
import { fetchEmployeesOptions } from '@/features/employee/api/fetch-employees';
import { api } from '@/lib/api';
import type { MutationConfig } from '@/lib/react-query';

export const updateEmployeeSchema = createEmployeeSchema.partial();
export type UpdateEmployeeSchema = z.infer<typeof updateEmployeeSchema>;

interface UpdateEmployeeOptions extends UpdateEmployeeSchema {
  id: string;
}

export async function updateEmployee({
  id,
  ...options
}: UpdateEmployeeOptions) {
  const response = await api.patch(`/employee/${id}`, options);
  return response.data;
}

interface UseUpdateEmployeeOptions {
  mutationConfig?: MutationConfig<typeof updateEmployee>;
}

export const useUpdateEmployee = (options?: UseUpdateEmployeeOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = options?.mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: fetchEmployeesOptions().queryKey,
      });

      if (args?.[1]?.id)
        queryClient.invalidateQueries({
          queryKey: fetchEmployeeOptions(args[1].id).queryKey,
        });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateEmployee,
  });
};
