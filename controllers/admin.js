const Product = require('../model/product');


exports.getAddProducts = (req,res,next)=>{
    res.render('admin/edit-product', {
        pageTitle: "Adding Products",
        path: '/admin/add-product',
        editing: false
    });
}
exports.postAddProducts = (req,res,next)=>{
    const {
        title,
        imageUrl,
        descriptions,
        price
    } = req.body;
    const product = new Product(title,price,descriptions,imageUrl,null);
    product
        .save()
        .then(result =>{
            console.log('Created this item in product');
            res.redirect('/admin/products');
        })
        .catch(e=>console.log(e))
}

exports.getProducts = (req, res, next) => {
    
    Product.fetchAll()
        .then(Products=>{
            res.render('admin/products', {
                pageTitle: "Admin Products",
                path: "/admin/products",
                prods: Products
            });
        })
        .catch(e=>console.log(e));
}

exports.getEditProducts = (req,res,next)=>{
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    console.log('Produ idd ::::::::: ',prodId)
    Product.findById(prodId)
        .then(product=>{
            if(!product){
                return res.redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: "Edit Product",
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(e => console.log(e));
}
exports.postEditProducts = (req, res, next) => {

    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.descriptions;
    const product = new Product(updatedTitle,updatedPrice,updatedDesc,updatedImageUrl,prodId)
        product.save()
            .then(result=>{
                console.log("Updated Product Id : ",prodId)
                res.redirect('/admin/products')
            })
            .catch(e => console.log(e));
        
}
// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;

//     req.user.getProducts({
//         where:{
//             id:prodId
//         }
//     })
//     .then(products=>{
//         console.log(products[0])
//         return products[0].destroy()
//     })
//     .then(result=>{
//         console.log("**** Destroyed Products ****");
//         res.redirect('/admin/products');
//     })
//     .catch(e => console.log(e));


// }