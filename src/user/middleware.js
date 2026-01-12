const { service } = require("./service");

function checkId(req, res, next) {
  const { id } = req.params;
  if (isNaN(id)) throw new Error(`ID  - не число`);
  next();
}
function checkAll(req, res, next) {
  const { name, surname, email, pwd } = req.body;
  if (typeof name !== "string") throw new Error(`Name не строка`);
  if (typeof surname !== "string") throw new Error(`Surname не строка`);
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
    throw new Error(`Email не валид`);
  if (pwd.length < 8) throw new Error("Пароль меньше 8 символов");

  next();
}

module.exports = { checkId, checkAll };
