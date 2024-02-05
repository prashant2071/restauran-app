const Products = require("../../model/productModel");
exports.createProduct = async (req, res) => {
  const { name, description, stockQty, price, status } = req.body;
  if (!name || !description || !stockQty || !price || !status) {
    return res.status(400).json({
      message: "please provide name,description,stockQty,price,status",
    });
  }
  await Products.create({
    name,
    description,
    stockQty,
    price,
    status,
  });
};
