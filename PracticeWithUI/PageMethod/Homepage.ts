import { expect } from '@playwright/test';
import { Base } from './Base';

export class Homepage extends Base {

    async navigateToHomepage() {
        await this.page.goto('/');
    };

    async SelectMenuItem(option: string) {
        switch (option.toUpperCase()) {
            case 'MENU':
                await this.homepage.homeItem.click();
                break;
            case 'SIGNIN':
                await this.homepage.signInItem.click();
                break;
            case 'CATEGORIES':
                await this.homepage.categoriesItem.click();
                break;
        }
    };

    

}