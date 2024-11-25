'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import React, { type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '@/components/ui/button';

export default function EmployeeTableErrorBoundary({
  children,
}: PropsWithChildren) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary, error }) => (
            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-bold">{error?.message}</p>
              <Button onClick={resetErrorBoundary}>Try again</Button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
