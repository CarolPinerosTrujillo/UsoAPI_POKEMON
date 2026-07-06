const prompt = require("prompt-sync")(); // configurar entrada de datos 

async function obtenerPokemon() {
  const nombre = prompt("Digita pokemon: ");
  const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/'+nombre);
  const datos = await respuesta.json();
  return;
  //console.log(datos);
  //console.log(respuesta);
  
  //console.log(datos.types[0].type.name);

   if (!respuesta.ok) {
    console.log("No se pudo consultar la tasa. Código:", respuesta.status);
    return;
  }

}


async function buscarPokemon(nombre) {
  const p = await obtenerPokemon(nombre);
  console.log("Nombre:", p.name);
  console.log("Altura:", p.height);
  console.log("Peso", p.weight);
  console.log("Tipos:", p.types.map(t => t.type.name));
  console.log("Stats:", p.stats.map(s => `${s.stat.name}: ${s.base_stat}`));
  
}

obtenerPokemon();
buscarPokemon();