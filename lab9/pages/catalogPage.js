class CatalogPage {
    get searchField() { return $('//input["name="typeahead"]'); }
    get searchButton() { return $('//button[@type="submit"]'); }
    get cardLink() { return $('.about-top a'); }
    get breadcrumb() { return $('.breadcrumb'); }
    get menuItem() { return $('.menu'); }
 
    open() {
        browser.url('http://shop.qatl.ru/');
    }

    findByText(text) {
        this.searchField.setValue(text);
        setTimeout(() => {
            this.searchButton.click();
        }, 20000);
    }

    goByCardLink() {
        this.cardLink.click();
    }

}

module.exports = new CatalogPage();