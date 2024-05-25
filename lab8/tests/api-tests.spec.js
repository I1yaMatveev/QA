const fs = require('fs');
const Ajv = require('ajv');
const ProductApi = require('./product_api');

const testData = JSON.parse(fs.readFileSync('config/test-values.json', 'utf-8'));
const schema = JSON.parse(fs.readFileSync('config/schema.json', 'utf8'));

const productApi = new ProductApi();
const ajv = new Ajv();
const validate = ajv.compile(schema);

const TEST_TIMEOUT = 20000;

const INVALID_ID = "ID";
const NON_EXISTING_ID = 1111111111;

const SUCCESS_STATUS_CODE = 1;
const FAIL_STATUS_CODE = 0;

function isActualProduct(expected, actual) {
    return expected.title === actual.title &&
           expected.alias === actual.alias &&
           expected.price === actual.price &&
           expected.old_price === actual.old_price &&
           expected.status === actual.status &&
           expected.keyword === actual.keyword &&
           expected.description === actual.description &&
           expected.hit === actual.hit;
}

describe("Testing shop api, adding product", () => {

    let productIds = [];

    afterEach(async () => {
        // Очистка БД после каждого теста
        for (const id of productIds) {
            await productApi.deleteProductRequest(id);
        }
        productIds = [];
    }, 10000);

    it('Adding correct product', async () => {
        const productData = testData.correctProduct;
        const addProductResponse = await productApi.addProductRequest(productData);
        const productId = productApi.addedProductId;

        const addedProduct = await productApi.getProductById(productId);
        expect(addProductResponse.data.status).toBe(SUCCESS_STATUS_CODE);
        expect(validate(addedProduct)).toBe(true);
        expect(isActualProduct(productData, addedProduct)).toBe(true);

        productIds.push(productId);
    }, TEST_TIMEOUT);

    it.each`
        testName | productData
        ${'Adding incorrect product with invalid price'} | ${testData.productWithStringPrice}
        ${'Adding incorrect product with negative price'} | ${testData.productWithNegativePrice}
        ${'Adding incorrect product with null category'} | ${testData.productWithNullCategory}
        ${'Adding incorrect product with missing props'} | ${testData.productWithMissingProps}
        ${'Adding empty product'} | ${testData.emptyProduct}
    `('$testName', async ({ testName, productData }) => {
        const addProductResponse = await productApi.addProductRequest(productData);
        const addedProduct = await productApi.getProductById(productApi.addedProductId);

        expect(addProductResponse.data.status).toBe(undefined);
        expect(addedProduct).toBe(undefined);
    }, TEST_TIMEOUT);

    it.each`
        testName | productData
        ${'Adding incorrect product with null status'} | ${testData.productWithNullStatus}
        ${'Adding incorrect product with invalid status'} | ${testData.productWithInvalidStatus}
        ${'Adding incorrect product with null hit'} | ${testData.productWithNullHit}
        ${'Adding incorrect product with invalid hit'} | ${testData.productWithInvalidHit}
        ${'Adding incorrect product with invalid id'} | ${testData.productWithInvalidId}
    `('$testName', async ({ testName, productData }) => {
    const addProductResponse = await productApi.addProductRequest(productData);
    const productId = productApi.addedProductId;
    const addedProduct = await productApi.getProductById(productId);

    expect(addProductResponse.data.status).toBe(SUCCESS_STATUS_CODE);
    expect(addedProduct).toBeDefined();

    productIds.push(productId);
    }, TEST_TIMEOUT);

    it.each`
        testName | productData
        ${'Adding incorrect product with invalid 0 category'} | ${testData.productWithInvalid0Category}
        ${'Adding incorrect product with invalid 16 category'} | ${testData.productWithInvalid16Category}
    `('$testName', async ({ testName, productData }) => {
        const addProductResponse = await productApi.addProductRequest(productData);
        const productId = productApi.addedProductId;
        const addedProduct = await productApi.getProductById(productId);

        expect(addProductResponse.data.status).toBe(SUCCESS_STATUS_CODE);
        expect(addedProduct).toBe(undefined);

        productIds.push(productId);
    }, TEST_TIMEOUT);

    it('Adding correct product with 14 category', async () => {
        const productData = testData.productWithValid14Category;
        const addProductResponse = await productApi.addProductRequest(productData);
        const productId = productApi.addedProductId;

        const addedProduct = await productApi.getProductById(productId);
        expect(addProductResponse.data.status).toBe(SUCCESS_STATUS_CODE);
        expect(validate(addedProduct)).toBe(true);
        expect(isActualProduct(productData, addedProduct)).toBe(true);

        productIds.push(productId);
    }, TEST_TIMEOUT);

    it('Adding correct product with same title', async () => {
        const sameData = testData.correctProduct;

        await productApi.addProductRequest(sameData);
        const firstProductId = productApi.addedProductId;
        const firstProduct = await productApi.getProductById(firstProductId);

        await productApi.addProductRequest(sameData);
        const secondProductId = productApi.addedProductId;
        const secondProduct = await productApi.getProductById(secondProductId);

        expect(firstProduct.alias).toBe(sameData.alias);
        expect(secondProduct.alias).toBe(sameData.alias + '-0');

        productIds.push(firstProductId);
        productIds.push(secondProductId);
        
    }, TEST_TIMEOUT);

    it('Adding null product', async () => {
        const addProductResponse = await productApi.addProductRequest(testData.nullProduct);

        const addedProduct = await productApi.getProductById(productApi.addedProductId);

        expect(addProductResponse.data.status).toBe(FAIL_STATUS_CODE);
        expect(addedProduct).toBe(undefined);
    }, TEST_TIMEOUT);

});

