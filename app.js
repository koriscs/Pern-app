const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./database');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const helmet = require('helmet');

const userRouter = require('./src/routes/routes');
const addressRouter = require('./src/routes/addressrouter');
const productRouter = require('./src/routes/productrouter');
const cartRouter = require('./src/routes/cartrouter');
const orderRouter = require('./src/routes/orderrouter');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(helmet());

const PORT = 3000;

app.use(session({
    secret: "some_secret",
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
        pool: pool,
        createTableIfMissing: true,
    }),
    cookie: {
        maxAge: 1000*60*60,
    }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.get('/', (req, res) =>{
    res.render("index");
});

app.use('/auth', userRouter);
app.use('/addresses', addressRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

app.listen(PORT, ()=> {
    console.log(`App is listening on heroku`);
})
