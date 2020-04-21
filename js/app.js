//Cotizar constructor
//constructor para seguro
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function(){
    /*
     1 = americano 1.15
     2 = asiatico 1.05
     3 = europeo 1.35
    */

    let cantidad;
    const base =2000;

    switch(this.marca){
      case '1':
        cantidad = base * 1.15;
        break;
      case '2':
        cantidad = base * 1.05;
        break;
      case '3':
        cantidad = base * 1.35;
        break;
    }
    
    // Leer el año
    const diferencia = new Date().getFullYear()-this.anio;
    //Cada año de diferencia hay que reducir 3% el valor del seguro

    cantidad -= ((diferencia *3)*cantidad) / 100;
    /*
    si el seguro es basico se multiplica 30% mas
    si el seguro es completo se multiplica 50% mas
    */
   if(this.tipo ==='basico') {
     cantidad *= 1.30;
   }else{
     cantidad *= 1.50;
   }

   return cantidad;

    console.log(cantidad);
}

//todo lo que se muestra
function Interfaz(){}

//Mensaje que se imprime en el html
Interfaz.prototype.mostrarError = function(mensaje, tipo) {
  const div = document.createElement('div');
  
  if(tipo === 'error'){
    div.classList.add('mensaje', 'error');
  }else{
    div.classList.add('mensaje', 'correcto');
  }

  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector('.form-group'));//toma dos parametros, el primero es el elemento a insertar y el segundo es antes de que elemento
   
  setTimeout(function(){
       document.querySelector('.mensaje').remove();
   }, 3000);
}


// EventListener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
  e.preventDefault();

  // Leer la marca seleccionada del select
  const marca = document.getElementById('marca');
  const marcaSeleccionada = marca.options[marca.selectedIndex].value; //Estos nos retorna el valor seleccionado dentro de un "option"
  
  // leer el año seleccionado
  const anio = document.getElementById('anio');
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  //leer El valor del radio buttom
  const tipo = document.querySelector('input[name="tipo"]:checked').value;//Selecciona el input con el name = "tipo"
  
  //Crear instancia de interfaz
  const interfaz = new Interfaz();

  //revisamos que los campos no estan vacios
  if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
    // Interfaz imprimiendo un error
    interfaz.mostrarError('Faltan datos, revisa el formulario y prueba de nuevo', 'error')
  }else{
   // Instanciar seguro mostrar interfaz
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
   //Cotizar seguro
   const cantidad = seguro.cotizarSeguro();
  }
  //console.log(tipoSeleccionado);
  //console.log(anioSeleccionado);
  //console.log(marcaSeleccionada);
});


const max = new Date().getFullYear(),
      min = max - 20;

const selectYear = document.getElementById('anio');
for(let i = max; i > min; i--){
  let option = document.createElement('option'); //Se crea el elemento "option" dentro del html
  option.value = i; //Se le asigna el valor
  option.innerHTML = i; //Lo que va dentro del elemento
  selectYear.appendChild(option); //Se agrega el "option" como hijo 
}


