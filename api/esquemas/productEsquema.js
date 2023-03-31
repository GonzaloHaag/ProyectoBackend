//Validaremos datos que me esten enviando desde el cliente


const Joi = require('joi'); //Llamo a la libreria

const id = Joi.string().uuid(); //Especificamos que es un string

/*
El nombre es un string, y pondremos que tiene que ser alfanumerico,
y que tiene que tener minimo 3 caracteres y maximo 15
*/
//const nombre = Joi.string().alphanum().min(3).max(15); //El espacio no es aceptado en el nombre

const nombre = Joi.string().min(3).max(15);
const precio = Joi.number().integer().min(10);//Es numero entero, minimo 10 dolares

const imagen = Joi.string().uri(); //Que es un string y sea una URL

//Esquema para la creacion, el que une todos los campos

const createProductEsquema = Joi.object({

  //Para crear un producto debo ponerle nombre y precio sino saldra error
  nombre : nombre.required(), //Que sea requerido
  precio : precio.required(),
  imagen : imagen.required(), //imagen requerida para crear un producto

});

//Esquema para la actualizacion del producto

const updateProductEsquema = Joi.object({
  nombre : nombre,
  precio : precio,
  imagen : imagen,
});

const getProductEsquema = Joi.object({
    id: id.required(), //Es requerido el id

})
module.exports = {createProductEsquema,updateProductEsquema,getProductEsquema}

