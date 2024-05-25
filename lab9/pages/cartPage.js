class CartPage {
    get addToCartButton() { return browser.$('#productAdd'); }
    get addToCartLink() { return $('add-to-cart-link'); }
    get quantityField() { return $('//input[@name="quantity"]'); }
    get itemTitle() {
        return browser.$('tr').then(rows => rows[1].$('td:nth-child(2)'));
    }

    getProductItem(text) {
        return $('.product-main').$('*= ' + text);
    }
    
    addToCart() {
        this.addToCartButton.click();
    }

    async getItemTitleText() {
        const element = await this.itemTitle;
        return element.getText();
    }
}

module.exports = new CartPage();