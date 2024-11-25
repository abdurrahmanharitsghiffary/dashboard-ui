import type { Metadata } from 'next';
import { Suspense } from 'react';

import EmployeeErrorFormBoundary from '@/app/dashboard/employee/_components/layout/employee-form-error-boundary';
import PageContainer from '@/components/layout/page-container';
import FormContainer from '@/features/employee/components/forms/form-container';
import FormSkeleton from '@/features/employee/components/forms/form-skeleton';
import UpdateEmployeeForm from '@/features/employee/components/forms/update-employee-form';

export const metadata: Metadata = {
  title: 'Dashboard : Update Employee',
};

export default async function Page() {
  return (
    <PageContainer>
      <FormContainer>
        <EmployeeErrorFormBoundary>
          <Suspense fallback={<FormSkeleton />}>
            <UpdateEmployeeForm />
          </Suspense>
        </EmployeeErrorFormBoundary>
      </FormContainer>
    </PageContainer>
  );
}
