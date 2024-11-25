import DataTable from '@/components/ui/table/data-table';
import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { columns } from '@/features/product/components/tables/columns';
import { searchParamsCache } from '@/lib/searchparams';

export default async function ProductListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories }),
  };

  const data = await fakeProducts.getProducts(filters);
  const totalProducts = data.total_products;
  const products: Product[] = data.products;

  return (
    <DataTable columns={columns} data={products} totalItems={totalProducts} />
  );
}