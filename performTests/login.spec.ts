import { ENV } from '../framework/utils/env'
import { test } from '../framework/fixtures/pageFixtures'

test.describe('Login Tests', () => {

    test.beforeEach(  async ({ loginPage }) => {
        await loginPage.openLoginPage();
    });
    //TC-01 - Valid admin login 
    test('Verify that an admin user can log in with valid credentials @smoke', async ({loginPage, dashboardPage}) => {
        await loginPage.login(ENV.adminEmail, ENV.adminPassword);
        await dashboardPage.verifyURL();
        await dashboardPage.verifyHeading();
    })
    //TC-02 - Invalid password login
    test('Verify that the system rejects invalid credentials @negative', async ({loginPage}) => {
        await loginPage.login(ENV.invalidEmail, ENV.invalidPassword);
        await loginPage.notificationValidation();
    })
    //TC-03 - Required field validation on login form
    test('Verify validation behavior when mandatory login fields are blank @negative', async ({loginPage}) => {
        await loginPage.login(ENV.emptyEmail, ENV.emptyPassword);
        await loginPage.notificationValidation();
    })
    //TC-04 - Logout successfully
    test('Verify that a logged-in user can log out and return to the login page @smoke', async ({loginPage, dashboardPage}) => {
        await loginPage.login(ENV.adminEmail, ENV.adminPassword);
        await dashboardPage.verifyURL();
        await dashboardPage.chooseProfileOptions('Logout');

        await loginPage.verifyLoginPageisDisplayed();
    })
})