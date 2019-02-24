var express = require('express')
var router = express.Router()
const { productController, loginController } = require('../controllers');

router.get('/getproduct', productController.getProductJoin);
router.post('/user', loginController.user);
router.get('/keeplogin', loginController.keeplogin)
router.get('/productdetail', productController.productdetail);
router.post('/register', loginController.register);
router.post('/verified', loginController.verified);
// admin
// router.get('/allproduct', productController.allProduct);
router.get('/listproduct', productController.getProduct);
router.get('/listcategories', productController.getCategories);
router.get('/listvarian', productController.getVarian);
// join product tampilin admin
router.delete('/deletejoinproduct/:id', productController.deleteJoinProduct);
router.put('/editjoinproduct/:id', productController.editJoinProduct);
router.post('/addjoinproduct', productController.addJoinProduct);
router.get('/getjoinproduct', productController.getJoinProduct)
// manage product sebelum di join 
router.get('/getproducts', productController.listProducts)
router.delete('/deleteproduct/:id', productController.deleteProduct);
router.put('/editproduct/:id', productController.editProduct);
router.post('/addproduct', productController.addProduct)

module.exports = router;