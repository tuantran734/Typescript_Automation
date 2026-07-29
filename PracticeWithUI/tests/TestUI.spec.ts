import { test} from '@playwright/test';
import { Homepage } from '../PageMethod/Homepage';
import {Loginpage} from '../PageMethod/Loginpage';

let homepage: Homepage;
let loginPage: Loginpage;

test.beforeEach(async ({page}) => {
  homepage = new Homepage(page);
  loginPage = new Loginpage(page);
  await homepage.navigateToHomepage();
});

test('Navigate to Homepage & Login success', async ({}) => {
  await homepage.SelectMenuItem('signin');
  await loginPage.loginWithValidUsername();
});

