const express = require('express');
//ACA IMPORTO TODAS LAS RUTAS
const productsRouter = require('./productsRouter'); //llamo al archivo donde tengo la ruta de los productos
const usersRouter = require('./usersRouter');
const categoriesRouter = require("./categoriesRouter"); //Recordar llamar  al archivo

function routerApi(app) { //Recibo la app como parametro de entrada

  //Para crear una ruta padre :
  const router = express.Router();

  app.use('/api/v1',router); //ruta padre global para todos los enpoint

  //Ahora la ruta general sera /api/v1/products
  router.use('/products',productsRouter); //Aca defino el empoint, lo que va antes de las barras
  router.use('/users',usersRouter); //Defino la ruta de usuarios
  router.use('/categories',categoriesRouter); //Defino la ruta de categories
}

module.exports = routerApi; //Exporto la funcion
