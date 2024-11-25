import type { Metadata } from 'next';
import { Suspense } from 'react';

import EmployeeErrorFormBoundary from '@/app/dashboard/employee/_components/layout/employee-form-error-boundary';
import PageContainer from '@/components/layout/page-container';
import EmployeeViewForm from '@/features/employee/components/forms/employee-view-form';
import FormContainer from '@/features/employee/components/forms/form-container';
import FormSkeleton from '@/features/employee/components/forms/form-skeleton';

export const metadata: Metadata = {
  title: 'Dashboard : View Employee',
};

export default async function Page() {
  return (
    <PageContainer>
      <FormContainer>
        <EmployeeErrorFormBoundary>
          <Suspense fallback={<FormSkeleton />}>
            <EmployeeViewForm />
          </Suspense>
        </EmployeeErrorFormBoundary>
      </FormContainer>
    </PageContainer>
  );
}
