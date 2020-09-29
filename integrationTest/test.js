const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/server.js');
const should = chai.should();
chai.use(chaiHttp);

const testProduct = { id: 4, name: "Test Product", description: "This is a test products", price: 10.50, units: 1 };
const updateProduct = { id: 4, name: "Test Product", description: "Upated test product", price: 10.50, units: 1 };

describe('Testing Add routes', () => {
    describe('/api/add-product', () => {
        it ('should add a new product to the products collection', done => {
            chai.request(app).post('/api/add-product').send({ product: testProduct }).end((error, response) => {
                if (error) { console.log(error) }

                response.should.have.status(200);
                response.body.should.have.property('ok');
                response.body.should.have.property('message');
                assert.strictEqual(response.body.message, `Added Product: ${testProduct.name}`)
                done();
            });
        });
    });

    describe('/api/get-next-id', () => {
        it ('should return the next available product id', done => {
            chai.request(app).get('/api/get-next-id').end((error, response) => {
                if (error) { console.log(error) }

                response.should.have.status(200);
                response.body.should.have.property('next');
                assert.strictEqual(response.body.next, 5);
                done();
            });
        });
    });
});

describe('Testing Read routes', () => {
    describe('/api/get-all-products', () => {
        it ('should get all products in the database', done => {
            chai.request(app).get('/api/get-all-products').end((error, response) => {
                if (error) { console.log(error) }

                response.should.have.status(200);
                response.body.should.have.property('count');
                response.body.should.have.property('products');
                assert.strictEqual(response.body.count, 4);
                done();
            })
        });
    });
});

describe('Testing Update routes', () => {
    describe('/api/update-product', () => {
        it ('should update a product in the database', done => {
            chai.request(app).post('/api/update-product').send({ product: updateProduct }).end((error, response) => {
                if (error) { console.log(error) }

                response.should.have.status(200);
                response.body.should.have.property('ok');                
                response.body.should.have.property('message');
                assert.strictEqual(response.body.message, `Updated Product ${updateProduct.name}`);
                done();
            });
        });
    });
});

describe('Testing Remove routes', () => {
    describe('/api/remove-product', () => {
        it ('should remove a product from the database', done => {
            chai.request(app).post('/api/remove-product').send({ productId: testProduct.id }).end((error, response) => {
                if (error) { console.log(error) }

                response.should.have.status(200);
                response.body.should.have.property('ok');                
                response.body.should.have.property('message');
                assert.strictEqual(response.body.message, `Removed ${updateProduct.name}`);
                done();
            });
        });
    });
});