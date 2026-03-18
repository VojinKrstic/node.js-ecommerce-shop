const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const { check, body } = require("express-validator");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// // // /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post(
  "/add-product",
  [
    body(
      "title",
      "Title should only containt alphanumeric characters and it must be 3 characters long",
    )
      .isAlphanumeric()
      .isLength({ min: 3 })
      .trim(),
    body("price", "Please add price in decimal numbers").isFloat(),
    body("description", "Description must be at least 5 characters long")
      .isLength({ min: 5 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct,
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body(
      "title",
      "Title should only containt alphanumeric characters and it must be 3 characters long",
    )
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price", "Please add price in decimal numbers").isFloat(),
    body("description", "Description must be at least 5 characters long")
      .isLength({ min: 5 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct,
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
