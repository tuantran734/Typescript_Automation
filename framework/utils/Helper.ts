import { ProductPage } from "../pages/ProductPage";
import {Locator, expect, Page} from '@playwright/test'

export class Helper {
    readonly page: Page;
    readonly notification: {
        validation: Locator;
    }    
    readonly productPage = ProductPage;

    constructor(page: Page) {
        this.page = page;
        this.notification = {
            validation: page.locator('[class="invalid-feedback"]'),
        }
    }
    async verifyVisibleNotifications(Messages: string[]) {
        const actualMessages = (
        await this.notification.validation.filter({ visible: true }).allInnerTexts()).map(m => m.trim().toUpperCase());
        actualMessages.forEach(msg => {expect(Messages).toContain(msg);});
        console.log(actualMessages);
        }
}