const MongoDB = require('../../utilities/db');
const ObjectId = require('mongodb').ObjectID;
let db;
let camisasCollection;

//se ejecuta cuando se manda a require(este archivo)
(async function(){
    try{
      if (!camisasCollection) {
        db = await MongoDB.getDB();
        camisasCollection = db.collection("camisas");
        if(process.env.ENSURE_INDEX == 1){
          // Vamos a asegurarnos de que exista el indice
        }
      }
    }catch(ex){
      console.log(ex);
      process.exit(1);
    }
})();

module.exports.getAll = async ()=>{
  try {
    let docsCursor = camisasCollection.find({});
    let rows = await docsCursor.toArray()
    return rows;
  } catch(ex){
    console.log(ex);
    throw(ex);
  }
}

module.exports.getById = async (id)=>{
  try {
    const _id = new ObjectId(id);
    const filter =  {_id: _id};
    let row = await camisasCollection.findOne(filter);
    return row;
  } catch(ex){
    console.log(ex);
    throw(ex);
  }
}

module.exports.getByVentas = async (ventas)=>{
  try{
    const filter = {ventas:ventas};
    let cursor = camisasCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  }catch(ex){
    console.log(ex);
    throw (ex);
  }
}

module.exports.getByVentasWithOperator = async (ventas, operator) => {
  try {
    let mongoOperator = {};
    switch(operator){
      case "gt":
        mongoOperator["$gt"] = ventas;
       break;
      case "lt":
        mongoOperator["$lt"] = ventas;
        break;
      case "gte":
        mongoOperator["$gte"] = ventas;
        break;
      case "lte":
        mongoOperator["$lte"] = ventas;
        break;
      default:
        mongoOperator = ventas;
        break;
    }
    const filter = { ventas: mongoOperator };
    let cursor = camisasCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.getByVentasRange = async (lowerLimit, upperLimit, includeExtremes) => {
  try {
    const range = (includeExtremes) ? 
        {"$gte":lowerLimit, "$lte":upperLimit} :
        {"$gt":lowerLimit, "$lt":upperLimit}
    ;
    const filter = { ventas: range };
    let cursor = camisasCollection.find(filter);
    let rows = await cursor.toArray();
    return rows;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

module.exports.addOne = async (moda, tipo, precio, ventas)=>{
  try{
    let newcamisas = {
      moda:moda,
      tipo:tipo,
      precio:precio,
      ventas:ventas

    };
    let result = await camisasCollection.insertOne(newcamisas);
    return result.ops;
  }catch(ex){
    console.log(ex);
    throw(ex);
  }

}

module.exports.addAny = async (document) => {
  try {
    let result = await camisasCollection.insertOne(document);
    return result.ops;
  } catch (ex) {
    console.log(ex);
    throw (ex);
  }
}

//   _id: ObjectID("afasdasdccasb102938")

// Operadores en Mongodb son distintos

/*
Select * from snippets where sales = 3;

db.snippets.find({sales:3});


select * from snippets where sales > 50; greater than 
select * from snippets where sales < 50; less than
select * from snippets where sales >= 80; greater than or equal
select * from snippets where sales <= 40;

db.snippets.find({sales: {$gt : 50} })
db.snippets.find({sales: {$lt : 50} })
db.snippets.find({sales: {$gte : 80} })
db.snippets.find({sales: {$lte : 40} })

select * from snippets where sales > 20 and sales < 30;

db.snippets.find({sales : {$gt:20, $lt:30} });

*/
