import React, { type PropsWithChildren } from 'react';

import PageContainer from '@/components/layout/page-container';

export default function EmployeePageContainer({ children }: PropsWithChildren) {
  return (
    <PageContainer scrollable>
      <div className="space-y-4">{children}</div>
    </PageContainer>
  );
}
