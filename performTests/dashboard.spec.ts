import {test} from '../framework/fixtures/pageFixtures'

    test.describe(() => {
        test.use({
            storageState: '.auth/auth.json',
        });
        //TC-05 - Dashboard page loaded after login
        test('Verify that dashboard content is loaded after successful login @smoke', async ({dashboardPage}) => {
                await dashboardPage.verifyURL();
                await dashboardPage.verifyHeading();
        })
        //TC-06 - Left navigation menu visibility
        test('Verify that important left menu items are visible for the admin user @smoke', async ({dashboardPage}) => {
                await dashboardPage.verifyURL();
                await dashboardPage.verifyMenuSideBarVisible();
        })
        //TC-07 - Header/profile area visibility
        test('Verify that the common header area is displayed after login @regression', async ({dashboardPage, navigationBar}) => {
                await dashboardPage.verifyURL();
                await navigationBar.verifyNavigationBarIsVisible();
        })    
    });