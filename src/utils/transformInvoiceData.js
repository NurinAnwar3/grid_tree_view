// utils/transformInvoiceData.js

const transformInvoiceData = (data) => {
 
  return data.map((invoice) => ({
    id: `invoice-${invoice.id}`,
    label: `Invoice: ${invoice.invoiceNumber}`,
    children: [
      {
        id: `invoice-details-${invoice.id}`,
        label: `Details`,
        children: [
          { id: `date-${invoice.id}`, label: `Date: ${invoice.date}` },
          { id: `customer-${invoice.id}`, label: `Customer: ${invoice.customer}` },
          { id: `total-${invoice.id}`, label: `Total: $${invoice.total.toFixed(2)}` },
          { id: `id-${invoice.id}`, label: `ID: ${invoice.id}` },
        ],
      },
      {
        id: `items-${invoice.id}`,
        label: `Items (${invoice.items.length})`,
        children: invoice.items.map((item, itemIndex) => ({
          id: `item-${invoice.id}-${itemIndex}`,
          label: `${item.description} (Qty: ${item.quantity}, Price: $${item.unitPrice})`,
          children: [
            {
              id: `item-total-${invoice.id}-${itemIndex}`,
              label: `Subtotal: $${(item.quantity * item.unitPrice).toFixed(2)}`,
            },
            {
              id: `taxes-${invoice.id}-${itemIndex}`,
              label: `Taxes (${item.taxes.length})`,
              children: item.taxes.map((tax, taxIndex) => ({
                id: `tax-${invoice.id}-${itemIndex}-${taxIndex}`,
                label: `${tax.type}: ${tax.rate}% ($${tax.amount.toFixed(2)})`,
              })),
            },
          ],
        })),
      },
    ],
  }));
};

export default transformInvoiceData;