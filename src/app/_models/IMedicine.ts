export interface IMedicine {
    medicineId: Number;
    medicineCode: string;
    medicineName: string;
    sellingPrice: Number;
    expireDate: Date;
    unitId: Number;
    productType: ProductType;
}
export enum ProductType {
    Medicine= 0 ,
    Equiment =1
}