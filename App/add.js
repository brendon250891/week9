module.exports = (database, app) => {
    // If the collection already exists, drop it.
    let products = database.collection('products');
    if (products) {
        products.drop();
    }
    // Insert some default products.
    database.collection('products').insertMany([
        { 
            id: 1, 
            name: 'Callaway Big Bertha 19 Irons, Steel Shafts (4 - PW + GW)', 
            description: 'The suspended energy core is the engine of the new Big Bertha irons. This revolutionary new construction suspends the MIM\'d Tungsten weight using our propietary urethane microspheres. It\'s designed to deliver easy launch; long consistant distance; and incredible sound and feel.',
            price: 1349.00,
            units: 1
        },
        {
            id: 2,
            name: 'Cleveland Huntington Beach SOFT Putter',
            description: 'Speed Optimised Face Technology, or SOFT, is a milling pattern that corrects off-center putts. With SOFT, your center strikes and mishits roll out the same distance.',
            price: 179.95,
            units: 10
        },
        {
            id: 3,
            name: 'Cobra Speedzone Le Pars and Stripes Driver',
            description: 'The foundation for speed. Delivering precision, performance and increased ball speed. The CNC Milled Infinity Face has been expanded by 95% to deliver maximum ball speed.',
            price: 829.95,
            units: 4
        }
    ]);

    app.get('/api/get-next-id', (request, response) => {
        database.collection('products').find().count().then(count => {
            response.send({ next: count + 1 });
        });
    });

    app.post('/api/add-product', (request, response) => {
        let product = request.body.product;
        database.collection('products').insertOne(product).then(result => {
            if (result.insertedCount > 0) {
                response.send({ ok: true, message: `Added Product: ${product.name}`});
            } else {
                response.send({ ok: false, message: `Failed to Add Product ${product.name}`});
            }
        });
    });
}   