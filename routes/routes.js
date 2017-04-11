
module.exports = (app, db) => {
    app.get('/', function (req, res) {

        //res.render('old/index1.html');
        db.task(t => {
            return t.batch([
                db.products.all(),
                db.images.all()
            ]);
        })
            .then(data => {
                res.render('index.njk', {title: 'Home', products: data[0], images: data[1]});
            })
            .catch(error => {
                // error;
            });

    });

    app.get('/products', function (req, res) {
        db.task(t => {
            return t.batch([
                db.products.all(),
                db.images.all()
            ]);
        })
            .then(data => {
                res.render('products.njk', {title: 'Home', products: data[0], images: data[1]});
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });

        /*
         db.products.all(req)
         .then(data => {
         let id_product = [];
         data.forEach((index) => {
         id_product.push(index.product_id);
         });
         db.images.all(req)
         .then(data1 => {
         res.render('products.njk', {title: 'Products', products : data, images : data1});
         })
         .catch(error => {
         res.json({
         success: false,
         error: error.message || error
         });
         });
         //res.render('products.njk', {title: 'Products', products : data, images : images});
         })
         .catch(error => {
         res.json({
         success: false,
         error: error.message || error
         });
         });
         */
    });

    app.get('/product/detail/:id', function (req, res) {

        let id = req.params.id;

        db.task(t => {
            return t.batch([
                db.products.detail(id),
                db.images.listAllImagesById(id)
            ]);
        })
            .then(data => {
                res.render('detail.njk', {title: 'Detail', detail: data[0], images: data[1]});
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
        /*
         db.products.detail(id)
         .then(data => {
         db.images.listAllImagesById(id)
         .then(data1 => {
         res.render('detail.njk', {title: 'Detail', detail : data, images : data1});
         })
         .catch(error => {
         res.json({
         success: false,
         error: error.message || error
         });
         });
         //res.render('detail.njk', {title: 'Detail', detail : data});
         })
         .catch(error => {
         res.json({
         success: false,
         error: error.message || error
         });
         });
         */
    });
}