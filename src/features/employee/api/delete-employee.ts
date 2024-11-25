import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchEmployeeOptions } from '@/features/employee/api/fetch-employee';
import { fetchEmployeesOptions } from '@/features/employee/api/fetch-employees';
import { api } from '@/lib/api';
import type { MutationConfig } from '@/lib/react-query';

interface DeleteEmployeeOptions {
  id: string;
}

export async function deleteEmployee({ id }: DeleteEmployeeOptions) {
  const response = await api.delete(`/employee/${id}`);
  return response.data;
}

interface UseDeleteEmployeeOptions {
  mutationConfig?: MutationConfig<typeof deleteEmployee>;
}

export const useDeleteEmployee = (options?: UseDeleteEmployeeOptions) => {
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
    mutationFn: deleteEmployee,
  });
};
