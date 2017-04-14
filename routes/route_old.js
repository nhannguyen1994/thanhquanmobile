//const data = require('../data/data.json');

const {db, } = require('../pgp');

const Product = require('../models/products');
const Category = require('../models/category');
const Image = require('../models/images');

const product = new Product(db);
const cate = new Category(db);
const image = new Image(db);

let log = console.log;

module.exports = (app) => {
    app.get('/', function (req, res) {

        db.task(t => {
            return t.batch([
                cate.selectCurrentById('ptdt'),
                cate.selectCurrentById('ptpk'),
                product.productHot()
            ]);
        })
        .then(data => {
            res.render('index.html', {
                title: 'Trang chủ',
                childDtHeader: data[0],
                childPkHeader: data[1],
                productHot: data[2]
            });


        })
        .catch(error => {
            return error.detail;
        });
    });

    app.get('/dien-thoai/', function (req, res) {
        let q = req.query.page;
        let n = 5;
        let pgfrom = 0;
        if(q != undefined && q > 0){
            pgfrom = (pgfrom + q - 1) * n;
        }else{
            q = 0;
        }
        db.task(t => {
            return t.batch([
                product.selectBypagination(pgfrom, n),
                image.all(),
                cate.selectCurrentById('ptdt'),
                product.countAll(),
                q
            ]);
        })
            .then(data => {
                let countAll = page = 0;
                data[3].forEach((index) => {
                    countAll = index.count;
                    page = Math.floor(index.count / n, 0);
                    if(index.count % n > 0){
                        page ++;
                    }
                });
                if(q > page){
                    q = 1;
                }
                res.render('products.html', {
                    title: 'Products',
                    products: data[0],
                    images: data[1],
                    product_type: data[2],
                    countAll: data[3],
                    allpage: page,
                    pageCurrent : q
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
    });

    app.get('/dien-thoai/:id', function (req, res) {

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

    app.get('/san-pham/chi-tiet/:id', function (req, res) {

        let id = req.params.id;

        db.task(t => {
            return t.batch([
                product.detail(id),
                image.selectCurrentByParentId(id)
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
    });

    app.get('/tim-kiem/', function (req, res) {
        let q = req.query.q;
        db.task(t => {
            return t.batch([
                q,
                product.findByName(q),
                image.all()
            ]);
        })
        .then(data => {
            res.render('tim-kiem.html', {title: q, q: data[0], products: data[1], images: data[2]});
        })
        .catch(error => {
            res.json({
                success: false,
                error: error.message || error
            });
        });
    });
};