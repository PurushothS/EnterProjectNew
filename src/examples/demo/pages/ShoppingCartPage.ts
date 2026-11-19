import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../pages/BasePage';
import { randomIndex } from '../../../utils/random.util';

export class ShoppingCartPage extends BasePage {
    private readonly cartLink: Locator;
    private readonly removeFromCart: Locator;

    constructor(page: Page) {
        super(page);
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.removeFromCart = page.getByText('Remove');
    }

    async open(): Promise<void> {
    await this.openPath('/cart.html');
  }
    async getCartAriaLabel(): Promise<string | null> {
        return this.cartLink.getAttribute('aria-label');
    }

    async removeRandomItemFromCart(): Promise<void> {
        const itemCount = await this.removeFromCart.count();
        if (itemCount === 0) {
            throw new Error('No items to remove');
        }
        await this.removeFromCart.nth(randomIndex(itemCount)).click();
    }
}
