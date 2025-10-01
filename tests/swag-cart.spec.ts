import { test } from '../src/config/page.config';
import { LoginPage } from '@config/loader.config';
import { getCredentials } from '@config/env.config';

/**
 * @description
 * Assignment 1: Swag Labs Cart Flow Test Suite
 * Swag Labs Cart Flow Test Suite
 * Tests the shopping cart functionality and item management
 */

test.describe('Swag Labs Cart Functionality', () => {

  test('should add single product to cart successfully', async ({ loginPage, productPage }) => {
    const user = getCredentials();

    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_clickLogin()
    await productPage.verify_productsPageLoaded()
    await productPage.step_addProductToCart('Sauce Labs Backpack')
    await productPage.verify_cartBadgeCount('1')
  });

  test('should add multiple products to cart successfully', async ({ loginPage, productPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_clickLogin()
    await productPage.step_addProductToCart('Sauce Labs Backpack')
    await productPage.step_addProductToCart('Sauce Labs Bike Light')
    await productPage.step_addProductToCart('Sauce Labs Bolt T-Shirt')
    await productPage.verify_cartBadgeCount('3')
  });

  test('should handle adding same product and remove from cart', async ({ loginPage, productPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_clickLogin()
    await productPage.step_addProductToCart('Sauce Labs Backpack')
    await productPage.verify_itemButtonText('Sauce Labs Backpack', 'Remove')
    await productPage.verify_cartBadgeCount('1')
    await productPage.step_addProductToCart('Sauce Labs Backpack')
    await productPage.verify_itemButtonText('Sauce Labs Backpack', 'Add to cart')
  });

  test('should list items in cart page and remove them', async ({ loginPage, productPage, cartPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_clickLogin()
    await productPage.step_addProductToCart('Sauce Labs Backpack')
    await productPage.verify_cartBadgeCount('1')
    await productPage.step_navigateToCart()
    await cartPage.verify_itemInCart('Sauce Labs Backpack')
    await cartPage.step_removeItem('Sauce Labs Backpack')
  });

  test('should remove items from cart and verify badge count', async ({ loginPage, productPage, cartPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_clickLogin()
    await productPage.verify_productsPageLoaded()
    await productPage.step_addProductToCart('Sauce Labs Backpack')
    await productPage.verify_cartBadgeCount('1')
    await productPage.step_navigateToCart()
    await cartPage.step_removeItem('Sauce Labs Backpack')
    await cartPage.verify_cartBadgeCount('0')
  });

  test('should complete checkout process successfully', async ({ loginPage, productPage, cartPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_clickLogin()
    await productPage.verify_productsPageLoaded()
    await productPage.step_addProductToCart('Sauce Labs Backpack')
    await productPage.verify_cartBadgeCount('1')
    await productPage.step_navigateToCart()
    await cartPage.step_checkout()
  });

});