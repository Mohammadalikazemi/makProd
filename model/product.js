const getDb = require('../utils/database').getDb;
const {
    ObjectID
} = require('mongodb')
class Product {
    constructor(title, price, descriptins, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.descriptins = descriptins;
        this.imageUrl = imageUrl;
        this._id = new ObjectID(id)
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('products').updateOne({
                _id: this._id
            }, {
                $set:this
            })
        } else {
            dbOp = db.collection('products').insertOne(this)
        }
        return dbOp
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }
    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray().then(products => {
            console.log(products);
            return products;
        }).catch(e => console.log(e))
    }
    static findById(prodId) {
        const db = getDb();
        return db.
        collection('products')
            .find({
                _id: new ObjectID(prodId)
            })
            .next()
            .then(product => {
                console.log(product)
                return product;
            })
            .catch(err => {
                console.log(err)
            })
    }
}
module.exports = Product;