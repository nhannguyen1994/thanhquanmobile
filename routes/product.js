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

	router.get('/', (req, res) => {
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
                product.countAll(),
                q
            ]);
        })
            .then(data => {
                let countAll = page = 0;
                data[1].forEach((index) => {
                    countAll = index.count;
                    page = Math.floor(index.count / n, 0);
                    if(index.count % n > 0){
                        page ++;
                    }
                });
                if(q > page){
                    q = 1;
                }
                res.render('danh-sach.html', {
                    title: 'Điện thoại',
                    products: data[0],
                    countAll: data[1],
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

	router.get('/:id', function (req, res) {

        let id = req.params.id;

        db.task(t => {
            return t.batch([
                product.detail(id),
                image.selectByParentId(id)
            ]);
        })
        .then(data => {
            res.render('chi-tiet.html', {title: 'Detail', detail: data[0], images: data[1]});
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