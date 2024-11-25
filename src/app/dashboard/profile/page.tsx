import type { Metadata } from 'next';

import ProfileViewPage from './_components/profile-view-page';

export const metadata: Metadata = {
  title: 'Dashboard : Profile',
};

export default function Page() {
  return <ProfileViewPage />;
}
