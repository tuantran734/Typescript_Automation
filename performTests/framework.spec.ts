import { test } from '../framework/fixtures/pageFixtures'

    test.describe(() => {
        test.use({
            storageState: '.auth/auth.json',
        });
        //TC-17 - Use shared Notification component to verify messages
        test('Verify that success and error messages are handled through a reusable Notification component @framework ', async ({productPage, dashboardPage, leftmenu}) => {
            await dashboardPage.verifyURL();

            await leftmenu.selectComponentLeftMenu('Ecommerce');
            await leftmenu.selectComponentLeftMenu('Products');

            await productPage.verifyProductPageIsVisible();
            await productPage.clickButton('Create');
            await productPage.clickButton('Physical');
            await productPage.verifyCreateProductPageIsVisible();
            await productPage.createInvalidProduct('-200');
            await productPage.clickButton('Save & Exit');
            await productPage.notificationValidation();
        })
    })        