var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  global.db.listarEmpresas((error, docs) => {
    if (error) {
      return console.log(error);
    }
    res.render('index', { title: 'Lista de Empresas', dadosempresa: docs });
  })

});

/* GET novo cadastro */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'Formulario de Cadastro',
                    dadosempresa: {"nome": "", "numero":""},
                    action: '/new' });
});

/* POST nova empresa */

router.post('/new', function (req, res, next) {
  var nome = req.body.nome;
  var numero = req.body.numero;
  global.db.inserirEmpresa({ nome, numero }, (error, result) => {
    if (error) {
      return console.log(error);
    }
    res.redirect('/');
  })
});

/*ROTA GET retornar as informaçoes da empresa*/

router.get('/edit/:id', function (req, res) {
  var id = req.params.id;

  global.db.buscarPorId(id, (error, docs) => {
    if (error) {
      return console.log(error);
    }
    res.render('new', {title: 'Editar Empresa', dadosempresa: docs[0], action: '/edit'+ docs[0]._id});
  })

});


module.exports = router;
