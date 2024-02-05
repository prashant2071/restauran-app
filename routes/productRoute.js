const { createProduct } = require("../controller/product/ProductController");
const isAuthenticated = require("../middleware/isAUthenticated");
const router  = require("express").Router();

router.route("/product").post( isAuthenticated,createProduct)

module.exports = router;