//const data = require('../data/data.json');
module.exports = (app, db) => {
    app.get('/', function (req, res) {
/*
        db.none('DROP TABLE IF EXISTS product CASCADE;')
        .then(() => {
            db.none("CREATE TABLE product(product_id TEXT PRIMARY KEY, product_name TEXT, product_template_id TEXT, category_id TEXT, manufacturer_id TEXT, sales_volume INTEGER, store_day TEXT, price INTEGER, quantity INTEGER, description JSON, main_property JSON, detail_property JSON);")
                .then(() => {
                        for (let count in data) {
                            db.none('INSERT INTO product VALUES(${product_id}, ${product_name}, ${product_template_id}, ${category_id}, ${manufacturer_id}, ${sales_volume}, ${store_day}, ${price}, ${quantity}, ${description}, ${main_property}, ${detail_property})', data[count])
                                .then(() => {
                                    // success;
                                    console.log("success");
                                    res.render('old/index1.html');
                                })
                                .catch(error => {
                                    res.json({
                                        success: false,
                                        error: error.message || error
                                    });
                                });
                        }
                }).catch(error => {
                    res.json({
                        success: false,
                        error: error.message || error
                    });
                });
        }).catch(error => {
            res.json({
                success: false,
                error: error.message || error
            });
        });
*/
        //res.render('old/index1.html');

        db.task(t => {
            return t.batch([
                db.products.all(),
                db.images.all()
            ]);
        })
            .then(data => {
                res.render('index.html', {title: 'Home', products: data[0], images: data[1]});
            })
            .catch(error => {
                // error;
            });

    });

    app.get('/products', function (req, res) {
        db.task(t => {
            return t.batch([
                db.products.all(),
                db.images.all(),
                db.product_type.childrenCat('ptdt')
            ]);
        })
            .then(data => {
                res.render('products.html', {title: 'Products', products: data[0], images: data[1], product_type: data[2]});
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
         res.render('products.html', {title: 'Products', products : data, images : data1});
         })
         .catch(error => {
         res.json({
         success: false,
         error: error.message || error
         });
         });
         //res.render('products.html', {title: 'Products', products : data, images : images});
         })
         .catch(error => {
         res.json({
         success: false,
         error: error.message || error
         });
         });
         */
    });

    app.get('/product_type/:id', function (req, res) {

        let id = req.params.id;

        db.task(t => {
            return t.batch([
                db.products.byProductType(id),
                db.images.all(),
                db.product_type.childrenCat('ptdt')
            ]);
        })
            .then(data => {
                res.render('product_type.html', {title: 'Products', products: data[0], images: data[1], product_type: data[2]});
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
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
                res.render('detail.html', {title: 'Detail', detail: data[0], images: data[1]});
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
         res.render('detail.html', {title: 'Detail', detail : data, images : data1});
         })
         .catch(error => {
         res.json({
         success: false,
         error: error.message || error
         });
         });
         //res.render('detail.html', {title: 'Detail', detail : data});
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