import { test, expect } from '../../../playwright/fixtures/auth.fixture';

test(
  'authenticated user can view dashboard',
  { tag: ['@regression', '@ui'] },
  async ({ dashboardPage }) => {
    await dashboardPage.open();
    await dashboardPage.verifyLoaded();
  },
);

test(
  'to add and remove item in cart',
  { tag: ['@ui'] },
  async ({ dashboardPage, shoppingCartPage }) => {
    await dashboardPage.open();
    await dashboardPage.addRandomItemToCart();
    await shoppingCartPage.open();
    expect(await shoppingCartPage.getCartAriaLabel()).toBe('Cart, 1 items');
    await shoppingCartPage.removeRandomItemFromCart();
    expect(await shoppingCartPage.getCartAriaLabel()).toBe('Cart, empty');
  },
);

test('to verify ascending order sort', { tag: ['@ui'] }, async ({ dashboardPage }) => {
  await dashboardPage.open();
  await dashboardPage.selectSortOrder('az');
  const arr: string[] = await dashboardPage.getListOfItemNames();
  const sortedArr = [...arr].sort((a, b) => a.localeCompare(b));
  expect(arr).toEqual(sortedArr);
  console.log(sortedArr);
});

test('to verify descending order sort', { tag: ['@ui'] }, async ({ dashboardPage }) => {
  await dashboardPage.open();
  await dashboardPage.selectSortOrder('za');
  const arr: string[] = await dashboardPage.getListOfItemNames();
  const sortedArr = [...arr].sort((a, b) => b.localeCompare(a));
  expect(arr).toEqual(sortedArr);
  console.log(sortedArr);
});

test('to verify price low to high sort', { tag: ['@ui'] }, async ({ dashboardPage }) => {
  await dashboardPage.open();
  await dashboardPage.selectSortOrder('lohi');
  const arr: number[] = await dashboardPage.getListOfItemPrices();
  const sortedArr = [...arr].sort((a, b) => a - b);
  expect(arr).toEqual(sortedArr);
  console.log(sortedArr);
});

test('to verify price descending', { tag: ['@ui'] }, async ({ dashboardPage }) => {
  await dashboardPage.open();
  await dashboardPage.selectSortOrder('hilo');
  const arr: number[] = await dashboardPage.getListOfItemPrices();
  const sortedArr = [...arr].sort((a, b) => b - a);
  expect(arr).toEqual(sortedArr);
  console.log(sortedArr);
});

test(
  'to verify total payment amount in cart',
  { tag: ['@ui'] },
  async ({ dashboardPage, shoppingCartPage }) => {
    await dashboardPage.open();
    const addedItems = [
      await dashboardPage.addRandomItemToCart(),
      await dashboardPage.addRandomItemToCart(),
    ];
    const itemsAdded = await dashboardPage.getListOfItemNames();
    const itemPrice = await dashboardPage.getListOfItemPrices();

    expect(itemsAdded).toHaveLength(itemPrice.length);
    const inventoryItems = itemsAdded.map((name, index) => ({
      name,
      price: itemPrice[index],
    }));
    addedItems.forEach((item) => expect(inventoryItems).toContainEqual(item));

    await shoppingCartPage.open();
    expect(await shoppingCartPage.getCartAriaLabel()).toBe('Cart, 2 items');
  },
);
