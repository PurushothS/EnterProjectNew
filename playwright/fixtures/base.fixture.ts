import { test as base } from '@playwright/test';
import { DashboardPage } from '../../src/examples/demo/pages/DashboardPage';
import { LoginPage } from '../../src/examples/demo/pages/LoginPage';
import { ShoppingCartPage } from '../../src/examples/demo/pages/ShoppingCartPage';

interface UiFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  shoppingCartPage: ShoppingCartPage;
}

export const test = base.extend<UiFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  shoppingCartPage: async ({ page }, use) => use(new ShoppingCartPage(page)),
});
export { expect } from '@playwright/test';
