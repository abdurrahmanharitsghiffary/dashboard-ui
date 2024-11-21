import DynamicDataTable from '@/app/dashboard/tbl/_components/data-table';
import PageContainer from '@/components/layout/page-container';
import { ApiMeta } from '@/types/metadata/api-meta';
import { ApiResponse } from '@/utils/api-response';
import fs from 'fs/promises';
import React from 'react';

export default async function TablePage({
  params
}: {
  params: { path: string };
}) {
  const basePath = params.path;

  const apiMetaJson = await fs.readFile(
    __dirname + `../../../../../../../metadata/api/api_${basePath}.json`,
    'utf-8'
  );

  const response = await fetch(`http://localhost:3000/api/v1/${basePath}`);
  const json: ApiResponse<any> = await response.json();
  const apiMeta: ApiMeta = JSON.parse(apiMetaJson);
  console.log(apiMeta, 'meta');

  return (
    <PageContainer scrollable>
      <DynamicDataTable
        totalData={json?.data?.length}
        data={json?.data ?? []}
        apiMeta={apiMeta}
      />
    </PageContainer>
  );
}
