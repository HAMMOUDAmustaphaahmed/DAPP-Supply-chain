import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { MovementFormData, Product } from '../../blockchain/types';

interface DeliveryModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (data: MovementFormData) => void;
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<MovementFormData>({
    quantity: 0,
    price: undefined,
    buyer: '',
    service: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.quantity > product.currentQuantity) {
      alert('Stock insuffisant pour cette livraison !');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal title="Bon de Livraison" onClose={onClose}>
      <div className="mb-4 bg-green-50 p-3 rounded">
        <div className="text-sm">
          <strong>Produit:</strong> {product.name}
        </div>
        <div className="text-sm">
          <strong>Stock Disponible:</strong> {product.currentQuantity}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Quantité à Livrer"
          type="number"
          required
          min={1}
          max={product.currentQuantity}
          value={formData.quantity}
          onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
        />

        <Input
          label="Prix de Vente Unitaire (TND)"
          type="number"
          step="0.01"
          min={0}
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value ? Number(e.target.value) : undefined})}
        />

        <Input
          label="Client"
          required
          value={formData.buyer}
          onChange={(e) => setFormData({...formData, buyer: e.target.value})}
        />

        <Input
          label="Service"
          value={formData.service}
          onChange={(e) => setFormData({...formData, service: e.target.value})}
        />

        <Input
          label="Lieu de Livraison"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        />

        <Input
          label="Date de Livraison"
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />

        <textarea
          className="form-control"
          placeholder="Notes/Remarques"
          value={formData.notes || ''}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />

        {formData.quantity > 0 && formData.price && (
          <div className="bg-blue-50 p-3 rounded">
            <div className="text-sm text-blue-800">
              <strong>Total:</strong> {new Intl.NumberFormat('fr-TN', {
                style: 'currency',
                currency: 'TND'
              }).format(formData.quantity * formData.price)}
            </div>
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <Button variant="default" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            type="submit" 
            variant="success"
            disabled={formData.quantity > product.currentQuantity}
          >
            Créer Bon de Livraison
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeliveryModal;