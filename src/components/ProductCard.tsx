import React from 'react';
import { Hash, User, Package } from 'lucide-react';
import { Product } from '../blockchain/types';
import StatusBadge from './common/StatusBadge';

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const getStockStatus = () => {
    if (product.currentQuantity <= product.minStock) return 'critical';
    if (product.currentQuantity <= product.minStock * 2) return 'low';
    return 'good';
  };

  const getPendingMovements = () => {
    return product.pendingReceptions.length + 
           product.pendingDeliveries.length + 
           product.pendingInternalMoves.length;
  };

  return (
    <div 
      className={`card product-card ${getStockStatus()}`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <StatusBadge 
          status={getStockStatus()}
          text={`Stock: ${product.currentQuantity}`}
        />
      </div>
      
      <div className="space-y-1 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-2">
          <Hash size={12} />
          <span>ID: {product.productId}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={12} />
          <span>Fournisseur: {product.supplier}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 text-xs">
        <div className="bg-blue-50 p-2 rounded text-center">
          <div className="text-blue-600 font-medium">Reçu</div>
          <div className="text-blue-800">{product.totalQuantityReceived}</div>
        </div>
        <div className="bg-green-50 p-2 rounded text-center">
          <div className="text-green-600 font-medium">Livré</div>
          <div className="text-green-800">{product.totalQuantityDelivered}</div>
        </div>
        <div className="bg-purple-50 p-2 rounded text-center">
          <div className="text-purple-600 font-medium">Interne</div>
          <div className="text-purple-800">{product.totalQuantityInternalMove}</div>
        </div>
      </div>

      {getPendingMovements() > 0 && (
        <div className="mt-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
          {getPendingMovements()} mouvement(s) en attente
        </div>
      )}
    </div>
  );
};

export default ProductCard;