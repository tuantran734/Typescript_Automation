import {Locator, expect, Page} from '@playwright/test'

export class NavigationBar {
    // PARAM
    readonly page: Page;

    readonly Navigation: {
        MenuBarButton: Locator;
        Logo: Locator;
        SearchBar: Locator;
        ViewWebsite: Locator;
        LightMode: Locator;
        ShoppingCart: Locator;
        UserMenu: Locator;
    }
    // DOM
    constructor(page: Page) {
        this.page = page;
        this.Navigation = {
            MenuBarButton: page.getByLabel('Toggle navigation').first(),
            Logo: page.getByAltText('Botble Technologies').first(),
            SearchBar: page.locator('#global-search-input').first(),
            ViewWebsite: page.getByText('View website').first(),
            LightMode: page.getByLabel('Enable dark mode').first(),
            ShoppingCart: page.locator('[class="nav-link px-0"]').first(),
            UserMenu: page.getByLabel('Open user menu').first(),
        }
    }
        ProfileOptions(option: string) {
        return this.page.getByRole('link' ,{name: option});
    }
    // METHOD
    async chooseProfileOptions (option: string) {
        await this.Navigation.UserMenu.click();
        await this.ProfileOptions(option).click();
    }
    async verifyNavigationBarIsVisible () {
        await expect(this.Navigation.MenuBarButton).toBeVisible();
        await expect(this.Navigation.Logo).toBeVisible();
        await expect(this.Navigation.SearchBar).toBeVisible();
        await expect(this.Navigation.ViewWebsite).toBeVisible();
        await expect(this.Navigation.LightMode).toBeVisible();
        await expect(this.Navigation.ShoppingCart).toBeVisible();
        await expect(this.Navigation.UserMenu).toBeVisible();
    }
}