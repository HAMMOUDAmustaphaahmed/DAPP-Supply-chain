import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  type?: 'reception' | 'delivery' | 'internal';
  minStock?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, type, minStock }) => {
  const getBackgroundColor = () => {
    if (type) {
      return {
        reception: 'bg-blue-50',
        delivery: 'bg-green-50',
        internal: 'bg-purple-50'
      }[type];
    }
    
    if (typeof minStock !== 'undefined') {
      if (value <= minStock) return 'bg-red-50';
      if (value <= minStock * 2) return 'bg-yellow-50';
      return 'bg-green-50';
    }

    return 'bg-gray-50';
  };

  const getTextColor = () => {
    if (type) {
      return {
        reception: 'text-blue-800',
        delivery: 'text-green-800',
        internal: 'text-purple-800'
      }[type];
    }
    
    if (typeof minStock !== 'undefined') {
      if (value <= minStock) return 'text-red-800';
      if (value <= minStock * 2) return 'text-yellow-800';
      return 'text-green-800';
    }

    return 'text-gray-800';
  };

  return (
    <div className={`p-4 rounded-lg ${getBackgroundColor()}`}>
      <div className="text-sm text-gray-600">{title}</div>
      <div className={`text-2xl font-bold ${getTextColor()}`}>
        {value.toLocaleString('fr-FR')}
      </div>
      {minStock && (
        <div className="text-xs text-gray-500">
          Min: {minStock.toLocaleString('fr-FR')}
        </div>
      )}
    </div>
  );
};

export default StatsCard;