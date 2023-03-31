const express = require("express");

const {faker} = require('@faker-js/faker'); //Traemos la dependencia faker
const { route } = require("./productsRouter"); //llamo a la funcion route

const router = express.Router(); //Creamos un router propio

//QUERY PARAMS PARA FILTRADO

router.get('/',(req,res)=>{ //creamos nueva ruta
  const {limit,offset} = req.query; //cambiamos el params por el query

  if(limit && offset){ //Si existe limit y offset como parametros
   // http://localhost:3000/users?limit=10&offset=200 tomara limit 10 y offset 200
    res.json({
      limit,
      offset
    });
 }
  else{

      res.send("No hay parametros");

  }
})

module.exports = router;
