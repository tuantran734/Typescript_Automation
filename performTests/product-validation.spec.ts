import { test } from '../framework/fixtures/pageFixtures'

    test.describe(() => {
        test.use({
            storageState: '.auth/auth.json',
        });
        //TC-14 - Validate required fields on create product form
        test('Verify validation behavior when mandatory product fields are missing @negative ', async ({productPage, dashboardPage, leftmenu}) => {
            await dashboardPage.verifyURL();

            await leftmenu.selectComponentLeftMenu('Ecommerce');
            await leftmenu.selectComponentLeftMenu('Products');

            await productPage.verifyProductPageIsVisible();
            await productPage.clickButton('Create');
            await productPage.clickButton('Physical');
            await productPage.verifyCreateProductPageIsVisible();
            await productPage.clickButton('Save & Exit');
            await productPage.notificationValidation();

        })
        //TC-15 - Validate invalid price input
        test('Verify that invalid price values are handled correctly.  @negative ', async ({productPage, dashboardPage, leftmenu}) => {
            await dashboardPage.verifyURL();

            await leftmenu.selectComponentLeftMenu('Ecommerce');
            await leftmenu.selectComponentLeftMenu('Products');

            await productPage.verifyProductPageIsVisible();
            await productPage.clickButton('Create');
            await productPage.clickButton('Physical');
            await productPage.verifyCreateProductPageIsVisible();
            await productPage.createProduct('-200');
            await productPage.clickButton('Save & Exit');
            await productPage.notificationValidation();
        })
    })        