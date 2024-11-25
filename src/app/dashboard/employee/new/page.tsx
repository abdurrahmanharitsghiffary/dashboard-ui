import type { Metadata } from 'next';
import { Suspense } from 'react';

import EmployeeErrorFormBoundary from '@/app/dashboard/employee/_components/layout/employee-form-error-boundary';
import PageContainer from '@/components/layout/page-container';
import CreateEmployeeForm from '@/features/employee/components/forms/create-employee-form';
import FormContainer from '@/features/employee/components/forms/form-container';
import FormSkeleton from '@/features/employee/components/forms/form-skeleton';

export const metadata: Metadata = {
  title: 'Dashboard : Create Employee',
};

export default function Page() {
  return (
    <PageContainer>
      <FormContainer title="Create Employee">
        <EmployeeErrorFormBoundary>
          <Suspense fallback={<FormSkeleton />}>
            <CreateEmployeeForm />
          </Suspense>
        </EmployeeErrorFormBoundary>
      </FormContainer>
    </PageContainer>
  );
}
