import { Movement } from '../blockchain/types';

interface PDFData {
  documentNumber: number;
  date: string;
  supplier?: string;
  buyer?: string;
  service?: string;
  location?: string;
  quantity: number;
  price?: number;
  notes?: string;
}

const createPDFContent = (
  type: 'reception' | 'delivery' | 'internal',
  data: Movement,
  productName: string
): string => {
  const titles = {
    reception: 'BON DE RÉCEPTION',
    delivery: 'BON DE LIVRAISON',
    internal: 'BON DE SORTIE INTERNE'
  } as const;

  const getTypeTitle = (type: keyof typeof titles): string => {
    return titles[type];
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${getTypeTitle(type)}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; color: #2563eb; }
            .document-title { font-size: 18px; font-weight: bold; margin-top: 10px; }
            .document-number { font-size: 14px; color: #666; }
            .content { margin: 20px 0; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .info-section { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
            .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            .table th { background-color: #f5f5f5; }
            .total-section { text-align: right; margin-top: 20px; font-weight: bold; }
            .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; margin-top: 50px; }
            .signature-box { text-align: center; }
            .signature-line { border-top: 1px solid #333; margin-top: 40px; padding-top: 10px; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company-name">VOTRE ENTREPRISE</div>
            <div class="document-title">${getTypeTitle(type)}</div>
            <div class="document-number">N° ${String(data.documentNumber).padStart(6, '0')}</div>
            <div class="document-date">Date: ${new Date(data.date).toLocaleDateString('fr-FR')}</div>
        </div>

        <div class="info-grid">
            <div class="info-section">
                <strong>${
                  type === 'reception' ? 'FOURNISSEUR' : 
                  type === 'delivery' ? 'CLIENT' : 
                  'SERVICE DEMANDEUR'
                }:</strong><br>
                ${data.supplier || data.buyer || data.service || 'N/A'}<br>
                ${data.location || ''}
            </div>
            <div class="info-section">
                <strong>DÉTAILS:</strong><br>
                Produit: ${productName}<br>
                Quantité: ${data.quantity.toLocaleString('fr-FR')}
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Désignation</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${productName}</td>
                    <td>${data.quantity.toLocaleString('fr-FR')}</td>
                    <td>${data.price ? new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'TND'
                    }).format(data.price) : 'N/A'}</td>
                    <td>${data.price ? new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'TND'
                    }).format(data.quantity * data.price) : 'N/A'}</td>
                </tr>
            </tbody>
        </table>

        ${data.price ? `
          <div class="total-section">
            TOTAL: ${new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'TND'
            }).format(data.quantity * data.price)}
          </div>
        ` : ''}

        ${data.notes ? `
          <div class="content">
            <strong>Remarques:</strong><br>
            ${data.notes}
          </div>
        ` : ''}

        <div class="signatures">
            <div class="signature-box">
                <div class="signature-line">${
                  type === 'reception' ? 'Signature Fournisseur' : 
                  type === 'delivery' ? 'Signature Client' : 
                  'Signature Service'
                }</div>
            </div>
            <div class="signature-box">
                <div class="signature-line">Signature Responsable</div>
            </div>
        </div>

        <div class="footer">
            Document généré le ${new Date().toLocaleString('fr-FR')}<br>
            Par: ${process.env.USER || 'HAMMOUDAmustaphaahmed'}<br>
            Système de Gestion de Chaîne d'Approvisionnement
        </div>
    </body>
    </html>
  `;
};

export const generatePDF = (
  type: 'reception' | 'delivery' | 'internal',
  data: Movement,
  productName: string
): void => {
  const content = createPDFContent(type, data, productName);
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${type}_${data.documentNumber}_${new Date().toISOString().split('T')[0]}.html`;
  a.click();
  URL.revokeObjectURL(url);
};