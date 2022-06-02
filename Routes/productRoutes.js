const auth = require("../Middleware/auth")
const router = require("express").Router();
const productController = require("../Controller/productCtrl")

router.route("/")
    .post(auth,productController.uploadProduct)   // to upload products
    .get(auth,productController.getProducts)      // to get product lists

module.exports = router;