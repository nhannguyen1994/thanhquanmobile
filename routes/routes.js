module.exports = (app, express, parseurl) => {

    /*
    app.get('/foo', function (req, res, next) {
        res.send('you viewed this page ' + req.session.item + ' times')
    })
    app.get('/bar', function (req, res, next) {
        res.send('you viewed this page ' + req.session.item['cart'] + ' times')
    })
*/
    const home = require('./home')(express);
    app.use('/', home);

    const product = require('./product')(express);
    app.use('/dien-thoai/', product);

    const phukien = require('./phu-kien')(express);
    app.use('/phu-kien/', phukien);

};