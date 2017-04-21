const {db, } = require('../pgp');
const shortid = require('shortid');

const Product = require('../models/products');

const product = new Product(db);

let log = console.log;


module.exports = function (express) {
	const router = express.Router();

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
            window.location.replace("/gio-hang/");
            exit;
        }



        db.task(t => {
            return t.batch([
                product.cartIDs(ids),
                cart
            ]);
        })
            .then(data => {
                let total = 0;
                data[0].forEach((item) => {
                    total = total + item.price;
                });
                if(req.body['thanhtoan']) {
                    if(req.body['name'] && req.body['phone'] && req.body['email'] && req.body['address'] && req.body['method']){
                        let val = {
                            name: req.body['name'],
                            phone: req.body['phone'],
                            email: req.body['email'],
                            address: req.body['address'],
                            method: req.body['method'],
                            user_id: 0,
                            note: req.body['note'],
                            status: 'pending',
                            order_date: getFormattedDate(),
                            delivery_date: '',
                            total: total
                        };
                        db.none('INSERT INTO orders VALUES(' + shortid.generate() + ', ${user_id}, ${name}, ${phone}, ${email}, ${address}, ${note}, ${order_date}, ${delivery_date}, ${status}, ${total})', val)
                        .then((data) => {
                            res.render('thanh-cong.html', {
                                title: 'Đặt hàng thành công',
                                product: data[0],
                                cart: data[1]
                            });
                        })
                        .catch(error => {
                            res.render('gio-hang.html', {
                                title: 'Giỏ hàng',
                                product: data[0],
                                cart: data[1]
                            });
                        });
                    }
                }
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