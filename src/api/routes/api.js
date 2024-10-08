const express = require("express");
const router = express.Router();
const { upload } = require("../helpers/commonHelper");

// VERIFY TOKEN
const verify = require("../middleware/verifyToken");

// App_controller
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const test = require("../controllers/test");
const product = require("../controllers/product");
const product_category = require("../controllers/product_categories");
const product_brand = require("../controllers/product_brand");
const assest = require("../controllers/assest");
const cart = require("../controllers/cart");
const paymentCheckout = require("../controllers/paymentController");
const subCategories = require("../controllers/subCategories");
const service = require("../controllers/service");
const request_service = require("../controllers/request_service");
const banner = require("../controllers/banners");
const banner_for_other = require('../controllers/banners_for_others');
const zip_check = require("../controllers/zip_check");
const seller = require("../controllers/seller");
const search = require("../controllers/search");
const productImageController = require('../controllers/product_image');

// APP_VALIDATION
const userValidation = require("../validations/usersValidation");

// const passport = require("passport");

// TEST API
router.get("/test", test.get_test);
router.post("/test", test.store_test);

// AUTH API
router.post("/login", authController.login);
router.post("/register",userValidation.registerValidation,authController.register);
router.post("/refresh-token",userValidation.refreshTokenValidation,authController.refreshToken);

router.get("/", verify, (req, res) => {
  res.json({ message: "ok" });
});

// USER_API
router.get("/user", userController.get_user_list);
router.get("/user/:id", verify, userController.get_user);
router.delete("/user/:id",verify,userValidation.deleteValidation,userController.delete_user);

// PRODUCT API
router.get("/product", product.get_product);
router.get("/product/:id", product.get_product_id);
// router.get('/product/search',product.get_search);
router.get("/product/subcategory_id/:subcategory_id",product.get_subcategory_id);
router.get("/product/brands/:brand_id", product.get_product_by_brand_id);
router.post("/product", upload.single("product_image"), product.store_product);
router.put("/product/:id",upload.single("product_image"), product.update_product);
router.delete("/product/:id", product.delete_product);

// product_image_api
router.get('/product_image',productImageController.get_product);
router.get('/product_image/:id',productImageController.get_product_by_id);
router.get('/product_image/images/:product_id',productImageController.get_product_image_by_product_id);
router.post('/product_image',upload.single("image_url"),productImageController.store_product_image)
router.put('/product_image/:id',upload.single("image_url"),productImageController.update_product);
router.delete('/product_image/:id',productImageController.delete_product_image);

// SEARCH
router.get("/search", search.search_products);

// PRODUCT_CATEGORIES API
router.get("/product_categories", product_category.get_product_categories);
router.get("/product_categories/:id",product_category.get_product_category_by_id);
router.post("/product_categories",upload.single("product_category_image"),product_category.store_product_categories);
router.put("/product_categories/:id", product_category.update_product_category);
router.delete("/product_categories/:id",product_category.delete_product_category);

// PRODUCT_BRANDS API
router.get("/product_brand", product_brand.get_brand);
router.get("/product_brand/:id", product_brand.get_brand_by_id);
router.post("/product_brand",upload.single("product_image"),product_brand.store_brand);
router.put("/product_brand/:id", product_brand.update_brand);
router.delete("/product_brand/:id", product_brand.delete_brand);

// APP ASSEST
router.post("/assest", upload.single("assests"), assest.store_assest);
router.get("/assest", assest.get_assests);
router.get("/assests/:id", assest.get_single_assests);

// CART
router.post("/cart", verify, cart.store_cart);
router.get("/cart", cart.get_cart);
router.get("/cart_by_userid/:userId", verify, cart.get_by_cart_user_id);
router.get("/cart/:id", verify, cart.get_by_cart_id);
router.put("/cart/:id", cart.update_cart);
router.delete("/cart/:id", cart.delete_cart);

// Order
router.post("/checkout", paymentCheckout.checkout);
router.post("/paymentverification", paymentCheckout.paymentVerification);
router.get("/getSecreat", paymentCheckout.getPayment);
router.get("/order", paymentCheckout.get_order);

// Banners_for_other
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/auth/google/success",
//     failureRedirect: "/auth/google/failure",
//   })
// );

// subcategories
router.get("/subcategories", subCategories.get);
router.get("/subcategories/:id", subCategories.get_by_id);
router.get("/subcategories/category_name/:category_name",subCategories.get_by_category_name);
router.post("/subcategories", subCategories.store);

// SERVICE
router.post("/service", upload.single("image_of_service"), service.store);
router.get("/service", service.get);
router.get("/service/:id", service.get_by_id);
router.get("/service/service_name/:service_name", service.get_by_service_name);

// REQUEST_SERVICE
router.post("/request_service", request_service.store_request_service);
router.get("/request_service", request_service.get_request_service);
router.get("/request_service/:id", request_service.get_by_id_request_service);

// BANNERS
router.post("/banner", upload.single("banner_image"), banner.store_banners);
router.get("/banner", banner.get_banners);
router.get("/banner/:banner_category", banner.get_banners_by_banner_category);
router.get("/banner/:id", banner.get_banners_by_id);

// BANNERS_FOR_OTHERS
router.post('/banners_for_banner',upload.single("banner_image"),banner_for_other.store_banners);
router.get('/banners_for_banner',banner_for_other.get_banners);
router.get("/banners_for_banner/:banner_category", banner_for_other.get_banners_by_banner_category);
router.get('/banners_for_banner/:id',banner_for_other.get_banners_by_id);

// ZIPS
router.post("/zip-check", zip_check.store_zip);
router.get("/zip-check", zip_check.get_all_zips);
router.get("/zip-check/:zip", zip_check.check_zip_code);

// SELLLER
router.post("/seller", seller.store_seller);
router.get("/seller", seller.get_seller);
router.get("/seller/:id", seller.get_seller_by_id);

module.exports = router;
