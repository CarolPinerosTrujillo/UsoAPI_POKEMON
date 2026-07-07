const prompt = require("prompt-sync")(); // configurar entrada de datos 

async function obtenerPokemon(nombre) { // EXPLORACION PARTE 1

  const url='https://pokeapi.co/api/v2/pokemon/'+nombre.toLowerCase();

  const respuesta = await fetch(url);
 
  //console.log(datos);
  //console.log(respuesta);
  //console.log(datos.types[0].type.name);
   if (!respuesta.ok) {
    console.log("No se pudo consultar el pokemon. Error:", respuesta.status);
    return null;
  }
   const datos = await respuesta.json();
   return datos;
}

module.exports = obtenerPokemon; //permite usar la funcion en otro archivo

//PASO 2 - EJERCICIO 1
/*   

async function buscarPokemon() {
  const nombre = prompt("Digita pokemon: ");
  const datos = await obtenerPokemon(nombre)
  
  if (!datos) return;

  console.log("Nombre:", datos.name);
  console.log("Altura:", datos.height);
  console.log("Peso:", datos.weight);

  // tipos
  for (let t of datos.types) {
    console.log("Tipo:", t.type.name);
  }

  // stats
  for (let s of datos.stats) {
    console.log("Stat:", s.stat.name, "-", s.base_stat);
  }

  // habilidades
  for (let a of datos.abilities) {
    console.log("Habilidad:", a.ability.name);
  }
}

*/
