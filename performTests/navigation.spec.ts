import {test} from '../framework/fixtures/pageFixtures'

    test.describe(() => {
        test.use({
            storageState: '.auth/auth.json',
        });
        //TC-08 - Navigate to Products module from left menu
        test('Verify that user can navigate to the Products module using the left menu @regression', async ({productPage, dashboardPage, leftmenu}) => {
            await dashboardPage.verifyURL();

            await leftmenu.selectComponentLeftMenu('Ecommerce');
            await leftmenu.selectComponentLeftMenu('Products');

            await productPage.verifyProductPageIsVisible();
        })
    });  