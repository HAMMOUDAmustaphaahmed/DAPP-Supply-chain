export interface Block {
  index: number;
  timestamp: number;
  data: any;
  previousHash: string;
  hash: string;
}

export interface Product {
  productId: string;
  name: string;
  supplier: string;
  category?: string;
  description?: string;
  minStock: number;
  currentQuantity: number;
  location?: string;
  blockHash: string;
  totalQuantityReceived: number;
  totalQuantityDelivered: number;
  totalQuantityInternalMove: number;
  receptions: Movement[];
  deliveries: Movement[];
  internalMoves: Movement[];
  pendingReceptions: Movement[];
  pendingDeliveries: Movement[];
  pendingInternalMoves: Movement[];
  history: Block[];
}

export interface Movement {
  documentNumber: number;
  quantity: number;
  price?: number;
  supplier?: string;
  buyer?: string;
  service?: string;
  location?: string;
  date: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  timestamp: number;
  confirmedAt?: number;
  confirmedBy?: string;
  confirmationNotes?: string;
}


export interface ProductFormData {
  productId: string;
  name: string;
  supplier: string;
  category: string;
  location: string;
  description: string;
  minStock: number;
}

export interface MovementFormData {
  quantity: number;
  price?: number;
  supplier?: string;
  buyer?: string;
  service?: string;
  location?: string;
  address?: string;
  reason?: string;
  date: string;
  notes?: string;
}

export interface Block {
  index: number;
  timestamp: number;
  data: any;
  previousHash: string;
  hash: string;
}