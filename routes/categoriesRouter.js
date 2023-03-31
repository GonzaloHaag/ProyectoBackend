const express = require("express");
const {faker} = require('@faker-js/faker');
const { route } = require("./productsRouter");

const router = express.Router(); //Creamos un router propio

//Ahora quiero los productos que pertenecen a esa categoria
router.get('/:categoryId/products/:productsId',(req,res)=>{

  const {categoryId,productsId} = req.params;

  res.json({
    categoryId, //guarda lo q ingrese en la ruta como categoryId
    productsId, //lo mismo aca
  });

})


module.exports = router;
