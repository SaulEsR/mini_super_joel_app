import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Usar cookies seguras solo en producción
    sameSite: 'strict', // Previene ataques CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
  });
};

export default generateToken;