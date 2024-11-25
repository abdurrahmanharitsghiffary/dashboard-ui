import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { NameSpace } from '@/constants/api-namespaces';
import { api } from '@/lib/api';
import { QueryKeyFactory } from '@/lib/query-key-factory';
import type { QueryConfig } from '@/lib/react-query';
import type { Employee } from '@/types/schema/employee';
import { ApiResponse } from '@/utils/api-response';

export async function fetchEmployees() {
  const response = await api.get<ApiResponse<Employee[]>>(`/employee`);
  return response.data;
}

export const fetchEmployeesOptions = () => {
  return queryOptions({
    queryKey: QueryKeyFactory.list(NameSpace.EMPLOYEE),
    queryFn: () => fetchEmployees(),
  });
};

interface UseFetchEmployeesOptions {
  queryConfig?: QueryConfig<typeof fetchEmployees>;
}

export const useFetchEmployees = (options?: UseFetchEmployeesOptions) => {
  return useQuery({
    ...fetchEmployeesOptions(),
    ...options?.queryConfig,
  });
};

export const useSuspenseFetchEmployees = (
  options?: UseFetchEmployeesOptions,
) => {
  return useSuspenseQuery({
    ...fetchEmployeesOptions(),
    ...options?.queryConfig,
  });
};
