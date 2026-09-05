import {Locator, expect, Page} from '@playwright/test'
import { NavigationBar } from '../components/NavigationBar';
import { Leftmenu } from '../components/LeftMenu';
import { MESSAGE, PATH, ProductFactory } from '../data/TestData';
import { Helper } from '../utils/Helper';

export class ProductPage {
    // Khai báo biến
    readonly page: Page;
    readonly component: {
        Breadcrumb: Locator;
        ProductTable: Locator;
        TableFirstRow: Locator;
        SearchBar: Locator;
        SearchButton: Locator;
        SearchedItem: Locator;
        SearchedSKU: Locator;
        SearchedPrice: Locator;
        ProcessingIcon: Locator;
    }
    readonly ProductAction: {
        View: Locator,
        Edit: Locator,
        Delete: Locator,
    }
    readonly notification: {
        message: Locator;
        // validation: Locator;
        noRecord: Locator;
    }
    readonly helper: Helper;
    readonly leftMenu: Leftmenu;    
    readonly navigationBar: NavigationBar;


    // khai báo DOM
    constructor(page: Page) {
        this.page = page;
        this.component = {
            Breadcrumb: page.getByLabel('breadcrumb'),
            ProductTable: page.locator('//table[@id="botble-ecommerce-tables-product-table"]'),
            TableFirstRow: page.locator('//tr[@class="odd"]'),
            SearchBar: page.getByRole('searchbox'),
            SearchButton: page.locator('class="search-icon"'),
            SearchedItem: page.locator('//td[contains(@class,"column-key-2")]//a'),
            SearchedSKU: page.locator('//td[contains(@class,"column-key-6")]'),
            SearchedPrice: page.locator('//td[contains(@class,"column-key-3")]'),
            ProcessingIcon: page.locator('//div[contains(@class,"dataTables_processing")]'),
        }
        this.ProductAction = {
            View: page.locator('//a[contains(@class, "btn-info")]'),
            Edit: page.locator('//a[contains(@class, "btn-primary")]'),
            Delete: page.locator('//a[contains(@class, "btn-danger")]'),
        }
        this.notification = {
            message: page.locator('[class="toastify-text"]'),
            // validation: page.locator('[class="invalid-feedback"]'),
            noRecord: page.getByRole('cell', { name: 'No record' }),
        }
        this.helper = new Helper(page);
        this.navigationBar = new NavigationBar(page);
        this.leftMenu = new Leftmenu(page);


    }
    inputField (field: string) {
        return this.page.locator(`//input[@id='${field}']`);
    }
    button(button: string) {
        return this.page.getByRole('button', {name: button});
    }

    async clickButton (button: string) {
        await this.button(button).first().click();
        await this.page.waitForTimeout(2000);
    }
    async clickAction (action: string) {
        switch (action.toUpperCase()) {
            case 'VIEW':
                await this.ProductAction.View.first().click();
                break;
            case 'EDIT':
                await this.ProductAction.Edit.first().click();
                break;
            case 'DELETE':
                await this.ProductAction.Delete.first().click();
                break;    
        }
    }
    async searchForProduct (product: string) {
        await this.component.SearchBar.fill(product);
        await this.component.SearchBar.press('ArrowLeft');
    }
    async createProduct(price: string) {
        const product = ProductFactory.create();
        await this.inputField('name').fill(product.name);
        await this.inputField('sku').fill(product.sku);
        await this.inputField('price').fill(price);
        return {
            name: product.name, 
            sku: product.sku, 
            price: price
        }
    }
    async createProducts(count: number, price: string) {
        if (!Number.isInteger(count) || count < 1) {
            throw new Error('Product count must be a positive integer');
        }

        const products = [];
        for (let index = 0; index < count; index++) {
            products.push(await this.createProduct(price));
        }
        return products;
    }
    async createInvalidProduct(price: string) {
        const product = ProductFactory.createNegative();
        await this.inputField('name').fill(product.name);
        await this.inputField('sku').fill(product.sku);
        await this.inputField('price').fill(price);
        return {
            name: product.name, 
            sku: product.sku, 
            price: price
        }
    }
    async updateProduct (name: string, sku: string, price: string) {
        await this.inputField('name').fill(name);
        await this.inputField('sku').fill(sku);
        await this.inputField('price').fill(price);
        return {
            name: name, 
            sku: sku, 
            price: price
        }
    }

    async verifyCreateProductPageIsVisible() {
        await expect(this.page).toHaveURL(PATH.createProduct);
    }
    async verifyProductPageIsVisible () {
        await expect(this.page).toHaveURL(PATH.product);
    }
    async verifyProductItemIsVisible (compareField: string, expectedValue: string) {
        const firstRow = this.component.TableFirstRow.first();
        await expect(firstRow).toContainText(expectedValue);
        switch (compareField.toUpperCase()) {
            case 'NAME':
                const actualName = await this.component.SearchedItem.first().innerText();
                expect(actualName).toMatch(expectedValue);
                break;
            case 'SKU':
                const actualSku = await this.component.SearchedSKU.first().innerText();
                expect(actualSku).toMatch(expectedValue);
                break;
            case 'PRICE':
                const actualPrice = await this.component.SearchedPrice.first().innerText();
                expect(actualPrice).toMatch(expectedValue);
                break;    
        }
    }
    async verifyTableNoRecord () {
        await expect(this.notification.noRecord).toBeVisible();
    }
    async verifyMessage (message: string) {
        const messagesList = (await this.notification.message.allInnerTexts()).map(msg => msg.toUpperCase());
        switch(message.toUpperCase()) {
            case 'CREATE':
                expect(messagesList).toContain(MESSAGE.CREATEPRODUCTSUCCESS);
                break;
            case 'DELETE':
                expect(messagesList).toContain(MESSAGE.DELETEPRODUCTSUCCESS);
                break;
        }
    }
    async notificationValidation () {
        await this.helper.verifyVisibleNotifications([
            MESSAGE.PRODUCTNAMEERROR,
            MESSAGE.PRICESALEERROR,
            MESSAGE.PRICEERROR,
            MESSAGE.COSTPERITEM
        ]);
    }
}