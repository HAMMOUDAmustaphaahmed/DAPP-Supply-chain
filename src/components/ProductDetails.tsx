import React from 'react';
import { Download, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import Button from './common/Button';
import StatusBadge from './common/StatusBadge';
import { Product, Movement } from '../blockchain/types'; // Notez le changement de Types à types
import { generatePDF } from '../utils/generatePDF';
import StockCard from './StockCards'; // Correction du nom du composant

interface ProductDetailsProps {
  product: Product;
  onReception: () => void;
  onDelivery: () => void;
  onInternalMove: () => void;
  onUpdate: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onReception,
  onDelivery,
  onInternalMove,
  onUpdate
}) => {
  const confirmMovement = async (type: string, documentNumber: number) => {
    try {
      // Implémentation de la confirmation à faire
      onUpdate();
    } catch (error: unknown) { // Typage explicite de l'erreur
      // Vérification du type d'erreur et extraction sécurisée du message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Une erreur inconnue est survenue';
      alert('Erreur lors de la confirmation: ' + errorMessage);
    }
  };

  const renderMovementCard = (movement: Movement, type: 'reception' | 'delivery' | 'internal') => {
    const getColorClass = (type: 'reception' | 'delivery' | 'internal') => {
      const colors = {
        reception: 'blue',
        delivery: 'green',
        internal: 'purple'
      };
      return colors[type];
    };

    const color = getColorClass(type);

    return (
      <div className={`bg-${color}-50 p-2 rounded text-sm`}>
        <div className="font-medium">N° {movement.documentNumber}</div>
        <div className="text-gray-600">
          {movement.quantity} unités
          {movement.price && ` - ${new Intl.NumberFormat('fr-TN', {
            style: 'currency',
            currency: 'TND'
          }).format(movement.price)}/u`}
        </div>
        <div className="text-gray-500 text-xs">
          {movement.supplier || movement.buyer || movement.service} - 
          {new Date(movement.date).toLocaleDateString('fr-FR')}
        </div>
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => generatePDF(type, movement, product.name)}
            className={`btn btn-${color} text-xs`}
          >
            <Download size={12} />
            PDF
          </button>
          {movement.status === 'pending' && (
            <button
              onClick={() => confirmMovement(type, movement.documentNumber)}
              className="btn btn-success text-xs"
            >
              Confirmer
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        <div className="flex gap-2">
          <Button variant="primary" onClick={onReception}>
            <ArrowRight size={16} />
            Réception
          </Button>
          <Button variant="success" onClick={onDelivery}>
            <ArrowLeft size={16} />
            Livraison
          </Button>
          <Button variant="default" onClick={onInternalMove}>
            <RotateCcw size={16} />
            Mouvement Interne
          </Button>
        </div>
      </div>

      {/* Stock Overview */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StockCard
          title="Stock Actuel"
          value={product.currentQuantity}
          minStock={product.minStock}
        />
        <StockCard
          title="Total Reçu"
          value={product.totalQuantityReceived}
          type="reception"
        />
        <StockCard
          title="Total Livré"
          value={product.totalQuantityDelivered}
          type="delivery"
        />
        <StockCard
          title="Mouv. Internes"
          value={product.totalQuantityInternalMove}
          type="internal"
        />
      </div>

      {/* Pending Movements */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <h3 className="text-sm font-medium text-blue-800 mb-2">Réceptions en attente</h3>
          <div className="space-y-2">
            {product.pendingReceptions.map(movement => 
              renderMovementCard(movement, 'reception')
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-green-800 mb-2">Livraisons en attente</h3>
          <div className="space-y-2">
            {product.pendingDeliveries.map(movement => 
              renderMovementCard(movement, 'delivery')
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-purple-800 mb-2">Mouvements internes en attente</h3>
          <div className="space-y-2">
            {product.pendingInternalMoves.map(movement => 
              renderMovementCard(movement, 'internal')
            )}
          </div>
        </div>
      </div>

      {/* Blockchain History */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Historique Blockchain</h3>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {product.history.slice(-10).map((block, index) => (
            <div key={block.hash} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Block #{block.index} - {block.data.type}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(block.timestamp).toLocaleString('fr-FR')}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                <p><strong>Hash:</strong> <span className="font-mono">{block.hash}</span></p>
                <p><strong>Hash Précédent:</strong> <span className="font-mono">{block.previousHash}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;