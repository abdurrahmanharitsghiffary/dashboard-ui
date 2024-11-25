'use client';

import { useSuspenseFetchEmployees } from '@/features/employee/api/fetch-employees';
import EmployeeTable from '@/features/employee/components/employee-tables';

export default function EmployeeListing() {
  const { data } = useSuspenseFetchEmployees();
  const employees = data?.data ?? [];

  return <EmployeeTable data={employees} totalData={employees?.length} />;
}
