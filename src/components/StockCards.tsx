import React from 'react';

interface StockCardProps {
  title: string;
  value: number;
  minStock?: number;
  type?: 'reception' | 'delivery' | 'internal';
}

const StockCard: React.FC<StockCardProps> = ({ title, value, minStock, type }) => {
  const getStatusColor = () => {
    if (type) {
      const colors = {
        reception: 'bg-blue-50 text-blue-700',
        delivery: 'bg-green-50 text-green-700',
        internal: 'bg-purple-50 text-purple-700'
      };
      return colors[type];
    }

    if (minStock) {
      if (value <= minStock) return 'bg-red-50 text-red-700';
      if (value <= minStock * 2) return 'bg-yellow-50 text-yellow-700';
      return 'bg-green-50 text-green-700';
    }

    return 'bg-gray-50 text-gray-700';
  };

  return (
    <div className={`p-4 rounded-lg ${getStatusColor()}`}>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      {minStock && (
        <div className="text-xs mt-1">
          Stock minimum: {minStock.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default StockCard;