import { test as base} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { DashboardPage } from '../pages/DashboardPage';
import { NavigationBar} from '../components/NavigationBar';
import { ProductPage } from '../pages/ProductPage';
import { Leftmenu } from '../components/LeftMenu'

type PageFixtures = {
    navigationBar: NavigationBar;
    loginPage: LoginPage;
    leftmenu: Leftmenu;
    dashboardPage: DashboardPage;
    productPage: ProductPage;
};

export const test = base.extend<PageFixtures> ({
         leftmenu: async ({page}, use) => {await use(new Leftmenu(page))},
        loginPage: async ({page}, use) => {await use(new LoginPage(page))},
      productPage: async ({page}, use) => {await use(new ProductPage(page))},
    dashboardPage: async ({page}, use) => {await use(new DashboardPage(page))},
    navigationBar: async ({page}, use) => {await use(new NavigationBar(page))},

});
export { expect } from '@playwright/test';