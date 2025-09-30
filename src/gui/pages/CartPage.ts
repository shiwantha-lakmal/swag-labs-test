import { Page, Locator, expect } from '@playwright/test';
import { BasePage, MenuPanel, LoginPage, ProductPage } from '@config/page-loader';

/**
 * CartPage class represents the Swag Labs shopping cart page.
 * Provides methods to interact with cart items and checkout functionality.
 * Reference: https://www.saucedemo.com/cart.html
 */
export class CartPage extends BasePage {
  // Page elements
  private cartContainer = this.page.locator('[data-test="cart-contents-container"]');
  private cartList = this.page.locator('[data-test="cart-list"]');
  private cartItems = this.page.locator('.cart_item');
  private continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
  private checkoutButton = this.page.locator('[data-test="checkout"]');
  public menu: MenuPanel;

  /**
   * Creates an instance of CartPage
   * @param page - Playwright Page object
   */
  constructor(page: Page) {
    super(page);
    this.menu = new MenuPanel(page);
  }

  /**
   * Verify that the cart page is loaded successfully.
   * @returns Current CartPage instance for method chaining
   */
  async verify_cartPageLoaded() {
    await expect(this.cartContainer).toBeVisible();
    await expect(this.cartList).toBeVisible();
    return this;
  }

  /**
   * Get the number of items in the cart.
   * @returns Number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Verify specific item exists in cart.
   * @param productTitle - The exact title of the product
   * @returns Current CartPage instance for method chaining
   */
  async verify_itemInCart(productTitle: string) {
    const item = this.cartItems.filter({ hasText: productTitle });
    await expect(item).toBeVisible();
    return this;
  }

  /**
   * Get item price from cart.
   * @param productTitle - The exact title of the product
   * @returns Price of the item (e.g., "$29.99")
   */
  async getItemPrice(productTitle: string): Promise<string> {
    const item = this.cartItems.filter({ hasText: productTitle });
    const priceElement = item.locator('[data-test="inventory-item-price"]');
    return await priceElement.textContent() || '';
  }

  /**
   * Remove item from cart.
   * @param productTitle - The exact title of the product
   * @returns Current CartPage instance for method chaining
   */
  async step_removeItem(productTitle: string) {
    const item = this.cartItems.filter({ hasText: productTitle });
    const removeButton = item.locator('button[data-test^="remove"]');
    await removeButton.click();
    return this;
  }

  /**
   * Click Continue Shopping button to return to products page.
   * @returns ProductPage instance after navigation
   */
  async step_continueShopping() {
    await this.continueShoppingButton.click();
    return new ProductPage(this.page);
  }

  /**
   * Click Checkout button to proceed to checkout.
   * @returns Current CartPage instance for method chaining
   */
  async step_checkout() {
    await this.checkoutButton.click();
    return this;
  }

  /**
   * Verify item quantity in cart.
   * @param productTitle - The exact title of the product
   * @param expectedQuantity - Expected quantity of the item
   * @returns Current CartPage instance for method chaining
   */
  async verify_itemQuantity(productTitle: string, expectedQuantity: string) {
    const item = this.cartItems.filter({ hasText: productTitle });
    const quantityElement = item.locator('[data-test="item-quantity"]');
    await expect(quantityElement).toHaveText(expectedQuantity);
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
