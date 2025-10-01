import { Page, Locator, expect } from '@playwright/test';
import { BasePage, ProductPage } from '@config/loader.config';
import { getBaseURL } from '@config/env.config';

/**
 * LoginPage class represents the Swag Labs login page.
 * Provides methods to interact with login functionality using fluent API pattern.
 * Reference: https://www.saucedemo.com/
 */
export class LoginPage extends BasePage {
  private usernameInput = this.page.locator('[data-test="username"]');
  private passwordInput = this.page.locator('[data-test="password"]');
  private loginButton = this.page.locator('[data-test="login-button"]');
  private errorMessage = this.page.locator('[data-test="error"]');
  private pageHeading = this.page.locator('.login_logo');

  /**
   * Creates an instance of LoginPage.
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the Swag Labs login page.
   * Uses the baseURL from environment configuration (supports local, stage, production).
   * @returns Current LoginPage instance for method chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto(getBaseURL());
    return this;
  }

  /**
   * Enter username in the username field.
   * @param username - The username to enter
   * @returns Current LoginPage instance for method chaining
   */
  async step_enterUsername(username: string) {
    await this.usernameInput.fill(username);
    return this;
  }

  /**
   * Enter password in the password field.
   * @param password - The password to enter
   * @returns Current LoginPage instance for method chaining
   */
  async step_enterPassword(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  /**
   * Click the login button and wait for navigation.
   * @returns ProductPage instance after successful login
   */
  async step_clickLogin() {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    return new ProductPage(this.page);
  }

  /**
   * Click the login button for error scenario (stays on login page).
   * @returns Current LoginPage instance for method chaining
   */
  async step_errorLogin() {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    return this;
  }

  /**
   * Verify that the user is on the login page by checking the URL.
   * @returns Current LoginPage instance for method chaining
   */
  async verify_onLoginPage() {
    await expect(this.page).toHaveURL(/.*saucedemo\.com/);
    return this;
  }

  /**
   * Verify that error message is displayed.
   * Checks for "Invalid username or password" error.
   * @returns Current LoginPage instance for method chaining
   */
  async verify_errorMessage(errorMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(errorMessage);
    return this;
  }

  /**
   * Verify complete login page state.
   * Checks page URL, heading visibility, and form elements.
   * @returns Current LoginPage instance for method chaining
   */
  async verify_loginPageState() {
    await this.verify_onLoginPage();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    return this;
  }
}