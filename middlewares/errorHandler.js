
//Midleware que se encargara de los errores
function logErrors(error,req,res,next){

  console.log("Log errores")

  console.error();
  next(error);

}

function errorHandler(error,req,res,next) {

  //Aca yo ya no quiero seguir al siguiente midleware, si hay un error que sea el punto final
  console.log("Error handler");
  res.status(500).json({
    message:error.message,
    stack:error.stack,
})

}

//Debemos identificar si el error es de la libreria boom: Creamos un middleware

function boomErrorHandler(error,req,res,next) {
  if(error.isBoom) { //es un error de tipo boom

    const {output} = error;
    res.status(output.statusCode).json(output.payload);

  }
  else{
  next(error); //Para que no siga al siguiente middleware si hay un error
  }

}

module.exports = {logErrors,errorHandler,boomErrorHandler}; //Exportamos la funcion
