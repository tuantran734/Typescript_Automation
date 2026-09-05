import {Locator, expect, Page} from '@playwright/test'
import { NavigationBar } from '../components/NavigationBar';
import { Leftmenu } from '../components/LeftMenu';
import {PATH} from '../data/TestData'

export class DashboardPage {
    // Khai báo biến
    readonly page: Page;
    readonly heading: {
        dashboard: Locator;
    }
    readonly button: {
        ManageWidgets: Locator;
    }
    readonly navigationBar: NavigationBar;
    readonly leftMenu: Leftmenu;
    // khai báo DOM
    constructor(page: Page) {
        this.page = page;
        this.heading = {
            dashboard: page.getByRole('heading', {name: 'Dashboard'}),
        }
        this.button = {
            ManageWidgets: page.getByRole('button', {name: 'Manage Widgets'})
        }
        this.navigationBar = new NavigationBar(page);
        this.leftMenu = new Leftmenu(page);
    }
    // Khai báo hàm
    async verifyURL () {
        await this.page.goto(PATH.dashboard);
        await expect(this.page).toHaveURL(PATH.dashboard);
    }
    async verifyHeading() {
        await expect(this.heading.dashboard).toBeVisible();
    }
    async verifyMenuSideBarVisible () {
        await expect(this.leftMenu.menuSideBar).toBeVisible();
    }
    async chooseProfileOptions (option: string) {
        await this.navigationBar.chooseProfileOptions(option);
    }
    async selectComponentLeftMenu(option: string) {
        await this.leftMenu.selectComponentLeftMenu(option);
    }
}