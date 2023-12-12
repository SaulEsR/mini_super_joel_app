import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Autenticar usuario y obtener token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Email o contraseña incorrectos");
	}
});

// @desc    Registrar un nuevo usuario
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error("El usuario ya existe");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Datos de usuario invalidos");
	}
});

// @desc    Obtener perfil de usuario
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("Usuario no encontrado");
	}
});

// @desc    Actualizar perfil de usuario
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password || user.password;
		}

		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("Usuario no encontrado");
	}
});

// @desc    Actualizar usuario
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("Usuario no encontrado");
	}
});

// @desc    Obtener todos los usuarios
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

// @desc    Obtener usuario por ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("Usuario no encontrado");
	}
});

// @desc    Eliminar usuario
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.json({ message: "Usuario eliminado" });
	} else {
		res.status(404);
		throw new Error("Usuario no encontrado");
	}
});

export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};