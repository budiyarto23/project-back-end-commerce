var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// var app = express();
const Crypto = require("crypto");
var port = 2002;


var app = express({defaultErrorHandler:false}); 

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/baron', (req, res) => {
    res.send({
        nama: 'baron',
        pekerjaan: 'guru'
    })
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to API 2002</h1>")
})

app.get('/testencrypt', (req,res) => {
    var hashPassword = Crypto.createHmac("sha256", "kucingbertasbih")
                            .update(req.query.password).digest("hex");
    console.log(hashPassword);
    res.send(`Panjang= ${hashPassword.length} Password anda ${req.query.password} di encrypt menjadi ${hashPassword}`)
})

const { productRouter } = require('./routers');
const { cartRouter, categoryRouter, genderRouter } = require('./routers');
const { usersRouter } = require('./routers')

app.use('/product', productRouter);
app.use('/auth', productRouter);
app.use('/reg', productRouter)
app.use('/user', productRouter);
app.use('/keeplogin', productRouter);
app.use('/productdetail', productRouter);
app.use('/cart', cartRouter);
app.use('/cartp', cartRouter);
app.use('/wishlist', cartRouter);
app.use('/wishlist', cartRouter);
app.use('/deletewishlist', cartRouter);
app.use('/cartplus', cartRouter);
app.use('/editcart', cartRouter);
app.use('/deletecart', cartRouter);
app.use('/listorder', cartRouter);
app.use('/order', cartRouter);
app.use('/orders', cartRouter);
app.use('/orderdetail', cartRouter);
app.use('/confirm', cartRouter);
app.use('/confirmtrx', cartRouter);
app.use('/category', categoryRouter);
app.use('/gender', genderRouter);
app.use('/users', genderRouter);
app.use('/trx', genderRouter);
// manage product join
app.use('/join', productRouter);
// manage products sebelum di join 
app.use('/productlist', productRouter);

app.listen(port, () => console.log('API jalan  di port ' + port));

