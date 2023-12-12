import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	const Cg = req.query.Cg;
	const filter = req.query.filter;
	const from = req.query.from;
	const to = req.query.to;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
			}
		: {};

	if (Cg) {
		const products = await Product.find({ category: Cg });
		res.json(products);
	} else if (filter) {
		switch (filter) {
			case "Rating":
				const productsByRating = await Product.find({}).sort("-rating").exec();
				res.json(productsByRating);

				break;

			case "date":
				const productsByDate = await Product.find({}).sort("createdAt").exec();
				res.json(productsByDate);

				break;

			case "highprice":
				const productsByHighPrice = await Product.find({}).sort("price");
				res.json(productsByHighPrice);

				break;

			case "lowprice":
				const productsByLowPrice = await Product.find({}).sort("-price").exec();
				res.json(productsByLowPrice);

				break;

			default:
				break;
		}
	} else if (from && to) {
		const productsByPrice = await Product.find({
			price: { $lte: to },
			price: { $gte: from },
		});
		res.json(productsByPrice);
	} else {
		const products = await Product.find({ ...keyword });
		res.json(products);
	}
});

// @desc Obtener un solo producto
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Producto no encontrado");
	}
});

// @desc   Eliminar un producto
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: "Producto eliminado" });
	} else {
		res.status(404);
		throw new Error("Producto no encontrado");
	}
});
// @desc   Crear un producto
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		description: "sample description",
		user: req.user._id,
		sizes: [],
		images: [
			"https://i.imgur.com/QN2BSdJ.jpg",
			"https://i.imgur.com/QN2BSdJ.jpg",
			"https://i.imgur.com/QN2BSdJ.jpg",
		],
		category: [],
		countInStock: 0,
		numReviews: 0,
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc   Actualizar un producto
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, category, sizes, Images, countInStock } =
		req.body;
	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.category = category;
		product.sizes = sizes;
		product.images = Images;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Producto no encontrado");
	}
});

// @desc   Crear una nueva reseña
// @route  POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString(),
		);
		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Producto ya reseñado");
		}
		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Reseña agregada" });
	} else {
		res.status(404);
		throw new Error("Producto no encontrado");
	}
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
};
