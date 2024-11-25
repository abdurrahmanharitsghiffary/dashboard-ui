import { Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { SearchParams } from 'nuqs/parsers';
import { Suspense } from 'react';

import ProductListingPage from '@/app/dashboard/product/_components/product-listing';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import DataTableSkeleton from '@/components/ui/table/data-table-skeleton';
import ProductTableAction from '@/features/product/components/tables/product-table-action';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Dashboard: Products',
};

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Products"
            description="Manage products (Server side table functionalities.)"
          />
          <Link
            href="/dashboard/product/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 size-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ProductTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ProductListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