describe("Testing shop api, deleting product", () => {

    let productIds = [];

    afterEach(async () => {
        // Очистка БД после каждого теста
        for (const id of productIds) {
            await productApi.deleteProductRequest(id);
        }
        productIds = [];
    }, 10000);

    it('Deleting existing product', async () => {
        const productData = testData.correctProduct;
        await productApi.addProductRequest(productData);
        const productId = productApi.addedProductId;

        const deleteProductResponse = await productApi.deleteProductRequest(productId);
        const deletedProduct = await productApi.getProductById(productId);

        expect(deleteProductResponse.data.status).toBe(SUCCESS_STATUS_CODE);
        expect(deletedProduct).toBe(undefined);
    }, TEST_TIMEOUT);

    it.each`
        testName | productId
        ${'Deleting non-existing product'} | ${INVALID_ID}
        ${'Deleting product with invalid id'} | ${NON_EXISTING_ID}
    `('$testName', async ({ testName, productId }) => {
        const deleteProductResponse = await productApi.deleteProductRequest(productId);
        expect(deleteProductResponse.data.status).toBe(FAIL_STATUS_CODE);
    }, TEST_TIMEOUT);

});

describe("Testing shop api, editing product", () => {

    let productIds = [];

    afterEach(async () => {
        for (const id of productIds) {
            await productApi.deleteProductRequest(id);
        }
        productIds = [];
    }, 10000);
    
    it('Edit existing product', async () => {
        const productData = testData.correctProduct;
        await productApi.addProductRequest(productData);
        const productId = productApi.addedProductId

        let editedProductData = testData.correctProductEdited;
        const editProductResponse = await productApi.editProductRequest({
            ...editedProductData,
            id: productId
        });

        const editedProduct = await productApi.getProductById(productId);

        expect(editProductResponse.data.status).toBe(SUCCESS_STATUS_CODE);
        expect(validate(editedProduct)).toBe(true);
        expect(isActualProduct(editedProduct, editedProductData)).toBe(true);

        productIds.push(productId);
    }, TEST_TIMEOUT);

});