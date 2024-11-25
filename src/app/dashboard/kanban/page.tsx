import type { Metadata } from 'next';

import KanbanViewPage from '@/features/kanban/components/kanban-view-page';

export const metadata: Metadata = {
  title: 'Dashboard : Kanban view',
};

export default function Page() {
  return <KanbanViewPage />;
}
