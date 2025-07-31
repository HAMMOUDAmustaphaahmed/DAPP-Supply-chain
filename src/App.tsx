import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Header from './components/Header';
import AddProductModal from './components/modals/AddProductModal';
import ReceptionModal from './components/modals/ReceptionModal';
import DeliveryModal from './components/modals/DeliveryModal';
import InternalMoveModal from './components/modals/InternalMoveModal';
import { SupplyChainBlockchain } from './blockchain/SupplyChainBlockchain';
import { Product, MovementFormData } from './blockchain/types';
import './styles/globals.css';

const blockchain = new SupplyChainBlockchain();

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showReceptionForm, setShowReceptionForm] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showInternalMoveForm, setShowInternalMoveForm] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    loadProducts();
    verifyBlockchain();
  }, []);

  const loadProducts = () => {
    const allProducts = blockchain.getAllProducts();
    setProducts(allProducts);
  };

  const verifyBlockchain = () => {
    const verified = blockchain.verifyChain();
    setIsVerified(verified);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelivery = (deliveryData: MovementFormData) => {
    if (selectedProduct) {
      blockchain.addDelivery(selectedProduct.productId, deliveryData);
      loadProducts();
      setShowDeliveryForm(false);
    }
  };

  const handleInternalMove = (moveData: MovementFormData) => {
    if (selectedProduct) {
      blockchain.addInternalMove(selectedProduct.productId, moveData);
      loadProducts();
      setShowInternalMoveForm(false);
    }
  };

  return (
    <div className="app">
      <Header 
        isVerified={isVerified}
        onAddProduct={() => setShowAddForm(true)}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />

      <main className="container">
        <div className="grid grid-cols-3">
          <ProductList
            products={filteredProducts}
            onSelectProduct={setSelectedProduct}
          />

          {selectedProduct ? (
            <ProductDetails
              product={selectedProduct}
              onReception={() => setShowReceptionForm(true)}
              onDelivery={() => setShowDeliveryForm(true)}
              onInternalMove={() => setShowInternalMoveForm(true)}
              onUpdate={loadProducts}
            />
          ) : (
            <div className="card text-center">
              <p>Sélectionnez un produit pour voir les détails</p>
            </div>
          )}
        </div>
      </main>

      {showAddForm && (
        <AddProductModal
          onClose={() => setShowAddForm(false)}
          onSubmit={(productData) => {
            blockchain.addProduct(productData);
            loadProducts();
            setShowAddForm(false);
          }}
        />
      )}

      {showReceptionForm && selectedProduct && (
        <ReceptionModal
          product={selectedProduct}
          onClose={() => setShowReceptionForm(false)}
          onSubmit={(receptionData) => {
            blockchain.addReception(selectedProduct.productId, receptionData);
            loadProducts();
            setShowReceptionForm(false);
          }}
        />
      )}

      {showDeliveryForm && selectedProduct && (
        <DeliveryModal
          product={selectedProduct}
          onClose={() => setShowDeliveryForm(false)}
          onSubmit={handleDelivery}
        />
      )}

      {showInternalMoveForm && selectedProduct && (
        <InternalMoveModal
          product={selectedProduct}
          onClose={() => setShowInternalMoveForm(false)}
          onSubmit={handleInternalMove}
        />
      )}
    </div>
  );
};

export default App;