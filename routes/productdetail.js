const {db, } = require('../pgp');

const Product = require('../models/products');
const Category = require('../models/category');
const Image = require('../models/images');

const product = new Product(db);
const cate = new Category(db);
const image = new Image(db);

let log = console.log;

module.exports = function (express) {
	const router = express.Router();

	router.get('/:id', function (req, res) {

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


	return router
};