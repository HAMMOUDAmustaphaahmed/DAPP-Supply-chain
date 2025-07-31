import React from 'react';
import { Block } from '../blockchain/types';
import { formatDateTime } from '../utils/formatters';

interface BlockchainHistoryProps {
  blocks: Block[];
  maxItems?: number;
}

const BlockchainHistory: React.FC<BlockchainHistoryProps> = ({
  blocks,
  maxItems = 10
}) => {
  const recentBlocks = blocks.slice(-maxItems);

  return (
    <div className="space-y-3">
      {recentBlocks.map((block, index) => (
        <div key={block.hash} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Block #{block.index} - {block.data.type}
            </span>
            <span className="text-sm text-gray-500">
              {formatDateTime(block.timestamp)}
            </span>
          </div>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Hash:</strong>{' '}
              <span className="font-mono text-xs">{block.hash}</span>
            </p>
            <p>
              <strong>Hash Précédent:</strong>{' '}
              <span className="font-mono text-xs">{block.previousHash}</span>
            </p>
            {block.data.documentNumber && (
              <p>
                <strong>N° Document:</strong> {block.data.documentNumber}
              </p>
            )}
            {block.data.quantity && (
              <p>
                <strong>Quantité:</strong> {block.data.quantity}
              </p>
            )}
            {block.data.price && (
              <p>
                <strong>Prix:</strong>{' '}
                {new Intl.NumberFormat('fr-TN', {
                  style: 'currency',
                  currency: 'TND'
                }).format(block.data.price)}
              </p>
            )}
            {block.data.notes && (
              <p>
                <strong>Notes:</strong> {block.data.notes}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockchainHistory;