const prompt = require("prompt-sync")(); // configurar entrada de datos 

async function obtenerPokemon() {
  const nombre = prompt("Digita pokemon: ");
  
  //encapsular funcion
  const url='https://pokeapi.co/api/v2/pokemon/'+nombre

  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  //console.log(datos);
  //console.log(respuesta);
  //console.log(datos.types[0].type.name);
   if (!respuesta.ok) {
    console.log("No se pudo consultar el pokemon. Código:", respuesta.status);
    return null;
  }
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

obtenerPokemon() 




async function buscarPokemon() {

  const pokemonLeido = obtenerPokemon(nombre)
  return 



}

//buscarPokemon();

// async function buscarPokemon(nombre) {
//   const p = await obtenerPokemon(nombre);
//   console.log("Nombre:", p.name);
//   console.log("Altura:", p.height);
//   console.log("Peso", p.weight);
//   console.log("Tipos:", p.types.map(t => t.type.name));
//   console.log("Stats:", p.stats.map(s => `${s.stat.name}: ${s.base_stat}`));
  
// }



//obtenerPokemon();