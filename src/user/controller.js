const express = require("express");
const { service } = require("./service");
const { checkId, checkAll } = require("./middleware");

class Controller_user {
  router = express.Router();
  constructor() {
    this.getAllData();
    this.getDataById();
    this.addData();
    this.putData();
    this.deleteData();
  }
  getAllData() {
    try {
      this.router.get("/", (req, res) => {
        const result = service.getAllData();
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  getDataById() {
    this.router.get("/:id", checkId, (req, res) => {
      try {
        const { id } = req.params;
        const result = service.getDataById(id);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  }
  addData() {
    this.router.post("/", checkAll, (req, res) => {
      try {
        const { name, surname, email, pwd } = req.body;
        const result = service.addData(name, surname, email, pwd);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  }
  putData() {
    this.router.put("/:id", checkAll, (req, res) => {
      try {
        const { id } = req.params;
        const { name, surname, email, pwd } = req.body;
        const result = service.putData(id, name, surname, email, pwd);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  }
  deleteData() {
    this.router.delete("/:id", checkAll, (req, res) => {
      try {
        const { id } = req.params;
        const result = service.deleteData(id);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  }
}

const controller_user = new Controller_user();

module.exports = controller_user.router;
