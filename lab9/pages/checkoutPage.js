class CheckoutPage {
    get addToCartButton() { return $('//a[@id="productAdd"]'); }
    get loginInput() { return $('//input[@name="login"]'); }
    get passwordInput() { return $('//input[@name="password"]'); }
    get nameInput() { return $('//input[@name="name"]'); }
    get emailInput() { return $('//input[@name="email"]'); }
    get addressInput() { return $('//input[@name="address"]'); }
    get noteInput() { return $('//textarea[@name="note"]'); }
    get submitButton() { return $('//button[@type="submit]'); }
    get titleMessage() { return $('h1'); }
    get errorMessage() { return $('//div[@class="alert alert-danger"]')}

    open(productUrl) {
        browser.url(`http://shop.qatl.ru${productUrl}`);
    }

    fillData(data) {
        this.loginInput.setValue(data.login);
        this.passwordInput.setValue(data.password);
        this.nameInput.setValue(data.name);
        this.emailInput.setValue(data.email);
        this.addressInput.setValue(data.address);
        this.noteInput.setValue(data.note);
    }

    async getModalButton(text) {
        const modalFooter = await $('.modal-footer');
        const buttons = await modalFooter.$$('a');
        for (const button of buttons) {
            const buttonText = await button.getText();
            if (buttonText.includes(text)) {
                return button;
            }
        }
        return null;
    }
}

module.exports = new CheckoutPage();