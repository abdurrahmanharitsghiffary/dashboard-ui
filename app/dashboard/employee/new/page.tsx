import CreateEmployeeForm from '@/app/dashboard/employee/_components/forms/create-employee-form';
import PageContainer from '@/components/layout/page-container';

export const metadata = {
  title: 'Dashboard : Create Employee'
};

export default async function Page() {
  return (
    <PageContainer>
      <CreateEmployeeForm />
    </PageContainer>
  );
}
