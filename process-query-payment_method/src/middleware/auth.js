module.exports = function (req, res, next) {
  // Leer el token del header
  const token = req.header("x-auth-token");

  console.log("token", token);
  // Revisar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay Token, permiso no válido" });
  }

  // validar el token

  try {
    req.usuario = token;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
