const { Router } = require("express");
const {
  addProduct,
  getAllProducts,
  addToCart,
  getCartList,
  placeOrder,
} = require("../controllers/cartController");
const router = Router();

router.post("/add-product", addProduct);
router.get("/products", getAllProducts);
router.post("/add-to-cart", addToCart);
router.get("/cart", getCartList);
router.post("/place-order", placeOrder);

module.exports = router;
