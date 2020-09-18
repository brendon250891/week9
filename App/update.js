module.exports = (database, app) => {
    app.post('/api/update-product', (request, response) => {
        let product = request.body.product;
        let update = { $set: { name: product.name, description: product.description, price: product.price, units: product.units }};
        database.collection('products').findOneAndUpdate({ id: product.id }, update).then(result => {
            if (result.lastErrorObject.n > 0) {
                response.send({ ok: true, message: `Updated Product ${product.name}`});
            } else {
                response.send({ ok: false, message: `Failed to Update Product ${product.name}`});
            }
        })
    })
}