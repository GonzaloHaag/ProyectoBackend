//Midleware que validara los datos de productEsquema

/*
Este middleware sera dinamico, por lo que por parametro debe recibir
el esquema a validad y la propiedad

*/

const boom = require('@hapi/boom');

function validatorHandler(esquema,propiedad) {
  return (req,res,next) => { //Va a retornar un middleware, de forma DINAMICA

    const data = req[propiedad]; //De forma dinamica vamos a saber si la informacion esta en el body,params o query
    const {error} = esquema.validate(data,{abortEarly:false}); //Que valide la data que me estan enviando

    /*
    Al poner abortEarly:false , significa que me dira todos los errores
    que tiene el cliente si hizo, y no uno por uno en cascada

    */
    if(error){ //Si hay error
       next(boom.badRequest(error)); //El pedido se hizo de forma incorrecta
    }
    next(); //Si no hay error que siga

  }
}

module.exports = validatorHandler; //PARA EXPORTARLO
