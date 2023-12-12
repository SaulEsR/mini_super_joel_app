import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./settings/db.js";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectMongoDB();

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID),
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	// todo
} else {
	app.get("/", (req, res) => {
		res.send("API is running...");
	});
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${PORT}`
			.yellow.bold,
	);
});
