const { ONE_ITEM_PRODUCT_DATA, TEN_ITEMS_PRODUCT_DATA, NEGATIVE_ITEMS_PRODUCT_DATA,  ORDER_CONFIRM_BUTTON_TEXT, PRODUCT_DATA } = require('../../config/cartPageConfig');
const cartPage = require('../../pages/cartPage');

describe('Adding products to the cart tests', () => {

    it('Adding product from main page', () => {
        browser.url('http://shop.qatl.ru/');
        cartPage.getProductItem(PRODUCT_DATA.text).$('.add-to-cart-link').click();

        cartPage.getItemTitleText().then(actualText => expect(actualText).toBe(PRODUCT_DATA.text));
    });

    it('Adding one product to cart from product page', () => {
        browser.url(`http://shop.qatl.ru${PRODUCT_DATA.url}`);
        
        setTimeout(() => {
            cartPage.addToCart();
        }, 3000);

        cartPage.getItemTitleText().then(actualText => expect(actualText).toBe(PRODUCT_DATA.text));
    });

    it('Adding 10 products to the cart from product page', () => {
        browser.url(`http://shop.qatl.ru${PRODUCT_DATA.url}`);

        setTimeout(() => {
            cartPage.quantityField.setValue(TEN_ITEMS_PRODUCT_DATA.count);
            cartPage.addToCart();
        }, 3000);

        cartPage.getItemTitleText().then(actualText => expect(actualText).toBe(PRODUCT_DATA.text));
    });

    it('Adding -1 product to the cart from product page', () => {
        browser.url(`http://shop.qatl.ru${PRODUCT_DATA.url}`);

        setTimeout(() => {
            cartPage.quantityField.setValue(NEGATIVE_ITEMS_PRODUCT_DATA.count);
            cartPage.addToCart();
        }, 3000);

        cartPage.getItemTitleText().then(actualText => expect(actualText).toBe(PRODUCT_DATA.text));
    });
});