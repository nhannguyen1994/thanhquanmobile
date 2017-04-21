const { db, } = require('../pgp');

const Product = require('../models/products');
const Category = require('../models/category');
const Image = require('../models/images');

const product = new Product(db);
const cate = new Category(db);
const image = new Image(db);

let log = console.log;

module.exports = function (express) {
    const router = express.Router();

    router.get('/', (req, res) => {

        //Add to cart
        let addtocart = req.query['add-to-cart'];
        let addcart = '';
	    if(typeof addtocart != 'undefined') {
            let cart = req.session.cart;

            if(!cart){
                cart = req.session.cart = {};
            }

            if(cart && cart[addtocart]) {
                let qty = cart[addtocart];
                cart[addtocart] = qty + 1;
            }else {
                cart[addtocart] = 1;
            }
            //log(cart);
            addcart = product.selectName(addtocart);
        }


        let q = req.query.page;
        let n = 9;
        let pgfrom = 0;
        if (q != undefined && q > 0) {
            pgfrom = (pgfrom + q - 1) * n;
        } else {
            q = 0;
        }
        //
        let price = req.query.gia;
        let order = req.query.order;
        //
        db.task(t => {
            return t.batch([
                product.selectByPagination(n, pgfrom),
                product.countAll(),
                q,
                addcart
            ]);
        })
            .then(data => {
                let countAll = page = 0;
                data[1].forEach((index) => {
                    countAll = index.count;
                    page = Math.ceil(index.count / n, 0);
                });
                if (q > page) {
                    q = 1;
                }
                res.render('danh-sach.html', {
                    pageTitle: 'Điện thoại',
                    products: data[0],
                    countAll: data[1],
                    allpage: page,
                    pageCurrent: q
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
    });

    router.get('/:id', function (req, res) {
        let id = req.params.id;
        db.task(t => {
            return t.batch([
                product.detail(id),
                image.selectByParentId(id),
                product.selectNew(10)
            ]);
        })
            .then(data => {
                res.render('chi-tiet.html', { pageTitle: 'Điện Thoại', detail: data[0], images: data[1], productSimilar: data[2] });
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
    });

    return router
};