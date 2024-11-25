'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '@/components/ui/button';

export default function EmployeeErrorFormBoundary({
  children,
}: PropsWithChildren) {
  const router = useRouter();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-xl font-bold">
                {error?.response?.data?.message ?? 'Something went wrong.'}
              </p>
              <div className="flex justify-between gap-4">
                <Button onClick={() => router.back()}>Go Back</Button>
                <Button variant="secondary" onClick={resetErrorBoundary}>
                  Try Again
                </Button>
              </div>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
