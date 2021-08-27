import { ProductTypeEnum } from '../_models/ProductTypeEnum';

export interface IProductDTO {
  localCode: string;
  nationalCode: string;
  name: string;
  productType: ProductTypeEnum;
  unitId: Number;
}
