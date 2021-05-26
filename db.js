var conexao = require("mongodb").MongoClient;
var idEmpresa = require("mongodb").ObjectId;

conexao.connect("mongodb://localhost/empresa")
    .then(conn => global.conn = conn.db("empresa"))
    .catch(error => console.log(error))

function listarEmpresas(callback) {
    global.conn.collection("dadosempresa").find({}).sort({ nome: 1 }).toArray(callback);
}

function inserirEmpresa(docEmpresa, callback) {
    global.conn.collection("dadosempresa").insert(docEmpresa, callback);
}

function buscarPorId(id, callback) {
    global.conn.collection("dadosempresa").find(new idEmpresa(id)).toArray(callback);
}

function atualizarEmpresa(id, docEmpresa, callback) {
    global.conn.collection("dadosempresa")
        .updateOne({ _id: new idEmpresa(id) },
            {
                $set: {
                    nome: docEmpresa.nome,
                    numero: docEmpresa.numero,
                    razaoSocial: docEmpresa.razaoSocial
                }
            }, callback);
}

function excluirEmpresa(id, callback){
    global.conn.collection("dadosempresa").deleteOne({_id: new idEmpresa(id)}, callback);
}

module.exports = { listarEmpresas, inserirEmpresa, buscarPorId, atualizarEmpresa, excluirEmpresa };