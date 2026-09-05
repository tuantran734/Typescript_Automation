import { test } from '../framework/fixtures/pageFixtures'

    test.describe(() => {
        test.use({
            storageState: '.auth/auth.json',
        });

    //TC-09 - Create product with mandatory fields
    test('Verify that user can navigate to the Products module using the left menu @crud @regression', async ({productPage, dashboardPage, leftmenu}) => {
        await dashboardPage.verifyURL();

        await leftmenu.selectComponentLeftMenu('Ecommerce');
        await leftmenu.selectComponentLeftMenu('Products');

        await productPage.verifyProductPageIsVisible();
        await productPage.clickButton('Create');
        await productPage.clickButton('Physical');
        await productPage.verifyCreateProductPageIsVisible();
        await productPage.createProduct('200');
        await productPage.clickButton('Save');
        await productPage.verifyMessage('Created');
    })

    //TC-10 - Create product with dynamic product name and SKU
    test('Verify that dynamic data is used to avoid duplicate records @crud @data', async ({productPage, dashboardPage, leftmenu}) => {
        await dashboardPage.verifyURL();

        await leftmenu.selectComponentLeftMenu('Ecommerce');
        await leftmenu.selectComponentLeftMenu('Products');

        await productPage.verifyProductPageIsVisible();
        await productPage.clickButton('Create');
        await productPage.clickButton('Physical');
        await productPage.verifyCreateProductPageIsVisible();
        await productPage.createProduct('200');
        await productPage.clickButton('Save & Exit');
        await productPage.verifyMessage('Created');
    })
    //TC-11 - Search product by name
    test('Verify that a created product can be searched by product name @crud @regression', async ({productPage, dashboardPage, leftmenu}) => {
        await dashboardPage.verifyURL();

        await leftmenu.selectComponentLeftMenu('Ecommerce');
        await leftmenu.selectComponentLeftMenu('Products');

        await productPage.verifyProductPageIsVisible();
        await productPage.clickButton('Create');
        await productPage.clickButton('Physical');
        await productPage.verifyCreateProductPageIsVisible();
        const product = await productPage.createProduct('200');
        await productPage.clickButton('Save & Exit');
        await productPage.verifyMessage('Created');
        await productPage.searchForProduct(product.name);
        await productPage.verifyProductItemIsVisible('name', product.name);
    })
    //TC-12 - Update product price
    test('Verify that a product price can be updated successfully @crud @regression', async ({productPage, dashboardPage, leftmenu}) => {
        await dashboardPage.verifyURL();

        await leftmenu.selectComponentLeftMenu('Ecommerce');
        await leftmenu.selectComponentLeftMenu('Products');

        await productPage.verifyProductPageIsVisible();
        await productPage.clickButton('Create');
        await productPage.clickButton('Physical');
        await productPage.verifyCreateProductPageIsVisible();
        const product = await productPage.createProduct('100');
        await productPage.clickButton('Save & Exit');
        await productPage.verifyMessage('Created');
        await productPage.searchForProduct(product.name);
        await productPage.verifyProductItemIsVisible('name', product.name);

        await productPage.clickAction('edit');
        const updateProduct = await productPage.updateProduct(product.name, product.sku, '200');
        await productPage.clickButton('Save & Exit');
        await productPage.searchForProduct(updateProduct.name);
        await productPage.verifyProductItemIsVisible('price', updateProduct.price);
    })
    //TC-13 - Delete created product
    test('Verify that the test-created product can be deleted safety @crud @cleanup', async ({productPage, dashboardPage, leftmenu}) => {
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