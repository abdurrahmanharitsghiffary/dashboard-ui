'use client';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import React, { type PropsWithChildren } from 'react';
import { toast } from 'sonner';

import ThemeProvider from '@/components/layout/theme-toggle/theme-provider';
import { AlertDialogProvider } from '@/components/ui/alert-dialog-provider';
import { ENV } from '@/config/env';
import { ExceptionHandler } from '@/utils/exception-handler';

interface AppProviderProps extends PropsWithChildren {
  session: SessionProviderProps['session'];
}

export default function AppProvider({ children, session }: AppProviderProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError(err) {
              const exceptionHandler = new ExceptionHandler();
              const errorMessage =
                exceptionHandler.error(err)?.message ??
                ('Something went wrong!' as string);

              toast.error(errorMessage);
            },
          },
        },
        queryCache: new QueryCache({
          onError: (err) => {
            const exceptionHandler = new ExceptionHandler();
            const errorMessage =
              exceptionHandler.error(err)?.message ??
              ('Something went wrong!' as string);

            toast.error(errorMessage);
          },
        }),
      }),
  );

  return (
    <AlertDialogProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          {ENV.NODE_ENV === 'development' ? (
            <ReactQueryDevtools client={queryClient} />
          ) : null}
          <SessionProvider session={session}>{children}</SessionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AlertDialogProvider>
  );
}
