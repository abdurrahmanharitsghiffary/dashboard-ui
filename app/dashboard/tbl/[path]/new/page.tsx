import React from 'react';
import fs from 'fs/promises';
import { ApiResponse } from '@/utils/api-response';
import { ApiMeta } from '@/types/metadata/api-meta';
import CreateForm from '@/app/dashboard/tbl/_components/forms/create-form';
import PageContainer from '@/components/layout/page-container';

export default async function Page({ params }: { params: { path: string } }) {
  const basePath = params.path;

  const apiMetaJson = await fs.readFile(
    __dirname + `../../../../../../../../metadata/api/api_${basePath}.json`,
    'utf-8'
  );

  const response = await fetch(`http://localhost:3000/api/v1/${basePath}`);
  const json: ApiResponse<any> = await response.json();
  const apiMeta: ApiMeta = JSON.parse(apiMetaJson);
  // console.log(apiMeta, 'API META');

  return (
    <PageContainer scrollable>
      <CreateForm apiMeta={apiMeta} />
    </PageContainer>
  );
}
