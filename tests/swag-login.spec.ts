import { test } from '../src/config/page.config';
import { getCredentials } from '@config/env.config';

/**
 * @description
 * Assignment 1: Swag Labs Login Flow Test Suite
 * Swag Labs Login Flow Test Suite
 * Tests the complete authentication user journey
 */

test.describe('Swag Labs Login Functionality', () => {

  test('should login successfully with valid credentials', async ({ loginPage, productPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_clickLogin()
    await productPage.verify_onInventoryPage()
    await productPage.verify_productsPageLoaded()
    await productPage.verify_menuButton()
    await productPage.step_logout()
    await loginPage.verify_onLoginPage()
  });

  test('should display error message with invalid credentials', async ({ loginPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername('invalid_user')
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_errorLogin()
    await loginPage.verify_errorMessage('Epic sadface: Username and password do not match any user in this service')
  });

  test('should display error message with locked out user', async ({ loginPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername('locked_out_user')
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_errorLogin()
    await loginPage.verify_errorMessage('Epic sadface: Sorry, this user has been locked out.')
  });

  test('should display error message when username is empty', async ({ loginPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterPassword(user.password)
    await loginPage.step_errorLogin()
    await loginPage.verify_errorMessage('Epic sadface: Username is required')
  });

  test('should display error message when password is empty', async ({ loginPage }) => {
    const user = getCredentials();
    
    await loginPage.step_navigate()
    await loginPage.step_enterUsername(user.username)
    await loginPage.step_errorLogin()
    await loginPage.verify_errorMessage('Epic sadface: Password is required')
  });
  
});