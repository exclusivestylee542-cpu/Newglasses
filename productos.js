/* ============================================================
   PRODUCTOS Y CATEGORÍAS  (este es el único archivo que debes editar para el catálogo)
   Si actualizas la página (index.html, style.css, script.js), este archivo NO se toca,
   así tus productos no se borran.
   ============================================================ */

/* Apartados de la tienda. Puedes cambiar nombres, quitar o agregar.
   id: palabra corta sin espacios ni tildes (se usa en los productos)  |  nombre: lo que se ve en la página */
const CATEGORIAS = [
  { id: "dama",       nombre: "Gafas de dama" },
  { id: "hombre",     nombre: "Gafas de hombre" },
  { id: "deportivas", nombre: "Deportivas" },
  { id: "descanso",   nombre: "Descanso (luz azul)" },
  { id: "sol",        nombre: "Gafas de sol" },
  { id: "ninos",      nombre: "Niños" },
  { id: "accesorios", nombre: "Accesorios" }
];

/* Productos. Guarda la foto en img/productos/ y agrega una línea por producto:
   { id:1, cat:"dama",       nombre:"Montura 001", precio:129900, img:"img/productos/001.jpg" },
   { id:2, cat:"deportivas", nombre:"Montura 002", precio:129900, img:"img/productos/002.jpg" },
   - cada id debe ser distinto (1, 2, 3...)
   - cat es el id del apartado. Si va en varios, usa una lista: cat:["hombre","deportivas"]
   - el producto aparece en su apartado y también en "Todo"                                    */
const PRODUCTOS = [
  { id:1, cat:"descanso", nombre:"Montura 2273", precio:129900, img:"img/productos/2273.jpg" },
  { id:2, cat:"descanso", nombre:"Montura 9200", precio:129900, img:"img/productos/9200.jpg" },
  { id:3, cat:"descanso", nombre:"Montura 7021", precio:129900, img:"img/productos/7021.jpg" },
  { id:4, cat:"descanso", nombre:"Montura 9201", precio:129900, img:"img/productos/9201.jpg" },
  { id:5, cat:"descanso", nombre:"Montura 6235", precio:129900, img:"img/productos/6235.jpg" },
  { id:6, cat:"descanso", nombre:"Montura 2272", precio:129900, img:"img/productos/2272.jpg" },
  { id:7, cat:"descanso", nombre:"Montura 6073", precio:129900, img:"img/productos/6073.jpg" },
  { id:8, cat:"descanso", nombre:"Montura 2275", precio:129900, img:"img/productos/2275.jpg" },
  { id:9, cat:"descanso", nombre:"Montura 9217", precio:129900, img:"img/productos/9217.jpg" },
  { id:10, cat:"descanso", nombre:"Montura 2271", precio:129900, img:"img/productos/2271.jpg" },
  { id:11, cat:"descanso", nombre:"Montura 8010", precio:129900, img:"img/productos/8010.jpg" }
];
