export interface DefaultRegistrationData {
  firstName: string;
  lastName: string;
  password: string;
}

export interface ShopCartData {
  searchQuery: string;
  productName: string;
  size: string;
  color: string;
  quantityToUpdate: number;
  successMessage: string;
}

export interface AdminData {
  basePath: string;
  username: string;
  password: string;
}

export interface TestData {
  defaultRegistration: DefaultRegistrationData;
  shopCart: ShopCartData;
  admin: AdminData;
}
