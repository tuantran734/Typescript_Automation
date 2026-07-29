import { Locator , Page, expect } from '@playwright/test';
import { HOMEPAGE, LOGINPAGE } from '../Locator/locator';

export class Base {
    readonly page: Page;
    readonly homepage: {
        logo: Locator;
        homeItem: Locator;
        signInItem: Locator;
        categoriesItem: Locator;
    };
    readonly loginpage: {
        usernameInput: Locator;
        passwordInput: Locator;
        loginButton: Locator;
        register: Locator;
        forgotPassword: Locator
    }

    constructor(page: Page) {
        this.page = page;
        this.homepage = {
            logo: this.page.getByTitle(HOMEPAGE.logo),
            homeItem: this.page.getByText(HOMEPAGE.homeItem),
            signInItem: this.page.getByText(HOMEPAGE.signInItem),
            categoriesItem: this.page.getByText(HOMEPAGE.categoriesItem),
        };
        this.loginpage = {
            usernameInput: this.page.getByTestId(LOGINPAGE.usernameInput),
            passwordInput: this.page.getByTestId(LOGINPAGE.passwordInput),
            loginButton: this.page.getByTestId(LOGINPAGE.loginButton),
            register: this.page.getByTestId(LOGINPAGE.register),
            forgotPassword: this.page.getByTestId(LOGINPAGE.forgotPassword),
        }
    }
}