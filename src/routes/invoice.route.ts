export enum INVOICE_ROUTES {
  GET_INVOICES = 'get',
  GET_INVOICE = 'get/:invoice_id',
  CREATE_INVOICE = 'create',
  SUMMARY = 'summary',
  DELETE = 'delete/:invoice_id',
  UPDATE = 'update/:invoice_id',
  INVOICE_NUMBER = 'invoice-number',
}
