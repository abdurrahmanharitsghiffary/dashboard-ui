import type { Metadata } from 'next';
import type { SearchParams } from 'nuqs/parsers';
import React, { Suspense } from 'react';

import EmployeePageHeading from '@/app/dashboard/employee/_components/employee-page-heading';
import EmployeePageContainer from '@/app/dashboard/employee/_components/layout/employee-page-container';
import EmployeePageErrorBoundary from '@/app/dashboard/employee/_components/layout/employee-page-error-boundary';
import { Separator } from '@/components/ui/separator';
import DataTableSkeleton from '@/components/ui/table/data-table-skeleton';
import EmployeeTableAction from '@/features/employee/components/employee-tables/employee-table-action';
import { searchParamsCache, serialize } from '@/lib/searchparams';

import EmployeeListing from './_components/employee-listing';

export const metadata: Metadata = {
  title: 'Dashboard : Employees',
};

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <EmployeePageContainer>
      <EmployeePageHeading />
      <Separator />
      <div className="space-y-4">
        <EmployeeTableAction />
        <EmployeePageErrorBoundary>
          <Suspense key={key} fallback={<DataTableSkeleton />}>
            <EmployeeListing />
          </Suspense>
        </EmployeePageErrorBoundary>
      </div>
    </EmployeePageContainer>
  );
}
