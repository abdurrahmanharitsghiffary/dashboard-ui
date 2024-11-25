import { redirect } from 'next/navigation';

import { auth } from '@/features/auth/auth';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/');
  } else {
    redirect('/dashboard/overview');
  }
}
