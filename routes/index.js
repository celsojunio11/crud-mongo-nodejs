var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.listarEmpresas((error, docs) => {
    if(error){
      return console.log(error);
    }
    res.render('index', { title: 'Lista de Empresas', dadosempresa : docs});
  })
});

/* GET novo cadastro. */
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Formulário de Cadastro',
                      dadosempresa: {"nome":"", "numero":"", "razaoSocial":""}, 
                      action: '/new'});
});

/*POST new empresa */
router.post('/new', function(req, res, next){
  var nome = req.body.nome;
  var numero = parseInt(req.body.numero);
  var razaoSocial = req.body.razaoSocial;

  global.db.inserirEmpresa({nome, numero, razaoSocial}, (error, result)=>{
    if(error){
      return console.log(error);}
      res.redirect('/');    
  })
});

/*ROTA GET retornar as informações da empresa*/
router.get('/edit/:id', function(req, res){
  var id = req.params.id;

  global.db.buscarPorId(id, (error, docs)=>{
    if(error){
      return console.log(error);
    }
    res.render('new', {title: 'Editar Empresa', dadosempresa: docs[0],
                                                action: '/edit/' + docs[0]._id});
    })
});


/* rota post EDIT*/
router.post('/edit/:id', function(req, res){
  var id = req.params.id;
  var nome = req.body.nome;
  var numero = parseInt(req.body.numero);
  var razaoSocial = req.body.razaoSocial;

  global.db.atualizarEmpresa(id, {nome, numero, razaoSocial}, (error, result) => {
    if(error){
      return console.log(error);
    }
    res.redirect('/');
  })
})

/* ROTA EXCLUIR EMPRESA*/
router.get('/delete/:id', function(req, res){
  var id = req.params.id;
  global.db.excluirEmpresa(id, (error) => { 
    if (error){
      return console.log(error);
    }res.redirect('/');
  })

})


module.exports = router;
