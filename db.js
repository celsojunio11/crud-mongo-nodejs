var conexao = require("mongodb").MongoClient;
var idEmpresa = require("mongodb").ObjectId;

conexao.connect("mongodb://localhost/empresa")
  .then(conn => global.conn = conn.db("empresa"))
  .catch(error => console.log(error))

//listar empresas
function listarEmpresas(callback) {
  global.conn.collection("dadosempresa").find({}).sort({nome: 1}).toArray(callback)
}

//função inserir
function inserirEmpresa(docEmpresa, callback) {
  global.conn.collection("dadosempresa").insert(docEmpresa, callback);
}

function buscarPorId(id, callback) {
  global.conn.collection("dadosempresa").find(new idEmpresa(id)).toArray(callback);
}
module.exports = { listarEmpresas, inserirEmpresa, buscarPorId };