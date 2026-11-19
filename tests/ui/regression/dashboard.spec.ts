import { test, expect } from '../../../playwright/fixtures/auth.fixture';


test(
  'authenticated user can view dashboard',
  { tag: ['@regression', '@ui'] },
  async ({ dashboardPage }) => {
    await dashboardPage.open();
    await dashboardPage.verifyLoaded();
  },
);

test('to add and remove item in cart',
  { tag: ['@ui'] },
  async ({ dashboardPage, shoppingCartPage }) => {
    await dashboardPage.open();
    await dashboardPage.addRandomItemToCart();
    await shoppingCartPage.open();
    expect(await shoppingCartPage.getCartAriaLabel()).toBe('Cart, 1 items');
    await shoppingCartPage.removeRandomItemFromCart();
    expect(await shoppingCartPage.getCartAriaLabel()).toBe('Cart, empty');
  }

)
