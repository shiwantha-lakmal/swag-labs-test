import { test as base, expect } from '@playwright/test';
import { LoginPage, ProductPage, CartPage, MenuPanel } from '@config/page-loader';


type MyFixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  menuPanel: MenuPanel;
};

// Extend the base test with our fixtures
const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },        
  
  menuPanel: async ({ page }, use) => {
    const menuPanel = new MenuPanel(page);
    await use(menuPanel);
  }



});

export { test, expect };

