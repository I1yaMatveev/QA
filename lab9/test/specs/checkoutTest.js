const checkoutPage = require('../../pages/checkoutPage');
const { CONFIRM_BUTTON_TEXT, USER_DATA, INVALID_USER_DATA, SUCCESS_MESSAGE, ERROR_MESSAGE } = require('../../config/checkoutPageConfig');

const { RIGHT_USER_DATA, LOGIN_SUCCESS_MESSAGE } = require('../../config/loginPageConfig');
const loginPage = require('../../pages/loginPage');

describe('Checkout tests', () => {

    it('User can make an order, already authorized', async () => {
        loginPage.open();
        loginPage.login(RIGHT_USER_DATA.username, RIGHT_USER_DATA.password);
        const successMessage = await loginPage.successAlert.getText();
        expect(successMessage).toBe(LOGIN_SUCCESS_MESSAGE);
        
        checkoutPage.open();

        checkoutPage.addToCartButton.click();
        setTimeout(async () => {
            const confirmButton = await checkoutPage.getModalButton(CONFIRM_BUTTON_TEXT);
            confirmButton.click();
        }, 5000);

        checkoutPage.submitButton.click();
        setTimeout(() => {
            expect(checkoutPage.titleMessage.getText()).toBe(SUCCESS_MESSAGE);
        }, 5000);
    });

    it('User can make an order, valid user data. Authorization during checkout', () => {
        checkoutPage.open();

        checkoutPage.addToCartButton.click();
        setTimeout(async () => {
            const confirmButton = await checkoutPage.getModalButton(CONFIRM_BUTTON_TEXT);
            confirmButton.click();
        }, 5000);

        checkoutPage.fillData(USER_DATA);
        checkoutPage.submitButton.click();
        setTimeout(() => {
            expect(checkoutPage.titleMessage.getText()).toBe(SUCCESS_MESSAGE);
        }, 5000);
    });

    it('User can`t make an order with already used login, invalid user data. Authorization during checkout', () => {
        checkoutPage.open();

        checkoutPage.addToCartButton.click();
        setTimeout(async () => {
            const confirmButton = await checkoutPage.getModalButton(CONFIRM_BUTTON_TEXT);
            confirmButton.click();
        }, 5000);

        checkoutPage.fillData(INVALID_USER_DATA);
        checkoutPage.submitButton.click();

        setTimeout(async () => {
            expect(checkoutPage.errorMessage.getText()).toBe(ERROR_MESSAGE);
        }, 5000);
    });
});