export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-TN', {
    style: 'currency',
    currency: 'TND'
  }).format(amount);
};

export const formatDate = (date: string | number | Date): string => {
  return new Date(date).toLocaleDateString('fr-FR');
};

export const formatDateTime = (date: string | number | Date): string => {
  return new Date(date).toLocaleString('fr-FR');
};

export const formatQuantity = (quantity: number): string => {
  return new Intl.NumberFormat('fr-FR').format(quantity);
};

export const generateDocumentNumber = (prefix: string, number: number): string => {
  return `${prefix}-${String(number).padStart(6, '0')}`;
};