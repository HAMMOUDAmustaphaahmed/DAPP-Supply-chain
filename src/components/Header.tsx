import React from 'react';
import { Package, Search, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import Button from './common/Button';

interface HeaderProps {
  isVerified: boolean;
  onAddProduct: () => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const Header: React.FC<HeaderProps> = ({
  isVerified,
  onAddProduct,
  onSearch,
  searchTerm
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Package className="text-blue-500" />
            Gestionnaire de Stock - Blockchain
          </h1>
          <p className="text-gray-600 mt-2">
            Système de gestion avec bons de réception, livraison et mouvements internes
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isVerified ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {isVerified ? 'Blockchain Vérifiée' : 'Erreur Blockchain'}
          </div>
          <Button variant="primary" onClick={onAddProduct}>
            <Plus size={16} />
            Nouveau Produit
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher par nom, ID ou fournisseur..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default Header;