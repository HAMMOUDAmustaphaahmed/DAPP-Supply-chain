import { Block, Product, Movement, MovementFormData } from './types';

export class SupplyChainBlockchain {
  private chain: Block[];
  private products: Map<string, Product>;
  private documentCounter: number;

  constructor() {
    this.chain = [];
    this.products = new Map();
    this.documentCounter = 1000;
    this.createGenesisBlock();
  }

  private createGenesisBlock(): void {
    const genesisBlock: Block = {
      index: 0,
      timestamp: Date.now(),
      data: { type: 'genesis', message: 'Supply Chain Genesis Block' },
      previousHash: '0',
      hash: this.calculateHash(0, Date.now(), { type: 'genesis' }, '0')
    };
    this.chain.push(genesisBlock);
  }

  private calculateHash(index: number, timestamp: number, data: any, previousHash: string): string {
    return btoa(index + timestamp + JSON.stringify(data) + previousHash).slice(0, 16);
  }

  private getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  private generateDocumentNumber(): number {
    return ++this.documentCounter;
  }

  private addBlock(data: any): Block {
    const previousBlock = this.getLatestBlock();
    const newBlock: Block = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      data,
      previousHash: previousBlock.hash,
      hash: this.calculateHash(previousBlock.index + 1, Date.now(), data, previousBlock.hash)
    };
    this.chain.push(newBlock);
    return newBlock;
  }

  public addProduct(productData: Omit<Product, 'blockHash' | 'history' | 'currentQuantity' | 'totalQuantityReceived' | 'totalQuantityDelivered' | 'totalQuantityInternalMove' | 'receptions' | 'deliveries' | 'internalMoves' | 'pendingReceptions' | 'pendingDeliveries' | 'pendingInternalMoves'>): Block {
    if (this.products.has(productData.productId)) {
      throw new Error('Produit déjà existant');
    }

    const block = this.addBlock({
      type: 'product_creation',
      ...productData
    });
    
    this.products.set(productData.productId, {
      ...productData,
      blockHash: block.hash,
      history: [block],
      currentQuantity: 0,
      totalQuantityReceived: 0,
      totalQuantityDelivered: 0,
      totalQuantityInternalMove: 0,
      receptions: [],
      deliveries: [],
      internalMoves: [],
      pendingReceptions: [],
      pendingDeliveries: [],
      pendingInternalMoves: []
    });
    
    return block;
  }

  // Méthodes pour les mouvements
  public addReception(productId: string, receptionData: Omit<Movement, 'documentNumber' | 'status' | 'timestamp'>): { block: Block; documentNumber: number } {
    const product = this.products.get(productId);
    if (!product) {
      throw new Error('Produit non trouvé');
    }

    const documentNumber = this.generateDocumentNumber();
    const reception: Movement = {
      ...receptionData,
      documentNumber,
      status: 'pending',
      timestamp: Date.now()
    };

    product.pendingReceptions.push(reception);

    const block = this.addBlock({
      type: 'reception_created',
      productId,
      ...reception
    });

    product.history.push(block);
    return { block, documentNumber };
  }

  // Similaire pour addDelivery et addInternalMove...

  public confirmReception(productId: string, documentNumber: number, confirmationData: { confirmedBy: string; notes?: string }): Block {
    const product = this.products.get(productId);
    if (!product) {
      throw new Error('Produit non trouvé');
    }

    const receptionIndex = product.pendingReceptions.findIndex(r => r.documentNumber === documentNumber);
    if (receptionIndex === -1) {
      throw new Error('Réception non trouvée');
    }

    const reception = product.pendingReceptions[receptionIndex];
    reception.status = 'confirmed';
    reception.confirmedAt = Date.now();
    reception.confirmedBy = confirmationData.confirmedBy;
    reception.confirmationNotes = confirmationData.notes;

    product.currentQuantity += reception.quantity;
    product.totalQuantityReceived += reception.quantity;

    product.receptions.push(reception);
    product.pendingReceptions.splice(receptionIndex, 1);

    const block = this.addBlock({
      type: 'reception_confirmed',
      productId,
      documentNumber,
      ...confirmationData
    });

    product.history.push(block);
    return block;
  }

  // Getters et méthodes de vérification
  public getProduct(productId: string): Product | undefined {
    return this.products.get(productId);
  }

  public getAllProducts(): Product[] {
    return Array.from(this.products.values());
  }

  public verifyChain(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== this.calculateHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.data,
        currentBlock.previousHash
      )) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
  // Ajouter ces méthodes dans la classe SupplyChainBlockchain
public addDelivery(productId: string, deliveryData: MovementFormData): { block: Block; documentNumber: number } {
  const product = this.products.get(productId);
  if (!product) {
    throw new Error('Produit non trouvé');
  }

  const documentNumber = this.generateDocumentNumber();
  const delivery: Movement = {
    ...deliveryData,
    documentNumber,
    status: 'pending',
    timestamp: Date.now()
  };

  product.pendingDeliveries.push(delivery);

  const block = this.addBlock({
    type: 'delivery_created',
    productId,
    ...delivery
  });

  product.history.push(block);
  return { block, documentNumber };
}

public addInternalMove(productId: string, moveData: MovementFormData): { block: Block; documentNumber: number } {
  const product = this.products.get(productId);
  if (!product) {
    throw new Error('Produit non trouvé');
  }

  const documentNumber = this.generateDocumentNumber();
  const move: Movement = {
    ...moveData,
    documentNumber,
    status: 'pending',
    timestamp: Date.now()
  };

  product.pendingInternalMoves.push(move);

  const block = this.addBlock({
    type: 'internal_move_created',
    productId,
    ...move
  });

  product.history.push(block);
  return { block, documentNumber };
}
}