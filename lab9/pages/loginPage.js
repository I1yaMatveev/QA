class LoginPage {
    get loginInput() { return $('//input[@name="login"]'); }
    get passwordInput() { return $('//input[@name="password"]'); }
    get loginButton() { return $('//button[@type="submit"]'); }
    get successAlert() { return $('//div[@class="alert alert-success"]'); }
    get errorAlert() { return $('//div[@class="alert alert-danger"]'); }

    open() {
        browser.url('http://shop.qatl.ru/user/login');
    }
    
    login(userLogin, password) {
        this.loginInput.setValue(userLogin);
        this.passwordInput.setValue(password);
        setTimeout(() => {
            this.loginButton.click();
        }, 5000);
    }
}

module.exports = new LoginPage();