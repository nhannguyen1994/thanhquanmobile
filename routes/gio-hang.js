const {db, } = require('../pgp');
const shortid = require('shortid');

const Product = require('../models/products');

const product = new Product(db);

let log = console.log;

function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}

module.exports = function (express) {
	const router = express.Router();

	router.get('/', (req, res) => {

	    //Lấy giá trị session cart
        let cart = req.session.cart;
        let ids = '';
        let count = 0;

        //Lấy chuỗi product_id để SELECT DATABASE
        for(item in cart){
            count++;
            if(count === 1){
                ids += "'" + item + "'";
            }else{
                ids += ",'" + item + "'";
            }
        }

        //Đếm cart
        let countCart = 0;
        if(cart) {
            countCart = Object.keys(cart).length;
        }
        if (!cart || countCart === 0) {
            res.render('gio-hang.html', {
                title: 'Giỏ hàng',
                product: '',
                cart: ''
            });
        }

        db.task(t => {
            return t.batch([
                product.cartIDs(ids),
                cart
            ]);
        })
            .then(data => {
                //log(data);
                res.render('gio-hang.html', {
                    title: 'Giỏ hàng',
                    product: data[0],
                    cart: data[1]
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
	});

	router.post('/', (req, res) => {

	    //log(req.body);

        let cart = req.session.cart;
        let ids = '';
        let count = 0;
        if(req.body['capnhat']){
            for (item in cart) {
                if (req.body[item] > 0) {
                    cart[item] = req.body[item];
                } else {
                    delete cart[item];
                }
            }
        }

        for (item in cart) {
            count++;
            if (count === 1) {
                ids += "'" + item + "'";
            } else {
                ids += ",'" + item + "'";
            }
        }

        //log(ids);
        let countCart = Object.keys(cart).length;
        if (countCart === 0) {
            res.render('gio-hang.html', {
                title: 'Giỏ hàng',
                product: '',
                cart: ''
            });
        }

        db.task(t => {
            return t.batch([
                product.cartIDs(ids),
                cart
            ]);
        })
            .then(data => {
                res.render('gio-hang.html', {
                    title: 'Giỏ hàng',
                    product: data[0],
                    cart: data[1]
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    error: error.message || error
                });
            });
	});

	return router;
};