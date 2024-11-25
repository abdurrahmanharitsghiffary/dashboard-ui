import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { Toaster } from '@/components/ui/sonner';
import '../styles/globals.css';
import { auth } from '@/features/auth/auth';
import { cn } from '@/lib/utils';
// import { enableMocking } from '@/testing/mocks';

import AppProvider from './app-provider';

export const metadata: Metadata = {
  title: 'Dashboard Admin',
  description: 'Basic dashboard with Next.js and Shadcn',
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await enableMocking();

  const session = await auth();
  return (
    <html
      lang="en"
      className={cn(lato.className)}
      suppressHydrationWarning={true}
    >
      <body className={'overflow-hidden'}>
        <NextTopLoader showSpinner={false} />
        <AppProvider session={session}>
          <Toaster />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
