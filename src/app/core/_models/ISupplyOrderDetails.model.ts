export interface ISupplyOrderDetails {
  pharmacyId: Number;
  productId: Number;
  supplierId: Number;
  quantity: Number;
  price: Number;
  batchNumber: String;
  supplyOrderNumber: Number;
  approvalNumber: Number;
  purchaseFee: Number;
  expireDate: Date;
}
