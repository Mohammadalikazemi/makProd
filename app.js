const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const viewPath = path.join(__dirname, 'views')
const staticFolder = path.join(__dirname, 'public');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'pug');
app.set('views', viewPath);
app.use(express.static(staticFolder));


//database


//

const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');
const {
    get404
} = require('./controllers/error')


const mongoConnect = require('./utils/database').mongoConnect;

app.use((req, res, next) => {
    // User.findById(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(e => console.log(e));
    next()
});


app.use('/admin', adminRouters);
app.use(shopRouters);

app.use(get404);

mongoConnect(()=> {

    app.listen(port, () => {
        console.log(`Server is up on port : ${port}`)
    })
})