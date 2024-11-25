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
import type { ApiResponse } from '@/utils/api-response';

export async function fetchEmployee(id: string) {
  const response = await api.get<ApiResponse<Employee>>(`/employee/${id}`);
  return response.data;
}

export const fetchEmployeeOptions = (id: string) => {
  return queryOptions({
    queryKey: QueryKeyFactory.item(NameSpace.EMPLOYEE, id),
    queryFn: () => fetchEmployee(id),
  });
};

interface UseFetchEmployeeOptions {
  id: string;
  queryConfig?: QueryConfig<typeof fetchEmployee>;
}

export const useFetchEmployee = ({
  id,
  queryConfig,
}: UseFetchEmployeeOptions) => {
  return useQuery({
    ...fetchEmployeeOptions(id),
    ...queryConfig,
  });
};

export const useSuspenseFetchEmployee = ({
  id,
  queryConfig,
}: UseFetchEmployeeOptions) => {
  return useSuspenseQuery({
    ...fetchEmployeeOptions(id),
    ...queryConfig,
  });
};
