import { Page, Locator, expect } from '@playwright/test';
import { BasePage, MenuPanel, LoginPage, CartPage } from '@config/loader.config';

/**
 * ProductPage class represents the Swag Labs products/inventory page.
 * Provides methods to interact with product inventory and cart functionality.
 * Reference: https://www.saucedemo.com/inventory.html
 */
export class ProductPage extends BasePage {
  
  private productsHeading = this.page.locator('[data-test="title"]');
  private inventoryList = this.page.locator('.inventory_list');
  public menu: MenuPanel;

  /**
   * Creates an instance of ProductPage
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    this.menu = new MenuPanel(page);
  }

  /**
   * Verify that the products page is loaded successfully.
   * Checks for Products heading and inventory list visibility.
   * @returns Current ProductPage instance for method chaining
   */
  async verify_productsPageLoaded() {
    await expect(this.productsHeading).toBeVisible();
    await expect(this.productsHeading).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
    return this;
  }

  /**
   * Verify that the page URL is the inventory page.
   * @returns Current ProductPage instance for method chaining
   */
  async verify_onInventoryPage() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    return this;
  }

  /**
   * Verify menu button is visible.
   * @returns Current ProductPage instance for method chaining
   */
  async verify_menuButton() {
    await this.menu.verify_menuButtonVisible();
    return this;
  }

  /**
   * Add a product to cart by its title/name.
   * Finds the product by exact title match and clicks its "Add to cart" button.
   * @param productTitle - The exact title of the product (e.g., "Sauce Labs Backpack")
   * @returns Current ProductPage instance for method chaining
   */
  async step_addProductToCart(productTitle: string) {
    const productItem = this.page
      .locator('.inventory_item')
      .filter({ hasText: productTitle });
    
    const addToCartButton = productItem.locator('button[data-test^="add-to-cart"], button[data-test^="remove"]');
    await addToCartButton.click();
    return this;
  }

  /**
   * Verify button text for a specific product.
   * @param productTitle - The exact title of the product
   * @param expectedText - Expected button text (e.g., "Add to cart" or "Remove")
   * @returns Current ProductPage instance for method chaining
   */
  async verify_itemButtonText(productTitle: string, expectedText: string) {
    const productItem = this.page
      .locator('.inventory_item')
      .filter({ hasText: productTitle });
    
    const button = productItem.locator('button[data-test^="add-to-cart"], button[data-test^="remove"]');
    await expect(button).toHaveText(expectedText);
    return this;
  }

// =============================== Commmon Navigations ===============================

  /**
   * Navigate to cart page.
   * @returns CartPage instance after navigation
   */
  async step_navigateToCart() {
    await this.menu.step_clickCart();
    return new CartPage(this.page);
  }

  /**
   * Verify cart badge count.
   * @param expectedCount - Expected number of items in cart
   * @returns Current ProductPage instance for method chaining
   */
  async verify_cartBadgeCount(expectedCount: string) {
    await this.menu.verify_cartBadgeCount(expectedCount);
    return this;
  }

  /**
   * Perform logout operation by opening menu and clicking logout.
   * @returns LoginPage instance after logout
   */
  async step_logout() {
    await this.menu.step_openMenu();
    await this.menu.step_clickLogout();
    return new LoginPage(this.page);
  }
}
