module.exports = (app, express) => {
    
    const home = require('./home')(express);
    app.use('/', home);

    const product = require('./product')(express);
    app.use('/dien-thoai', product);

    const accessory = require('./accessory')(express);
    app.use('/phu-kien', accessory);

    const productBrand = require('./product-brand')(express);
    app.use('/hang-dien-thoai', productBrand)

    app.get('/tin-tuc', (req, res) => {
        res.render('tin-tuc.html', { pageTitle: 'Tin Tức' });
    });

    app.get('/lien-he', (req, res) => {
        res.render('lien-he.html', { pageTitle: 'Liên Hệ' });
    });

    app.get('/bai-viet', (req, res) => {
        res.render('bai-viet.html', { pageTitle: 'Bài Viết' });
    });

    app.get('/tai-khoan', (req, res) => {
        res.render('tai-khoan.html', { pageTitle: 'Tài Khoản' });
    });

    app.get('/gio-hang', (req, res) => {
        res.render('gio-hang.html', { pageTitle: 'Giỏ Hàng' });
    });
};