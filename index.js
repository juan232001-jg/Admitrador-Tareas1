const  fecha= document.querySelector('#fecha'); //Seleciona el id de fecha dentro del html
const lista=  document.querySelector('#lista'); //Selcionna el id lista donde se va mostra todas las tareas 
const elemento=  document.querySelector('#elemnto'); // Selecion los elementos de cada las tareas 
const  descripcion = document.querySelector('#descripcion'); // setcion donde va el nombre de la tarea 
const agregar= document.querySelector('#agregar'); // Secion  ddl  boton donde  se agraga una nueva tares 
const check = 'fa-check-circle'; //Setection  para poner iicon redonde chck
const uncheck = 'fa-circle' ;//Section  de incon no selecionado 
const lineThrough = 'line-through'; // eliminacion del texto 

let LIST
// Section donde esta fecha  con su hora respectivamente 
const FECHA = new Date();
fecha.innerHTML=FECHA.toLocaleDateString('es-CO',{weekday:'long', month: 'short', day :'numeric',  hour: '2-digit', minute: '2-digit'})

// Funcion que me permite agregar tarea
function agregaTarea(tarea,id,realizado,eliminado){
    if (eliminado) {return}
    
    const REALIZADO= realizado ? check:uncheck; // Si realizado es verdadero el check si no unchck

    const LINE = realizado ? lineThrough:'' 

    const elemento =`<li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                        `
    lista.insertAdjacentHTML("beforeend" , elemento)
}
// Funcion de tarea realizada 
function  tarearealizada(element){
    element.classlist.toggle(check)
    element.classlist.toggle(uncheck)
    element.classlist.toggle('.text').classlist.toggle(lineThrough)
    LIST[element,id].realizado=LIST[element,id].realizado ? false : true
}

// Funcion para eliminar tarea 
function eliminartarea(element){
    element.parentNode.parentNode.removeChild(element,parentNode)
    LIST[element,id].eliminado=true
}

// Crear un eventi para escuchar el entery y habilitar el boto 

agregar.addEventListener('click',()=>{
    const tarea =descripcion.value
    if (tarea) {
          agregaTarea(tarea,id,false,false)
        LIST.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        id++
        descripcion.value=""
}})

document.addEventListener("keyup",function(event){
    const element= event.target
    const  elementData =element.attributes.value
    console.log(elementData)

    if (elementData=='realizado') {
        tarearealizada(element)
        console.log('tarea Realizada')
    }
    else if (elementData=='eliminado') {
        eliminartarea(element)
        console.log('eliminado')
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))

})
let data = localStorage.getItem('TODO')                     
if (data) {
    LIST=JSON.parse(data)
    console.log(LIST)
    id=LIST.length
    cargarLista(LIST)
} else {
    LIST=[]
    id=0
}

function cargarLista(array) {
    array.forEach(function(item){
        agregaTarea(item.nombre, item.id,item.realizado,item.eliminado)
    });
}