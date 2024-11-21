import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import EmployeeTable from './employee-tables';
import { Employee } from '@prisma/client';
import { ApiResponse } from '@/utils/api-response';

export default async function EmployeeListingPage() {
  // const page = searchParamsCache.get('page');
  // const search = searchParamsCache.get('q');
  // const gender = searchParamsCache.get('gender');
  // const pageLimit = searchParamsCache.get('limit');

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(gender && { genders: gender })
  // };

  const response = await fetch('http://localhost:3000/api/v1/employee', {
    next: { tags: ['employee'] }
  });
  const data: ApiResponse<Employee[]> = await response.json();
  const totalUsers = data?.data?.length ?? [];
  const employee: Employee[] = data?.data ?? [];

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <EmployeeTable data={employee} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
