import { test } from '../framework/fixtures/pageFixtures'

    test.describe(() => {
        test.use({
            storageState: '.auth/auth.json',
        });
    //TC-16 - Create multiple products using data factory
    test(`Verify the framework can generate and use multiple product data sets safely @data @regression`, async ({productPage, dashboardPage, leftmenu}) => {
            await dashboardPage.verifyURL();

            await leftmenu.selectComponentLeftMenu('Ecommerce');
            await leftmenu.selectComponentLeftMenu('Products');

            await productPage.verifyProductPageIsVisible();
            await productPage.clickButton('Create');
            await productPage.clickButton('Physical');
            await productPage.verifyCreateProductPageIsVisible();
            const product = await productPage.createProduct('100');
            await productPage.clickButton('Save & Exit');
            await productPage.verifyMessage('created');

            await productPage.searchForProduct(product.name);
            await productPage.verifyProductItemIsVisible('name', product.name);
            await productPage.clickAction('delete');
            await productPage.clickButton('Delete');
            await productPage.verifyMessage('delete');
            await productPage.searchForProduct(product.name);
            await productPage.verifyTableNoRecord();
        })    
});