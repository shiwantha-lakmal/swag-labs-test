import { Page } from '@playwright/test';

/**
 * BasePage class provides common functionality for all page objects.
 * All page objects should extend this class to inherit base methods.
 */
export class BasePage {
  protected page: Page;

  /**
   * Creates an instance of BasePage.
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL.
   * @param url - The URL to navigate to
   * @returns Current page instance for method chaining
   */
  async goto(url: string) {
    await this.page.goto(url);
    return this;
  }

  /**
   * Wait for the page to be fully loaded.
   * Waits for 'domcontentloaded' state.
   * @returns Current page instance for method chaining
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    return this;
  }
}
