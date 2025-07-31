import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { MovementFormData, Product } from '../../blockchain/types';

interface ReceptionModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (data: MovementFormData) => void;
}

const ReceptionModal: React.FC<ReceptionModalProps> = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<MovementFormData>({
    quantity: 0,
    price: 0,
    supplier: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal title="Bon de Réception" onClose={onClose}>
      <div className="mb-4 bg-blue-50 p-3 rounded">
        <div className="text-sm">
          <strong>Produit:</strong> {product.name}
        </div>
        <div className="text-sm">
          <strong>Stock Actuel:</strong> {product.currentQuantity}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Quantité Reçue"
          type="number"
          required
          min={1}
          value={formData.quantity}
          onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
        />
        <Input
          label="Prix Unitaire (TND)"
          type="number"
          required
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
        />
        <Input
          label="Fournisseur"
          required
          value={formData.supplier}
          onChange={(e) => setFormData({...formData, supplier: e.target.value})}
        />
        <Input
          label="Lieu de Réception"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        />
        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
        <textarea
          className="form-control"
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />

        {formData.quantity && formData.price && (
          <div className="bg-green-50 p-3 rounded">
            <div className="text-sm text-green-600">
              Total: {new Intl.NumberFormat('fr-TN', {
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
          <Button type="submit" variant="primary">
            Créer Bon de Réception
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReceptionModal;