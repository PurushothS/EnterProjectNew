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
  private readonly itemName: Locator;
  private readonly sortDropDown: Locator;
  private readonly itemPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.navigation = new NavigationComponent(page);
    this.inventory = page.getByTestId('inventory-list');
    this.addToCart = page.getByTestId(/^add-to-cart-/);
    this.itemName = page.getByTestId('inventory-item-name');
    this.sortDropDown = page.getByTestId('product-sort-container');
    this.itemPrice = page.getByTestId('inventory-item-price');
  }

  async open(): Promise<void> {
    await this.openPath('/inventory.html');
  }

  async verifyLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventory).toBeVisible();
    await this.header.verifyVisible();
  }

  async addRandomItemToCart(): Promise<{ name: string; price: number }> {
    const itemCount = await this.addToCart.count();
    if (itemCount === 0) {
      throw new Error('No add-to-cart buttons found on the dashboard.');
    }
    const selectedButton =  this.addToCart.nth(randomIndex(itemCount));

    const price = await selectedButton.locator('..').getByTestId('inventory-item-price')
    .textContent();

    const itemName = await selectedButton.locator('xpath=../..').getByTestId('inventory-item-name')
    .textContent();

    if (itemName === null || price === null) {
      throw new Error('Could not read the selected item name or price.');
    }
    const addedItem = {
      name: itemName,
      price: Number(price.replace(/[^0-9.-]/g, '')),
    };
    await selectedButton.click();

    return addedItem;
  }

  async getListOfItemNames(): Promise<string[]> {
    const arr: string[] = await this.itemName.allTextContents();
    return arr;
  }

  async selectSortOrder(sortOrder: string): Promise<void>{
    await this.sortDropDown.selectOption(sortOrder);
  }

  async getListOfItemPrices():Promise<number[]>{
    const prices = await this.itemPrice.allTextContents();
    return prices.map((price) => Number(price.replace(/[^0-9.-]/g, '')));
  }
}
