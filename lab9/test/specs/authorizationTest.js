const { RIGHT_USER_DATA, INVALID_PASSWORD_USER_DATA, INVALID_LOGIN_USER_DATA, LOGIN_SUCCESS_MESSAGE, LOGIN_ERROR_MESSAGE } = require('../../config/loginPageConfig');
const loginPage = require('../../pages/loginPage');

describe('Authorization tests', () => {
    
    it('Should login successfully with valid credentials', async () => {
        loginPage.open();
        loginPage.login(RIGHT_USER_DATA.username, RIGHT_USER_DATA.password);
        const successMessage = await loginPage.successAlert.getText();
        expect(successMessage).toBe(LOGIN_SUCCESS_MESSAGE);
    });

    it('Shouldn`t login successfully with invalid credentials, invalid password', async () => {
        loginPage.open();
        loginPage.login(INVALID_PASSWORD_USER_DATA.username, INVALID_PASSWORD_USER_DATA.password);
        const successMessage = await loginPage.errorAlert.getText();
        expect(successMessage).toBe(LOGIN_ERROR_MESSAGE);
    });

    it('Shouldn`t login successfully with invalid credentials, invalid login', async () => {
        loginPage.open();
        loginPage.login(INVALID_LOGIN_USER_DATA.username, INVALID_LOGIN_USER_DATA.password);
        const successMessage = await loginPage.errorAlert.getText();
        expect(successMessage).toBe(LOGIN_ERROR_MESSAGE);
    });
});