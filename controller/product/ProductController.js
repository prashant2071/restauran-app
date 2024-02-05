const Products = require("../../model/productModel");
exports.createProduct = async (req, res) => {
  const { name, description, stockQty, price, status } = req.body;
  if (!name || !description || !stockQty || !price || !status) {
    return res.status(400).json({
      message: "please provide name,description,stockQty,price,status",
    });
  }
 const product =  await Products.create({
    name,
    description,
    stockQty,
    price,
    status,
  });
  res.status(200).json({
    data:product,
    message:"product created successfully"
  })
};

