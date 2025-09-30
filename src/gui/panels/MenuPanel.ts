import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

/**
 * MenuPanel class represents the hamburger navigation menu panel.
 * Provides methods to interact with sidebar menu elements.
 * Reference: https://www.saucedemo.com/
 */
export class MenuPanel extends BasePage {
  private menuButton = this.page.locator('#react-burger-menu-btn');
  private allItemsLink = this.page.locator('#inventory_sidebar_link');
  private aboutLink = this.page.locator('#about_sidebar_link');
  private logoutLink = this.page.locator('#logout_sidebar_link');
  private resetAppLink = this.page.locator('#reset_sidebar_link');
  private cartLink = this.page.locator('.shopping_cart_link');
  private cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  private menuContainer = this.page.locator('.bm-menu');

  /**
   * Creates an instance of MenuPanel.
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Open the hamburger menu.
   * @returns Current MenuPanel instance for method chaining
   */
  async step_openMenu() {
    await this.menuButton.click();
    await this.menuContainer.waitFor({ state: 'visible' });
    return this;
  }

  /**
   * Click on All Items menu link.
   * @returns Current MenuPanel instance for method chaining
   */
  async step_clickAllItems() {
    await this.allItemsLink.click();
    return this;
  }

  /**
   * Click on About menu link.
   * @returns Current MenuPanel instance for method chaining
   */
  async step_clickAbout() {
    await this.aboutLink.click();
    return this;
  }

  /**
   * Click on Logout menu link.
   * @returns Current MenuPanel instance for method chaining
   */
  async step_clickLogout() {
    await this.logoutLink.click();
    return this;
  }

  /**
   * Click on Reset App State menu link.
   * @returns Current MenuPanel instance for method chaining
   */
  async step_clickResetAppState() {
    await this.resetAppLink.click();
    return this;
  }

  /**
   * Click on Cart icon to navigate to cart page.
   * @returns Current MenuPanel instance for method chaining
   */
  async step_clickCart() {
    await this.cartLink.click();
    return this;
  }

  /**
   * Verify the cart badge count matches expected value.
   * @param expectedCount - Expected number of items in cart
   * @returns Current MenuPanel instance for method chaining
   */
  async verify_cartBadgeCount(expectedCount: string) {
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(expectedCount);
    return this;
  }

  /**
   * Verify menu button is visible.
   * @returns Current MenuPanel instance for method chaining
   */
  async verify_menuButtonVisible() {
    await expect(this.menuButton).toBeVisible();
    return this;
  }

  /**
   * Verify menu is open.
   * @returns Current MenuPanel instance for method chaining
   */
  async verify_menuOpen() {
    await expect(this.menuContainer).toBeVisible();
    return this;
  }
}
