const {db,} = require('../pgp');

const Product = require('../models/products');
const Category = require('../models/category');
const Image = require('../models/images');

const product = new Product(db);
const cate = new Category(db);
const image = new Image(db);

let log = console.log;

module.exports = function (express, cart) {

    const router = express.Router();

    router.get('/', (req, res, next) => {

        log(req.session.item);
        db.task(t => {
            return t.batch([
                cate.selectCurrentById('ptpk'),
                cate.selectCurrentById('ptpk'),
                product.selectHot(),
                product.selectNew(10)
            ]);
        })
            .then(data => {
                res.render('index.html', {
                    title: 'Trang chủ',
                    childDtHeader: data[0],
                    accessory: data[1],
                    productHot: data[2],
                    productNew: data[3]
                });
            })
            .catch(error => {
                return error.detail;
            });
    });

    return router
};