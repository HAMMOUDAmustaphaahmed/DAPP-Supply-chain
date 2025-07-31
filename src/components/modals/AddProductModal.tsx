import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { ProductFormData } from '../../blockchain/types';

interface AddProductModalProps {
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    productId: '',
    name: '',
    supplier: '',
    category: '',
    location: '',
    description: '',
    minStock: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal title="Nouveau Produit" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="ID Produit"
          required
          value={formData.productId}
          onChange={(e) => setFormData({...formData, productId: e.target.value})}
        />
        <Input
          label="Nom du Produit"
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <Input
          label="Fournisseur Principal"
          required
          value={formData.supplier}
          onChange={(e) => setFormData({...formData, supplier: e.target.value})}
        />
        <Input
          label="Catégorie"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        />
        <Input
          label="Stock Minimum"
          type="number"
          value={formData.minStock}
          onChange={(e) => setFormData({...formData, minStock: Number(e.target.value)})}
        />
        <Input
          label="Emplacement"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        />
        <textarea
          className="form-control"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <div className="flex gap-2 justify-end">
          <Button variant="default" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary">
            Créer Produit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;