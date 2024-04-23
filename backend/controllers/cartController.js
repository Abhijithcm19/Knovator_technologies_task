const ProductModel = require("../models/ProductSchema.js");
const CartModel = require("../models/cartItemSchema .js");
const Order = require("../models/orderSchema.js");

const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const product = new ProductModel({
      name,
      description,
      price,
      image,
    });

    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cartItem = await CartModel.findOne({ productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.totalAmount += product.price * quantity;
    } else {
      const totalAmount = product.price * quantity;
      cartItem = new CartModel({
        productId,
        quantity,
        totalAmount,
      });
    }

    await cartItem.save();

    res
      .status(201)
      .json({ message: "Product added to cart successfully", cartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCartList = async (req, res) => {
  try {
    const cartItems = await CartModel.find().populate("productId");

    const allTotalAmount = cartItems.reduce((total, item) => total + item.totalAmount, 0);

    res.status(200).json({ cartItems, allTotalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { firstName, lastName, address, totalAmount } = req.body; 

    const cartItems = await CartModel.find().populate("productId");

    const order = new Order({
      firstName,
      lastName,
      address,
      products: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount, 
    });

    await order.save();

    await CartModel.deleteMany();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addProduct,
  getAllProducts,
  addToCart,
  getCartList,
  placeOrder,
};
