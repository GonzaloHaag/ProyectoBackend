const express = require("express");

//const {faker} = require('@faker-js/faker'); //Traemos la dependencia faker


const ProductsService = require('../services/productService'); //Traigo el archivo

//Treaermos el middleware que valida los datos

const validatorHandler = require('../middlewares/validatorHandler');

//Ahora me traigo todos los esquemas que tengo, para crear, actualizar..

const {createProductEsquema,updateProductEsquema,getProductEsquema} = require('../esquemas/productEsquema');

const router = express.Router(); //Creamos un router propio
const service = new ProductsService(); //Creo una instancia de ese servicio

//Ahora va router.get y products lo va a manejar otra parte del codigo

router.get('/', async (req,res)=>{
  //res.json("Productos"); //Comunicamos datos en formato json(una api) porque enviaremos un obejeto

  const products = await service.find(); //El metodo find obtiene todos los servicios que esten alli
  res.json(products); //Como respuesta devolvemos el array de productos

});
/*
Ahora si podemos hacer esta ruta porque esta antes del/products/:id
no tomara el filter como un parametro porque esta antes, recordar
que funciona en cascada --> NO COMETER ESTE ERROR
*/
router.get('/filter',(req,res)=>{
  res.send("Yo soy un filter");
});



//Solo ponemos lo que va despues de /products

router.get('/:id',

/* Ahora al tener un middleware que valida datos, antes de pasar los
parametros quiero que corra la validacion de datos
*/

validatorHandler(getProductEsquema,'params'), //Le paso getProduct porque es un id, y de params vendra ese id

async (req,res,next)=>{ //Quiero un producto con un determinado id(le paso el metodo get)

 try{
  const {id} = req.params;

  //Como tengo un async, es una promesa, por lo que debe ir un await

  const product = await service.findOne(id); //Recordar que el findOne hace un filtrado por id

  //Ahora cuando le pase el id de producto por ruta, me traera ese objeto como tal

  res.json(product);

 }
 catch(error){
  next(error);
 }


  }
  );







/*app.get('/products/filter',(req,res)=>{ //ESTO NO SE HACE, PORQUE TOMARA A FILTER COMO UN PARAMETRO ID
  res.send("Yo soy un filter");
}) */

//METODO PARA RECIBIR AL POST(desde insomnia)

router.post('/',

/*
Ahora vamos a validar el create product, necesito un precio, nombre para poder
crearlo, y esa informacion viene en el BODY por eso lo ponemos.
Antes puse params porque el ID viene ahi, ahora es body
*/


 validatorHandler(createProductEsquema,'body'), //Obtiene la info


  async (req,res)=>{ //Metodo que crea un producto
  const body = req.body; //Quiero TODO
  const newProduct = await service.create(body); //Creamos:Aca mando el newProduct y le paso el body


  //Ahora al crear un nuevo producto se agregara al array de productos

  res.status(201).json(newProduct); //El 201 representa un status code,quiere decir que se creo correctamente

});


//METODO PARA RECIBIR EL PATCH(Actualizar parcialmente un producto)

router.patch('/:id',

//En este caso tenemos q validar algo que viene del body y de params:

validatorHandler(getProductEsquema,'params'), //Primero que cumpla con el ID
validatorHandler(updateProductEsquema,'body'), //Luego con lo otro


  async (req,res,next)=>{ //Le pasamos el id del producto que queremos editar

  try{ //Si todo esta bien
  const {id} = req.params;
  const body = req.body;
  const product = await service.update(id,body); //Actualizamos

  res.json(product);
  }
  catch(error){ //Si hay un error

    next(error);
  }


});

//METODO PARA RECIBIR EL DELETE(Borrar producto)

router.delete('/:id', async (req,res)=>{
  const{id} = req.params;
  const respuesta = await service.delete(id,body); //Funcion para borrar

  res.json(respuesta);
})


module.exports = router; //Para exportar el router
