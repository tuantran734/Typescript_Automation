import {Locator, Page} from '@playwright/test'

export class Leftmenu {
    // PARAM
    readonly page: Page;
    readonly menuSideBar: Locator;
    // DOM
    constructor(page: Page) {
        this.page = page;
        this.menuSideBar = page.locator('[id="sidebar-menu"]');
    }

    MenuOptions(option: string) {
        return this.page.locator(`//a[@title="${option}"]`);
    }
    button(button: string) {
        return this.page.getByRole('button', {name: button});
    }

    async clickButton (button: string) {
        await this.button(button).click;
    }
    // METHOD
    async selectComponentLeftMenu (option: string) {
        await this.MenuOptions(option).click();
    }

}