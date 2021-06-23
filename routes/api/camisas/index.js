const express = require('express');
const router = express.Router();
const {
  getAll,
  addOne,
  addAny,
  getById,
  getByVentas,
  getByVentasWithOperator,
  getByVentasRange
} = require('./camisas.model');

router.get(
  "/",
  async (req, res)=>{
    try{
      let rows = await getAll();
      res.status(200).json(rows);
    }catch(ex){
      res.status(500).json({"msg":"Error"});
    }
  }
);

router.get(
  "/byid/:id",
  async (req, res)=>{
    try{
      let {id} = req.params;
      let row = await getById(id);
      res.status(200).json(row);
    }catch(ex){
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/byventas/:ventas",
  async (req, res) => {
    try {
      let { ventas } = req.params;
      let _ventas = parseInt(ventas);
      let rows = await getByVentas(_ventas);
      res.status(200).json(rows);
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/byventas/:operator/:ventas",
  async (req, res) => {
    try {
      let { ventas, operator } = req.params;
      let _ventas = parseInt(ventas);
      let rows = await getByVentasWithOperator(_ventas, operator);
      res.status(200).json(rows);
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.get(
  "/byventas/range/:ll/:ul/:ex",
  async (req, res) => {
    try {
      let { ll, ul, ex } = req.params;
      let _ll = parseInt(ll);
      let _ul = parseInt(ul);
      let _ex = parseInt(ex) && true;
      let rows = await getByVentasRange(_ll, _ul, _ex);
      res.status(200).json(rows);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.post(
  "/new",
  async (req, res)=>{
    try{
      let {moda, tipo, precio} = req.body;
      let docInserted = await addOne(moda, tipo, precio, ventas);
      res.status(200).json(docInserted);
    }catch(ex){
      res.status(500).json({"msg":"Error"});
    }
  }
);

router.post(
  "/any",
  async (req, res) => {
    try {
      let document = req.body;
      let docInserted = await addAny(document);
      res.status(200).json(docInserted);
    } catch (ex) {
      res.status(500).json({ "msg": "Error" });
    }
  }
);



module.exports = router;
