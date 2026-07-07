const prompt = require("prompt-sync")();
const obtenerPokemon = require("./explorar");

/* PARTE 2- IMPRESION NOMBRE ALTURA PESO Y TIPOS DEL POKEMON
async function buscarPokemon() {
  const nombre = prompt("Digita pokemon: ");

  const datos = await obtenerPokemon(nombre);

  if (!datos) return;

  console.log("Nombre:", datos.name);
  console.log("Altura:", datos.height);
  console.log("Peso:", datos.weight);

  for (let t of datos.types) {
    console.log("Tipo:", t.type.name);
  }
}

buscarPokemon();
*/

async function buscarPokemon() {
  const nombre = prompt("Digita pokemon: ");

  const datos = await obtenerPokemon(nombre); 
  mostrarFicha(datos);  
  }

//buscarPokemon();  // LLAMO A MOSTRAR FICHA 

//PARTE 3 MOSTRAR FICHA POKEMON
function mostrarFicha(datos) {
// validar si datos es null
  if (!datos) {
    console.log("No hay nada que mostrar");  //valiacion que datos sea un valor correcto
    return;
  }
 console.log("<===========================>")
  console.log("Nombre:", datos.name.toUpperCase()); //nombre en mayuscula
  console.log("Pokédex:", datos.id); // ID pokedex

  const tipos = datos.types.map(t => t.type.name); //transformacion de array types
  console.log("Tipos:", tipos.join(" / ")); // impresion y uso de JOIN

  console.log("Altura:", datos.height * 10, "cm"); //impresion y conversion altura
  console.log("Peso:", datos.weight / 10, "kg");  //impresion y conversion peso

  console.log("<===========================>")
  console.log("Stats:");
  for (let s of datos.stats) {
    console.log("-", s.stat.name, ":", s.base_stat); //impresion estados
  }
  console.log("<===========================>")
  console.log("Habilidades:");
  for (let a of datos.abilities) {
    let nombre = a.ability.name;
    if (a.is_hidden) {     //validacion de habilidades ocultas
      nombre += " (oculta)";  //agrega la palabra 'oculta'
    }
    console.log("-", nombre);
  }
   console.log("<===========================>")
}


//PARTE 4 FUNCION AUXILIAR 
function obtenerStat(datos, nombreStat) {
  for (let s of datos.stats) {
    if (s.stat.name === nombreStat) {
      return s.base_stat;
    }
  }
  return null; // si no existe
}

//PARTE 4 COMPARAR 2 POKEMON FUNCION
async function compararPokemon(nombre1, nombre2, stat) {

  const p1 = await obtenerPokemon(nombre1);
  const p2 = await obtenerPokemon(nombre2);

  if (!p1 || !p2) {
    console.log("No se puede comparar");
    return;
  }

  const stat1 = obtenerStat(p1, stat);
  const stat2 = obtenerStat(p2, stat);

  // validar si la stat no existe
  if (stat1 === null || stat2 === null) {
    console.log("Stat no válida. Usa: hp, attack, defense, special-attack, special-defense, speed.");
    return;
  }

  if (stat1 > stat2) {
    console.log(`${p1.name} gana en ${stat}`);
  } else if (stat2 > stat1) {
    console.log(`${p2.name} gana en ${stat}`);
  } else {
    console.log("Empate");
  }
}
//PARTE 4 - PRUEBA SIN INGRESO DE DATOS
async function pruebaCompararPokemon() {
    console.log("PRUEBA SNORLAX VS MACHAMP");
  await compararPokemon("snorlax", "machamp", "attack"); //Snorlax vs Machamp (attack) → gana Machamp

    console.log("PRUEBA PIKACHU VS CHARIZARD");
  await compararPokemon("pikachu", "charizard", "defense"); // Pikachu vs Charizard (defense) → gana Charizard

    console.log("PRUEBA PIKACHU VS CHARIZARD, FUERZA NO EXISTE");
  await compararPokemon("pikachu", "charizard", "fuerza");
}

//pruebaCompararPokemon();

//PARTE  - FUNCION PARA QUE USUARIO INGRESE DOS POKEMON Y STAT PARA 
async function mainCompararPokemon() {  

    const nombre1 = prompt("Ingresa Pokemon 1: ");
  const nombre2 = prompt("Ingresa Pokemon 2: ");
  const stat = prompt("Digita Stat (attack, defense, special-attack, special-defense, speed, etc): ");

  await compararPokemon(nombre1, nombre2, stat);
}

// mainCompararPokemon();


//PARTE 5

async function pokemonMasFuerte(listaNombres, stat) {
  let mejorNombre = null;
  let mejorValor = -1;

  for (let nombre of listaNombres) {
    const pokemon = await obtenerPokemon(nombre);
    if (!pokemon) continue;

    const valor = obtenerStat(pokemon, stat);
    if (valor === null) continue;

    if (valor > mejorValor) {
      mejorValor = valor;
      mejorNombre = nombre;
    }
  }

  console.log(`El más fuerte en ${stat} es ${mejorNombre} con ${mejorValor}`);
  return mejorNombre;
}

//FUNCION PARA INICIAR PARTE 5 
async function pruebapokemonMasFuerte() {  

const equipo = ["pikachu", "charizard", "snorlax", "machamp","bulbasaur","Jigglypuff"];

await pokemonMasFuerte(equipo, "attack");
await pokemonMasFuerte(equipo, "defense");
}


pruebapokemonMasFuerte()

