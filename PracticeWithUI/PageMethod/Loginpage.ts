import { expect } from '@playwright/test';
import { Base } from './Base';
import { ACCOUNT } from '../Locator/locator';

export class Loginpage extends Base {

    async loginWithValidUsername() {
        await this.loginpage.usernameInput.fill(ACCOUNT.username);
        await this.loginpage.passwordInput.fill(ACCOUNT.password);
        await this.loginpage.loginButton.click();
    };
}