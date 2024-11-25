import React, { type PropsWithChildren } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormContainerProps extends PropsWithChildren {
  title?: string;
}

export default function FormContainer({ children, title }: FormContainerProps) {
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {title ? title : 'Employee Information'}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
