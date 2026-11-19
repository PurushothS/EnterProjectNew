import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../../../pages/BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { NavigationComponent } from '../components/NavigationComponent';
import { randomIndex } from '../../../utils/random.util';

export class DashboardPage extends BasePage {
  readonly header: HeaderComponent;
  readonly navigation: NavigationComponent;
  private readonly inventory: Locator;
  private readonly addToCart: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.navigation = new NavigationComponent(page);
    this.inventory = page.getByTestId('inventory-list');
    this.addToCart = page.getByTestId(/^add-to-cart-/);
  }

  async open(): Promise<void> {
    await this.openPath('/inventory.html');
  }

  async verifyLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventory).toBeVisible();
    await this.header.verifyVisible();
  }

  async addRandomItemToCart(): Promise<void> {
    const itemCount = await this.addToCart.count();
    if (itemCount === 0) {
      throw new Error('No add-to-cart buttons found on the dashboard.');
    }

    await this.addToCart.nth(randomIndex(itemCount)).click();
  }
}
