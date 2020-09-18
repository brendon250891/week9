module.exports = (database, app) => {
    app.post('/api/remove-product', (request, response) => {
        database.collection('products').findOneAndDelete({ id: request.body.productId }).then(result => {
            if (result.lastErrorObject.n > 0) {
                response.send({ ok: true, message: `Removed ${result.value.name}`});
            } else {
                response.send({ ok: false, message: `Failed to Remove Product`});
            }
        });
    });
}