const {faker} = require('@faker-js/faker');

//Llamamos a la libreria BOOM

const boom = require('@hapi/boom');

//Programacion orientada a objetos

class ProductsService {

  constructor() {
    this.products = []; //array que arranca vacio
    this.generate(); //Cada vez que arranquemos una instancia del servicio quiero generar esos 100 productos


  }

  async generate() { //generamos los productos


    const limit = 100; //que sean 100 productos

    /*
    http://localhost:3000/products?size=1 ---> Generara solo 1 producto
    */

    for(let i=0;i<limit;i++){ //Los productos a mostrar seran los que vengan como parametro en limit
      this.products.push({
        id:faker.datatype.uuid(), //genera un ID random
        name:faker.commerce.productName(),
        price:parseInt(faker.commerce.price(),10), //Que lo convierta a entero en base 10
        image:faker.image.imageUrl(),
        isBlock:faker.datatype.boolean() //Producto bloqueado arroja true o false
      });

  }
}

  //Aqui definimos toda la logica, interacciones que tendran nuestros datos

  async create(data) { //Funcion para crear producto

    const newProduct = {
      id:faker.datatype.uuid(), //genera un ID random

      //el cliente por medio de insomnia deberia darnos precio nombre y image
      ...data //Con esto obtengo la info del cliente

    }
    //Ahora al crear un producto, se agregara al array de productos

    this.products.push(newProduct); //Para agregar el producto al array
    return newProduct;
  }

  find() { //Buscar productos

    return new Promise((resolve,reject)=>{
      setTimeout(()=>{

        resolve(this.products); //Mostrara la informacion luego de 5 segundos

      },2000); //Esto va a demorar 2 segundos
    })

    return this.products; //Retorno la lista de productos

  }

  async findOne(id){ //Buscar solo un producto por id

    const product =  this.products.find(item=>item.id===id); //Filtrado de arays, los que coincidan con ese id
    if(!product) { //Si no encuentra el producto
      throw boom.notFound('Producto no encontrado');
    }
    if(product.isBlock) { //Ahora tengo que ver encuentra el producto pero  si el producto esta bloqueado

      throw boom.conflict('Producto bloqueado'); //Conflicto


    }
    return product;

  }
  async update(id,cambios) { //Actualizar producto, con id porque es un producto en especifico
    //tambien recibo los cambios que quiero hacerle a ese producto


    //Primero quiero saber en que posicion del array esta el producto
    const posicion = this.products.findIndex(item=>item.id===id);

    if(posicion === -1) { //Si no existe en el array

      throw boom.notFound('Producto no encontrado'); //Uso de la libreria boom

    }
    const product = this.products[posicion];
    this.products[posicion] = {
      //Para que el objeto siga completo y solo se modifique lo que yo especifico debemos hacer lo siguiente:

      //Esto se hara con el update parcialmente en insomnia
      ...product,
      ...cambios
    }
    return this.products[posicion];

}
  async delete(id) { //Borrar producto

    const posicion = this.products.findIndex(item=> item.id === id);

    if(posicion === -1) {

     throw boom.notFound('Producto no encontrado');

    }
    this.products.splice(posicion,1); //El splice lo que hace es eliminar, se le pasan dos parametros(posicionAEliminar,cuantas a partir de esa)
    //el 1 eliminara justo esa posicion

    return {id}; //Retornamos el id del producto que se elimino

  }

}

module.exports = ProductsService;
