import UpdateEmployeeForm from '@/app/dashboard/employee/_components/forms/update-employee-form';
import PageContainer from '@/components/layout/page-container';

export const metadata = {
  title: 'Dashboard : Update Employee'
};

export default function Page() {
  return (
    <PageContainer>
      <UpdateEmployeeForm />
    </PageContainer>
  );
}
