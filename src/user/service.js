const fs = require("fs");

class Service {
  getAllData() {
    const json = fs.readFileSync("./src/user/library.json");
    const arr = JSON.parse(json);
    return arr;
  }
  getDataById(id) {
    const arr = this.getAllData();

    const find = arr.find((el) => el.id == id);
    if (!find) throw new Error("Нет такого ID");

    const result = arr.filter((el) => el.id == id);
    return result;
  }
  addData(name, surname, email, pwd) {
    const arr = this.getAllData();

    const findEmail = arr.find((el) => el.email == email);
    if (findEmail) throw new Error("Email уже существует");

    arr.push({ id: arr.length + 1, name, surname, email, pwd });
    fs.writeFileSync("./src/user/library.json", JSON.stringify(arr));
    return arr;
  }
  putData(id, name, surname, email, pwd) {
    const arr = this.getAllData();

    const findId = arr.find((el) => el.id == id);
    const findEmail = arr.find((el) => el.email == email);
    if (!findId) throw new Error("Нет такого ID");
    if (findEmail) throw new Error("Email уже существует");

    const result = arr.map((el) =>
      el.id == id ? { id, name, surname, email, pwd } : el
    );
    fs.writeFileSync("./src/user/library.json", JSON.stringify(result));
    return result;
  }
  deleteData(id) {
    const arr = this.getAllData();

    const findId = arr.find((el) => el.id == id);
    if (!findId) throw new Error("Нет такого ID");

    const result = arr.filter((el) => +id !== el.id);
    fs.writeFileSync("./src/user/library.json", JSON.stringify(result));
    return result;
  }
}

const service = new Service();

module.exports = { service };
