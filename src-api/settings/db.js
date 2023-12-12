// import mongoose from "mongoose";
// import colors from "colors";
// import dotenv from "dotenv";

// const connectMongoDB = async () => {
// 	try {
// 		const conn = await mongoose.connect(process.env.MONGO_URI);

// 		console.log(`MongoDB Conectado: ${conn.connection.host}`.cyan.underline);
// 	} catch (error) {
// 		console.error(`Error: ${error.message}`.red.underline.bold);
// 		process.exit(1);
// 	}
// };

// export default connectMongoDB;

import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const uri = process.env.MONGO_URI;

const connectMongoDB = async () => {
	try {
		const conection = await mongoose.connect(uri, {});
		console.log(
			`MongoDB Conectado: ${conection.connection.host}`.cyan.underline,
		);
	} catch (error) {
		console.log(`Error: ${error.message}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectMongoDB;
