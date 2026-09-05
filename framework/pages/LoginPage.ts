import {expect, Locator, Page} from '@playwright/test';
import {MESSAGE, PATH} from '../data/TestData'
import { Helper } from '../utils/Helper';

export class LoginPage {
    // Khai báo biến
    readonly page: Page;
    readonly helper: Helper;
    readonly inputField: {
        username: Locator;
        password: Locator;
    }
    readonly button: {
        SignInButton: Locator;
    }
    readonly notification: {
        feedback: Locator;
    }

    // Khai báo DOM
    constructor(page: Page) {
        this.page = page;
        this.helper = new Helper(page);
        this.inputField = {
            username: page.locator('[id="username"]'),
            password: page.locator('[id="password"]')
        };
        this.button = {
            SignInButton: page.getByRole('button', {name: 'Sign in'})
        }
        this.notification = {
            feedback: page.locator('[class="invalid-feedback"]'),
        }
    }
    // Khai báo hàm
    async openLoginPage () {
        await this.page.goto(PATH.login);
        await expect(this.page).toHaveURL(PATH.login);
    }
    async GenerateAuth(username: string, password: string) {
        await this.page.goto(PATH.login);
        await this.inputField.username.fill(username);
        await this.inputField.password.fill(password);
        await this.button.SignInButton.click();
        const AuthFile = ".auth/auth.json";
        await this.page.context().storageState({path: AuthFile});
    }
    async login(username: string, password: string) {
        await this.inputField.username.fill(username);
        await this.inputField.password.fill(password);
        await this.button.SignInButton.click();
    }
    async notificationValidation () {
        await this.helper.verifyVisibleNotifications([
            MESSAGE.USERNAMEERROR,
            MESSAGE.PASSWORDERROR,
            MESSAGE.INVALIDCREDENTIAL
        ]);
    }
    async verifyLoginPageisDisplayed() {
        await expect(this.page).toHaveURL(PATH.login);
        await expect(this.inputField.username).toBeVisible();
        await expect(this.inputField.password).toBeVisible();
    }

}    