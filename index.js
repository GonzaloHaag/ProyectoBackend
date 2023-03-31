console.log("Mi app");

const express = require('express'); //Traemos a express

const routerApi = require('./routes'); //Traigo la carpeta routes

const {faker} = require('@faker-js/faker'); //Traemos la dependencia faker

const{logErrors,errorHandler,boomErrorHandler} = require('./middlewares/errorHandler')

const cors = require('cors'); //Llamamos la libreria cors

const app = express(); //Creamos nuestra app

const puerto = 3000; //Puerto donde queremos que corra nuestra app

//Para que desde insomnia me lea el cuerpo de lo que pido al hacer POST

app.use(express.json()); //Ahora ya podremos recibir informacion de tipo json en el insomnia al hacer POST

const whiteList = ['http://127.0.0.1:5500','https://myapp.com'] //Origines donde SI quiero recibir peticiones
//El primero es el puerto que abro en mi index.html de front end en el live server
const options = {
  origin : (origin,callback) => {
    if(whiteList.includes(origin)) { //Si ese origen esta incluido en mi lista(dominios que tendran acceso) hago algo

      callback(null,true); //Que no hay ningun error y el acceso esta permitido(true)

    }
    else{
      callback(new Error("No permitido"));
    }
  }
}
app.use(cors(options)); //Le paso las opciones para que tengan acceso solo lo que yo elijo


//app.use(cors()); //Habilito cualquier dominio a usar cors y no solo su Origen



app.get('/',(req,res)=>{ //ruta('/' -> ruta por defecto), tenemos dos parametros(req,res)

    //Res es la respuesta que le doy a mi cliente

    res.send("Hola mi server en express"); //Lo que aparecera en la pagina

});
app.get('/nueva-ruta',(req,res)=>{
  res.send("Hola, soy una nueva ruta"); //DIRA ESTO AL PONER /nueva-ruta
})
routerApi(app);


//Los middlewares de tipo error se deben definir despues del router

//Que use los dos middleware-> El orden sera como se ejecuten
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



//QUERY PARAMS PARA FILTRADO

// app.get('/users',(req,res)=>{ //creamos nueva ruta
//   const {limit,offset} = req.query; //cambiamos el params por el query

//   if(limit && offset){ //Si existe limit y offset como parametros
//    // http://localhost:3000/users?limit=10&offset=200 tomara limit 10 y offset 200
//     res.json({
//       limit,
//       offset
//     });
//  }
//   else{

//       res.send("No hay parametros");

//   }
// })


// //Ahora quiero los productos que pertenecen a esa categoria
// app.get('/categories/:categoryId/products/:productsId',(req,res)=>{

//   const {categoryId,productsId} = req.params;

//   res.json({
//     categoryId, //guarda lo q ingrese en la ruta como categoryId
//     productsId, //lo mismo aca
//   });

// })





app.listen(puerto,()=>{ //Le estamos diciendo a nuestra app que debe escuchar un puerto en especifico

    console.log("Esta corriendo en el puerto correcto: " + puerto);

});
