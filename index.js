// ! Selección de elementos del DOM  
const fecha = document.querySelector('#fecha');            // * Selecciona el contenedor donde se muestra la fecha 
const lista = document.querySelector('#lista');            // Lista UL donde se agregarán las tareas
const elemento = document.querySelector('#elemnto');       // Elemento individual de la lista (NO SE USA directamente en este código)
const descripcion = document.querySelector('#descripcion'); // Input donde el usuario escribe la tarea
const agregar = document.querySelector('#agregar');        // Botón con el icono "+" para agregar una tarea

// * Clases para los íconos de estado de tarea
const check = 'fa-check-circle';    // Clase de Font Awesome para indicar tarea completada
const uncheck = 'fa-circle';        // Clase de Font Awesome para tarea pendiente
const lineThrough = 'line-through'; // Clase que aplica tachado al texto de la tarea

// ! Declaración de variables principales
let LIST;  // Lista de tareas (array de objetos)
let id;    // ID único incremental para cada tarea

// Obtener y mostrar la fecha y hora actual en español (formato largo)
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-CO', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

/* ------------------------------------------
  FUNCIONES PRINCIPALES
-------------------------------------------*/

// Función para agregar una tarea a la lista visualmente y en memoria
function agregaTarea(tarea, id, realizado, eliminado) {
  if (eliminado) return; // ! Si la tarea fue eliminada, no la muestra

  const REALIZADO = realizado ? check : uncheck; // Si está realizada, usa ícono check
  const LINE = realizado ? lineThrough : '';     // Si está realizada, aplica tachado

      // HTML de la tarea como lista con íconos y texto
  const elemento = `
    <li id="elemento">
      <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
      <p class="text ${LINE}">${tarea}</p>
      <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
    </li>
  `;
  lista.insertAdjacentHTML("beforeend", elemento); // Agrega la tarea al final de la lista
}

// !Funcion de tarea realizada 
function  tarearealizada(element){
 // Cambia las clases del ícono entre check y uncheck
  element.classList.toggle(check);
  element.classList.toggle(uncheck);

// Cambia la clase del texto para aplicar o quitar tachado
  element.parentNode.querySelector('.text').classList.toggle(lineThrough);

// Actualiza el estado en la lista en memoria
LIST[element.id].realizado = !LIST[element.id].realizado;
}

// Función que elimina una tarea visualmente y en memoria
function eliminartarea(element) {
  element.parentNode.parentNode.removeChild(element.parentNode); // Elimina el elemento del DOM
  LIST[element.id].eliminado = true;                             // Marca como eliminada en la lista
  console.log(LIST);                                             // Muestra el array en consola (debug)
}
// ! Evento que se ejecuta al hacer clic en el ícono de "+" (agregar tarea)
agregar.addEventListener('click', () => {
  const tarea = descripcion.value; // Obtiene el valor escrito por el usuario

  if (tarea) {
    // Muestra la tarea en pantalla
    agregaTarea(tarea, id, false, false);

    // La guarda en el array de tareas
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false
    });

    // Guarda la lista en el almacenamiento local
    localStorage.setItem('TODO', JSON.stringify(LIST));

    // Incrementa el ID y limpia el input
    id++;
    descripcion.value = "";
  }
});
/* ------------------------------------------
  EVENTOS PARA MARCAR O ELIMINAR TAREAS
-------------------------------------------*/

// ! Evento global al soltar una tecla 
document.addEventListener("keyup", function (event) {
  const element = event.target;
  const elementData = element.attributes.value;

  console.log(elementData); // Debug

  if (elementData == 'realizado') {
    tarearealizada(element);
    console.log('tarea Realizada');
  } else if (elementData == 'eliminado') {
    eliminartarea(element);
    console.log('eliminado');
  }

  localStorage.setItem('TODO', JSON.stringify(LIST)); // Actualiza el localStorage
});

// ! Evento que escucha clics sobre los íconos dentro de la lista
lista.addEventListener('click', function (event) {
  const element = event.target; // Elemento clicado
  const elementData = element.attributes.data.value; // 'realizado' o 'eliminado'

  console.log(elementData); // Debug

  if (elementData == 'realizado') {
    tarearealizada(element);
  } else if (elementData == 'eliminado') {
    eliminartarea(element);
    console.log("eliminado");
  }

  // Guarda los cambios en localStorage
  localStorage.setItem('TODO', JSON.stringify(LIST));
});

/* ------------------------------------------
  CARGA DE TAREAS GUARDADAS AL INICIAR
-------------------------------------------*/

// ! Revisa si hay datos guardados en localStorage
let data = localStorage.getItem('TODO');

if (data) {
  // Si hay datos, los convierte en array y carga
  LIST = JSON.parse(data);
  console.log(LIST);      // Muestra los datos cargados
  id = LIST.length;       // Continua desde el último ID
  cargarLista(LIST);      // Agrega todas las tareas al DOM
} else {
  // Si no hay datos, inicia con lista vacía
  LIST = [];
  id = 0;
}

// ! Función que recorre el array de tareas y las muestra
function cargarLista(array) {
  array.forEach(function (item) {
    agregaTarea(item.nombre, item.id, item.realizado, item.eliminado);
  });
}