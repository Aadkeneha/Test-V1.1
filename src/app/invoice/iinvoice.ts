export interface Iinvoice {
  invoiceId: number;
  invoiceNumber: string;
  currencyId: number;
  vendorId: number;
  invoiceAmount: number;
  invoiceReceivedDate: Date;
  invoiceDueDate: Date;
  isActive: boolean;
}
