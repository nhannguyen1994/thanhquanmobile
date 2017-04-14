const {db, } = require('../pgp');

const Category = require('../models/category');
const Image = require('../models/images');
const Phukien = require('../models/images');

const cate = new Category(db);
const image = new Image(db);
const phukien = new Phukien(db);

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
                phukien.selectBypagination(pgfrom, n),
                image.all(),
                cate.selectCurrentById('ptdt'),
                phukien.countAll(),
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
                res.render('danh-sach.html', {
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

	router.get('/:id', function (req, res) {

        let id = req.params.id;

        db.task(t => {
            return t.batch([
                phukien.detail(id),
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