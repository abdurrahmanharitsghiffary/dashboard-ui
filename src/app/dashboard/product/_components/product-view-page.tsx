import { notFound } from 'next/navigation';

import { fakeProducts, Product } from '@/constants/mock-api';
import ProductForm from '@/features/product/components/product-form';

interface ProductViewPageProps {
  productId: string;
}

export default async function ProductViewPage({
  productId,
}: ProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Product';

  if (productId !== 'new') {
    const data = await fakeProducts.getProductById(Number(productId));
    product = data.product as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Product`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
