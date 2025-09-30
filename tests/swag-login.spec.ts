import { test } from '@playwright/test';
import { LoginPage } from '@config/page-loader';
import { getCredentials } from '@config/env.config';

/**
 * Swag Labs Login Flow Test Suite
 * Tests the complete authentication user journey
 */

test.describe('Swag Labs Login Functionality', () => {

  test('should login successfully with valid credentials', async ({ page }) => {
    const user = getCredentials();
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_clickLogin())
      .then(productPage => productPage.verify_onInventoryPage())
      .then(productPage => productPage.verify_productsPageLoaded())
      .then(productPage => productPage.verify_menuButton())
      .then(productPage => productPage.step_logout())
      .then(loginPage => loginPage.verify_onLoginPage());
  });

  
  test('should display error message with invalid credentials', async ({ page }) => {
    const user = getCredentials();
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername('invalid_user'))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_errorLogin())
      .then(loginPage => loginPage.verify_errorMessage('Epic sadface: Username and password do not match any user in this service'));
  });

  test('should display error message with locked out user', async ({ page }) => {
    const user = getCredentials();
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername('locked_out_user'))
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_errorLogin())
      .then(loginPage => loginPage.verify_errorMessage('Epic sadface: Sorry, this user has been locked out.'));
  });

  test('should display error message when username is empty', async ({ page }) => {
    const user = getCredentials();
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterPassword(user.password))
      .then(loginPage => loginPage.step_errorLogin())
      .then(loginPage => loginPage.verify_errorMessage('Epic sadface: Username is required'));
  });

  test('should display error message when password is empty', async ({ page }) => {
    const user = getCredentials();
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.step_enterUsername(user.username))
      .then(loginPage => loginPage.step_errorLogin())
      .then(loginPage => loginPage.verify_errorMessage('Epic sadface: Password is required'));
  });

  test('should verify login page elements are visible', async ({ page }) => {
    await new LoginPage(page)
      .step_navigate()
      .then(loginPage => loginPage.verify_loginPageState());
  });
  
});

