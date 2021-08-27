import { ProductTypeEnum } from 'src/app/_models/ProductTypeEnum';
export interface IProduct {
  id: Number;
  name: string;
  localCode: string;
  nationalCode: string;
  productType: ProductTypeEnum;
  unitId: Number;
  unitName?: string;
  createdAt?: Date;
}
