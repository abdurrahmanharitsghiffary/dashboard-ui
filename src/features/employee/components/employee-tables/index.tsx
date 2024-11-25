import DataTable from '@/components/ui/table/data-table';
import type { Employee } from '@/types/schema/employee';

import { columns } from './columns';

interface EmployeeTableProps {
  data: Employee[];
  totalData: number;
}

export default function EmployeeTable({ data, totalData }: EmployeeTableProps) {
  return <DataTable columns={columns} data={data} totalItems={totalData} />;
}
