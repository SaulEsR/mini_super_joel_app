import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectMongoDB from "./settings/db.js";
import productsData from "./data/product.js";
import UsersData from "./data/user.js";

dotenv.config();
connectMongoDB();

const importData = async () => {
	try {
		// Vaciar todos los modelos
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		// Todos los datos de los modelos
		// Seleccionar a todos los usuarios
		const createUsers = await User.insertMany(UsersData);
		// Seleccionar al administrador
		const adminUser = createUsers[0]._id;
		// Agregar el administrador a todos los productos
		const sampleProducts = productsData.map((product) => {
			return { ...product, user: adminUser };
		});
		// Insertar todos los productos al modelo
		await Product.insertMany(sampleProducts);
		console.log("Datos importados!".green.inverse);
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		// Vaciar todos los modelos
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Datos destruidos!".red.inverse);
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

// node src-api/seeder -d
if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
