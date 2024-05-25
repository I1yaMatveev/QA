const axios = require('axios');

const BASE_URL = "http://shop.qatl.ru/";
const LIST_PRODUCTS_URI = 'api/products';
const ADD_PRODUCT_URI = 'api/addproduct';
const EDIT_PRODUCT_URI = 'api/editproduct';
const DELETE_PRODUCT_URI = 'api/deleteproduct';

class ProductApi {
    constructor() {
        this.addedProductId = null;
        this.allProducts = [];
    }

    async addProductRequest(product) {
        const addProductResponse = await axios.post(`${BASE_URL + ADD_PRODUCT_URI}`, product);
        this.addedProductId = addProductResponse.data.id;
        await this.getAllProductRequest();
        return addProductResponse;
    }
    
    async deleteProductRequest(productId) {
        const deleteProductResponse = await axios.get(`${BASE_URL + DELETE_PRODUCT_URI}?id=${productId}`);
        await this.getAllProductRequest();
        return deleteProductResponse;
    }
    
    async editProductRequest(product) {
        const editProductResponse = await axios.post(`${BASE_URL + EDIT_PRODUCT_URI}`, product);
        await this.getAllProductRequest();
        return editProductResponse;
    }
    
    async getAllProductRequest() {
        const getAllProductsResponse = await axios.get(`${BASE_URL + LIST_PRODUCTS_URI}`);
        if (getAllProductsResponse.status === 200) {
            this.allProducts = getAllProductsResponse.data;
        }
        return getAllProductsResponse;
    }

    async getProductById(productId) {
        return this.allProducts.find(product => product.id === `${productId}`);
    }
}

module.exports = ProductApi;
