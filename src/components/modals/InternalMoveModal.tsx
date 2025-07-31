import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { MovementFormData, Product } from '../../blockchain/types';

interface InternalMoveModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (data: MovementFormData) => void;
}

const InternalMoveModal: React.FC<InternalMoveModalProps> = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<MovementFormData>({
    quantity: 0,
    service: '',
    reason: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.quantity > product.currentQuantity) {
      alert('Quantité insuffisante en stock !');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal title="Bon de Sortie Interne" onClose={onClose}>
      <div className="mb-4 bg-purple-50 p-3 rounded">
        <div className="text-sm">
          <strong>Produit:</strong> {product.name}
        </div>
        <div className="text-sm">
          <strong>Stock Disponible:</strong> {product.currentQuantity}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Quantité à Transférer"
          type="number"
          required
          min={1}
          max={product.currentQuantity}
          value={formData.quantity}
          onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
        />
        <Input
          label="Service Destinataire"
          required
          value={formData.service}
          onChange={(e) => setFormData({...formData, service: e.target.value})}
        />
        <select
          className="form-control"
          value={formData.reason}
          onChange={(e) => setFormData({...formData, reason: e.target.value})}
          required
        >
          <option value="">Sélectionner la Raison</option>
          <option value="Utilisation interne">Utilisation interne</option>
          <option value="Transfert de service">Transfert de service</option>
          <option value="Test/Démonstration">Test/Démonstration</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Formation">Formation</option>
          <option value="Autre">Autre</option>
        </select>
        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
        <textarea
          className="form-control"
          placeholder="Notes/Détails"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />

        <div className="flex gap-2 justify-end">
          <Button variant="default" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary">
            Créer Bon de Sortie
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InternalMoveModal;