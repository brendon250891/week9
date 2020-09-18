module.exports = (database, app) => {
    app.get('/api/get-all-products', (request, response) => {
        database.collection('products').find().toArray().then(products => {
            response.send({ count: products.length, products: products });
        });
    }); 
}