import React from 'react';
import { Package } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../blockchain/types';

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelectProduct }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Produits ({products.length})
      </h2>
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onSelect={() => onSelectProduct(product)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Aucun produit trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;