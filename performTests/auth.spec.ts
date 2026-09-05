import { ENV } from '../framework/utils/env'
import { test} from '../framework/fixtures/pageFixtures'

test('Generate Auth', async ({ loginPage }) => {
        await loginPage.GenerateAuth(ENV.adminEmail, ENV.adminPassword);
});