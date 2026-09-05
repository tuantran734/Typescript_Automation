export const PATH = {
    login: 'admin/login',
    dashboard: 'admin',
    product: 'admin/ecommerce/products',
    createProduct: 'admin/ecommerce/products/create'
}

export const MESSAGE = {
    INVALIDCREDENTIAL: 'THESE CREDENTIALS DO NOT MATCH OUR RECORDS.',
    USERNAMEERROR: 'THE USERNAME FIELD IS REQUIRED.',
    PASSWORDERROR: 'THE PASSWORD FIELD IS REQUIRED.',
    PRODUCTNAMEERROR: "PLEASE ENTER PRODUCT'S NAME",
    PRICEERROR: 'THE PRICE MUST BE AT LEAST 0.',
    PRICESALEERROR: 'DISCOUNT CANNOT BE LEFT BLANK WHEN SCHEDULING IS SELECTED',
    COSTPERITEM: 'THE COST PER ITEM MUST BE AT LEAST 0.',
    CREATEPRODUCTSUCCESS: 'CREATED SUCCESSFULLY',
    DELETEPRODUCTSUCCESS: 'DELETED SUCCESSFULLY',
}    

export type ProductData = { 
  name: string; 
  sku: string; 
  price: number;
}; 

export class ProductFactory { 
  private static sequence = 0;

  static create(overrides?: Partial<ProductData>): ProductData { 
    const uniqueId = `${Date.now()}-${ProductFactory.sequence++}`;
    const name = `TM Product ${uniqueId}`;
    const sku  = `TM-${uniqueId}`;

    return { 
      name, sku, 
      price: 100, 
      ...overrides 
    }; 
  } 
  static createNegative(overrides?: Partial<ProductData>): ProductData { 
    const name = ``;
    const sku  = ``;

    return { 
      name, sku, 
      price: 100, 
      ...overrides 
    }; 
  } 
}