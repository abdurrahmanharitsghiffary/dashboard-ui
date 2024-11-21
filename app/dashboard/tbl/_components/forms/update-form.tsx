import PageContainer from '@/components/layout/page-container';
import { ApiMeta } from '@/types/metadata/api-meta';
import React from 'react';

interface UpdateFormProps {
  apiMeta: ApiMeta;
}

export default function UpdateForm({ apiMeta }: UpdateFormProps) {
  return <PageContainer scrollable>{JSON.stringify(apiMeta)}</PageContainer>;
}
