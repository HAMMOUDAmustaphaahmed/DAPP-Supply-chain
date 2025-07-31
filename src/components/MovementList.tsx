import React from 'react';
import { Download } from 'lucide-react';
import Button from './common/Button';
import { Movement } from '../blockchain/types';
import { formatCurrency, formatDate } from '../utils/formatters';

interface MovementListProps {
  movements: Movement[];
  type: 'reception' | 'delivery' | 'internal';
  productName: string;
  onConfirm?: (documentNumber: number) => void;
  onDownload: (movement: Movement) => void;
}

const MovementList: React.FC<MovementListProps> = ({
  movements,
  type,
  productName,
  onConfirm,
  onDownload
}) => {
  const getTypeStyles = () => {
    const styles = {
      reception: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        button: 'btn-blue'
      },
      delivery: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        button: 'btn-green'
      },
      internal: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        button: 'btn-purple'
      }
    };
    return styles[type];
  };

  const styles = getTypeStyles();

  return (
    <div className="space-y-2">
      {movements.map((movement) => (
        <div key={movement.documentNumber} className={`${styles.bg} p-3 rounded-lg`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-medium">
                Bon N° {movement.documentNumber}
              </div>
              <div className="text-sm text-gray-600">
                {movement.quantity} unités
                {movement.price && ` - ${formatCurrency(movement.price)}/u`}
              </div>
              <div className="text-xs text-gray-500">
                {movement.supplier || movement.buyer || movement.service} - {formatDate(movement.date)}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => onDownload(movement)}
              >
                <Download size={14} />
                PDF
              </Button>
              {movement.status === 'pending' && onConfirm && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onConfirm(movement.documentNumber)}
                >
                  Confirmer
                </Button>
              )}
            </div>
          </div>
          {movement.notes && (
            <div className="text-xs text-gray-600 mt-1">
              {movement.notes}
            </div>
          )}
        </div>
      ))}
      {movements.length === 0 && (
        <div className={`${styles.bg} p-4 rounded-lg text-center`}>
          <div className={`text-sm ${styles.text}`}>
            Aucun mouvement à afficher
          </div>
        </div>
      )}
    </div>
  );
};

export default MovementList;