import type { Metadata } from 'next';

import OverViewPage from './_components/overview';

export const metadata: Metadata = {
  title: 'Dashboard : Overview',
};

export default function Page() {
  return <OverViewPage />;
}
