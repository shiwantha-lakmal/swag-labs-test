import { test } from '@playwright/test';
import { LoginPage } from '@config/page-loader';
import { getCredentials } from '@config/env.config';

/**
 * @description
 * Assignment 1: Swag Labs Cart Flow Test Suite
 * Swag Labs Cart Flow Test Suite
 * Tests the shopping cart functionality and item management
 */

test.describe('Swag Labs Cart Functionality', () => {

  test('should add single product to cart successfully', async ({ page }) => {
    const user = getCredentials();
    
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_clickLogin())
      .then(productPage => productPage.verify_productsPageLoaded())
      .then(productPage => productPage.step_addProductToCart('Sauce Labs Backpack'))
      .then(productPage => productPage.verify_cartBadgeCount('1'));
  });

  test('should add multiple products to cart successfully', async ({ page }) => {
    const user = getCredentials();
    
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_clickLogin())
      .then(productPage => productPage.step_addProductToCart('Sauce Labs Backpack'))
      .then(productPage => productPage.step_addProductToCart('Sauce Labs Bike Light'))
      .then(productPage => productPage.step_addProductToCart('Sauce Labs Bolt T-Shirt'))
      .then(productPage => productPage.verify_cartBadgeCount('3'));
  });


  test('should handle adding same product and remove from cart', async ({ page }) => {
    const user = getCredentials();
    
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_clickLogin())
      .then(productPage => productPage.step_addProductToCart('Sauce Labs Backpack'))
      .then(productPage => productPage.verify_itemButtonText('Sauce Labs Backpack', 'Remove'))
      .then(productPage => productPage.verify_cartBadgeCount('1'))
      .then(productPage => productPage.step_addProductToCart('Sauce Labs Backpack'))
      .then(productPage => productPage.verify_itemButtonText('Sauce Labs Backpack', 'Add to cart'))
  });

  test('should the cart items be listed under the my-cart page', async ({ page }) => {
    const user = getCredentials();
    
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_clickLogin())
      .then(productPage => productPage.step_addProductToCart('Sauce Labs Backpack'))
      .then(productPage => productPage.verify_cartBadgeCount('1'))
      .then(productPage => productPage.step_navigateToCart())
      .then(cartPage => cartPage.verify_itemInCart('Sauce Labs Backpack'))
      .then(cartPage => cartPage.step_removeItem('Sauce Labs Backpack'));
  });

  test('should the cart items able to remove from the cart', async ({ page }) => {
    const user = getCredentials();
    
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_clickLogin())
      .then(productPage => productPage.verify_productsPageLoaded())
      .then(productPage => productPage.step_addProductToCart('Sauce Labs Backpack'))
      .then(productPage => productPage.verify_cartBadgeCount('1'))
      .then(productPage => productPage.step_navigateToCart())
      .then(cartPage => cartPage.step_removeItem('Sauce Labs Backpack'))
      .then(cartPage => cartPage.verify_cartBadgeCount('0'));
  });

  test('should the cart items able to checkout successfully', async ({ page }) => {
    const user = getCredentials();
    
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_clickLogin())
      .then(productPage => productPage.verify_productsPageLoaded())
      .then(productPage => productPage.step_addProductToCart('Sauce Labs Backpack'))
      .then(productPage => productPage.verify_cartBadgeCount('1'))
      .then(productPage => productPage.step_navigateToCart())
      .then(cartPage => cartPage.step_checkout());
  });

});
