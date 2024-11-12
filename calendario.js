//Selecciona elementos HTML que tiene la clase CSS "dias, siguiente, anterior, hoy, mes" y lo asigna a las variables correspondientes.
const elementosCalendario = {
  contenedorDias: document.querySelector(".dias"),
  contenedorDias2: document.querySelector(".dias2"),
  botonSiguiente: document.querySelector(".siguiente"),
  botonAtras: document.querySelector(".anterior"),
  botonHoy: document.querySelector(".boton-hoy"),
  botonCancelar: document.querySelector('.boton-limpiar'),
  mesCalendario1: document.querySelector(".mes1"),
  mesCalendario2: document.querySelector(".mes2")
};

//Array meses
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

//Array dias semana
const diasSemana = ["L", "M", "X", "J", "V", "S", "D",];

//Se crea un objeto de fecha y hora actual utilizando la clase Date.
const fecha = new Date();
//Extrae el mes y el año actual de esta fecha y los asigna a las variables currentMonth y currentYear, respectivamente.
let mesActual = fecha.getMonth();
let añoActual = fecha.getFullYear();

//Mes anterior
let mesAnterior = mesActual - 1;

// Fecha del mes siguiente inicial
let mesSiguiente = mesActual + 1;
let añoSiguiente = añoActual;

// Fecha Input
let mesActualInp = fecha.getMonth();
let añoActualInp = fecha.getFullYear();

if (mesSiguiente > 11) {
  mesSiguiente = 0;
  añoSiguiente++;
}

//Renderizar un calendario en un elemento HTML específico
const renderCalendar = () => {
  fecha.setDate(1); //Establece el día del objeto date al primer día del mes actual. Esto es útil para calcular los días del mes actual.

  const fechaPrimerDiaMes = new Date(añoActual, mesActual, 1); //Crea un nuevo objeto de fecha representando el primer día del mes actual.
  const fechaPrimerDiaMes2 = new Date(añoSiguiente, mesSiguiente, 1);

  const fechaUltimoDiaMes = new Date(añoActual, mesActual + 1, 0);//Crea un nuevo objeto de fecha representando el ultimo día del mes actual.
  const fechaUltimoDiaMes2 = new Date(añoSiguiente, mesSiguiente + 1, 0);

  const primerDiaSemana = fechaPrimerDiaMes.getDay(); // Obtener el índice del primer día de la semana del mes actual (0 para domingo, 1 para lunes, ..., 6 para sábado).
  const primerDiaSemana2 = fechaPrimerDiaMes2.getDay();

  const ajustarPrimerDiaSemana = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;// Si el primer día de la semana es domingo, ajustar para que el lunes sea el primer día
  const ajustarPrimerDiaSemana2 = primerDiaSemana2 === 0 ? 6 : primerDiaSemana2 - 1;

  const ultimoDiaSemana = fechaUltimoDiaMes.getDay();//Obtiene el índice del día de la semana del último día del mes actual (0 para domingo, 1 para lunes, ..., 6 para sábado).
  const ultimoDiaSemana2 = fechaUltimoDiaMes2.getDay();

  const ajustarUltimoDiaSemana = ultimoDiaSemana === 0 ? 6 : ultimoDiaSemana - 1; // Si el último día de la semana es domingo, ajustar para que el domingo sea el último día
  const ajustarUltimoDiaSemana2 = ultimoDiaSemana2 === 0 ? 6 : ultimoDiaSemana2 - 1;

  /* ENTENDER CONDICIONAL TERNARIO
  let ajustaUltimoDiaSemana;

    if (ultimoDiaSemana === 0) {
  ajustarUltimoDiaSemana = 6;
    } else {
  ajustarUltimoDiaSemana = ultimoDiaSemana - 1;
    }*/

  const ultimoDiaMes = fechaUltimoDiaMes.getDate();//Obtiene el número del día del último día del mes actual.
  const utlimoDiaMes2 = fechaUltimoDiaMes2.getDate();

  const fechaUltimoDiaMesAnterior = new Date(añoActual, mesActual, 0);//Crea un nuevo objeto de fecha representando el último día del mes anterior.
  const fechaUltimoDiaMesAnterior2 = new Date(añoSiguiente, mesSiguiente, 0);

  const ultimoDiaMesAnterior = fechaUltimoDiaMesAnterior.getDate();//Obtiene el número del día del último día del mes anterior.
  const ultimoDiaMesAnterior2 = fechaUltimoDiaMesAnterior2.getDate();

  const diasMesSiguiente = 7 - ajustarUltimoDiaSemana - 1;//Calcula el número de días del mes siguiente que deben mostrarse al final del calendario para completar la última semana.
  const diasMesSiguiente2 = 7 - ajustarUltimoDiaSemana2 - 1;

  elementosCalendario.mesCalendario1.innerHTML = `${meses[mesActual]} ${añoActual}`;//Actualiza el contenido del elemento HTML con la clase "mes1" para mostrar el nombre del mes y el año actual.
  elementosCalendario.mesCalendario2.innerHTML = `${meses[mesSiguiente]} ${añoSiguiente}`;//Actualiza el contenido del elemento HTML  con la clases "mes2" para mostrar el nombre del mes y el año del mes siguiente al actual.

  //La función luego genera el HTML necesario para mostrar los días del calendario, iterando sobre los días del mes actual, los días restantes del mes anterior y los días del mes siguiente. Cada día se representa como un elemento <div> con la clase "dia" y se agrega al contenido de days.
  let diasCalendario = "";
  let diasCalendario2 = "";

  //Dias mes anterior incluidos en el calendario
  for (let x = ajustarPrimerDiaSemana; x > 0; x--) {
    diasCalendario += `<div class="dia fuera-de-mes">${ultimoDiaMesAnterior - x + 1}</div>`;
  }

  //Dias mes anterior incluidos en el calendario mes2
  for (let x = ajustarPrimerDiaSemana2; x > 0; x--) {
    diasCalendario2 += `<div class="dia2 fuera-de-mes2">${ultimoDiaMesAnterior2 - x + 1}</div>`;
  }

  //Resaltar el dia actual del mes y muestra dia mes1
  for (let i = 1; i <= ultimoDiaMes; i++) {
    if (
      i === new Date().getDate() &&
      mesActual === new Date().getMonth() &&
      añoActual === new Date().getFullYear()
    ) {
      diasCalendario += `<div class="dia hoy">${i}</div>`;
    } else {
      diasCalendario += `<div class="dia">${i}</div>`;
    }
  }

  //Muestra dias mes2
  for (let i = 1; i <= utlimoDiaMes2; i++) {
    diasCalendario2 += `<div class="dia2">${i}</div>`;
  }

  //Dias mes siguiente incluidos en el calendario
  for (let j = 1; j <= diasMesSiguiente; j++) {
    diasCalendario += `<div class="dia fuera-de-mes">${j}</div>`;
  }

  //Dias mes siguiente incluidos en el calendario mes2
  for (let j = 1; j <= diasMesSiguiente2; j++) {
    diasCalendario2 += `<div class="dia2 fuera-de-mes2">${j}</div>`;
  }

  //El contenido generado se asigna al elemento HTML con la clase "dias", que parece ser el contenedor principal del calendario en la página.
  elementosCalendario.contenedorDias.innerHTML = diasCalendario;
  elementosCalendario.contenedorDias2.innerHTML = diasCalendario2;

  // Obtener Fechas Reservadas y procesar los datos recibidos
  obtenerFechasReservadas(procesarFechasReservadas);

  // Obtener precios y procesarlos
  obtenerPrecios(procesarPrecios);

  //Llamada a la funcion del boton "ocultarBotonHoy"
  ocultarBotonHoy();

  //Llamada a la funcion del boton "ocultarBotonAtras"
  ocultarBotonAtras();

  // Llamar a la función para agregar el evento a los días del calendario
  seleccionarDiasCalendariosPrincipales('dia', 'mes1');
  seleccionarDiasCalendariosPrincipales('dia2', 'mes2');

  // Llamar a la función para que se ejecute
  manejarCalendario();

  // Asignar el evento de click al botón "Siguiente" utilizando la nueva función
  elementosCalendario.botonSiguiente.addEventListener("click", botonSiguiente);

  // Agrega evento clic a boton atras
  elementosCalendario.botonAtras.addEventListener("click", botonAtras);

  // Agrega evento click a boton hoy
  elementosCalendario.botonHoy.addEventListener("click", botonHoy);

  // Agrega un evento click al botón "Cancelar" utilizando la nueva función
  elementosCalendario.botonCancelar.addEventListener('click', limpiarFormulario);

}






// Función para manejar el evento de click en el botón "Siguiente"
function botonSiguiente() {
  mesActual++;
  if (mesActual > 11) {
    mesActual = 0;
    añoActual++;
  }
  mesSiguiente++;
  if (mesSiguiente > 11) {
    mesSiguiente = 0;
    añoSiguiente++;
  }

  renderCalendar();

}

//Este evento de escucha permite al usuario retrocede al anterior mes en el calendario y actualiza la visualización del calendario en consecuencia.
function botonAtras() {
  mesActual--;
  if (mesActual < 0) {
    mesActual = 11;
    añoActual--;
  }
  mesSiguiente--;
  if (mesSiguiente < 0) {
    mesSiguiente = 11;
    añoSiguiente--;
  }
  renderCalendar();
}

//Ocultar botonAtras
function ocultarBotonAtras() {
  if (
    mesActual === new Date().getMonth() &&
    añoActual === new Date().getFullYear()
  ) {
    elementosCalendario.botonAtras.style.display = "none";
  } else {
    elementosCalendario.botonAtras.style.display = "flex";
  }
}

//Permite al usuario regresar al mes y año actual en el calendario al hacer clic en el botón "Hoy", y actualiza la visualización del calendario en consecuencia.
function botonHoy() {
  mesActual = fecha.getMonth();
  añoActual = fecha.getFullYear();
  mesSiguiente = mesActual + 1;
  añoSiguiente = añoActual;

  if (mesSiguiente > 11) {
    mesSiguiente = 0;
    añoSiguiente++;
  }
  renderCalendar();
};

//Ocultar el botón identificado como todayBtn si el mes y el año actuales (currentMonth y currentYear) son iguales al mes y al año actuales del sistema. Si no son iguales, el botón se muestra nuevamente.
function ocultarBotonHoy() {
  if (
    mesActual === new Date().getMonth() &&
    añoActual === new Date().getFullYear()
  ) {
    elementosCalendario.botonHoy.style.display = "none";
  } else {
    elementosCalendario.botonHoy.style.display = "flex";
  }
}
renderCalendar();

// Obtener fechas Reservadas
function obtenerFechasReservadas(callback) {
  var xhrReservas = new XMLHttpRequest();
  xhrReservas.open('GET', 'datosreservas.php?accion=reservado', true);
  xhrReservas.onreadystatechange = function () {
    if (xhrReservas.readyState === XMLHttpRequest.DONE) {
      if (xhrReservas.status === 200) {
        var data = JSON.parse(xhrReservas.responseText);
        callback(data); // Llamar al callback con los datos obtenidos
      } else {
        console.error('Hubo un error al realizar la solicitud.');
      }
    }
  };
  xhrReservas.send();
}

// Obtener Precios dias
function obtenerPrecios(callback) {
  var xhrPrecios = new XMLHttpRequest();
  xhrPrecios.open('GET', 'datosreservas.php?accion=obtener_precios', true);
  xhrPrecios.onreadystatechange = function () {
    if (xhrPrecios.readyState === XMLHttpRequest.DONE) {
      if (xhrPrecios.status === 200) {
        var preciosFechas = JSON.parse(xhrPrecios.responseText);
        callback(preciosFechas);
      } else {
        console.error('Error al obtener los datos. Estado:', xhrPrecios.status);
      }
    }
  };
  xhrPrecios.send();
}

// Procesar fechas de reservas
function procesarFechasReservadas(data) {
  data.forEach(reserva => {
    const fechaInicio = new Date(reserva.fecha_inicio);
    const fechaFin = new Date(reserva.fecha_fin);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fechaInicio.setHours(0, 0, 0, 0);
    fechaFin.setHours(23, 59, 59, 999);

    var fechasReservadas = [];
    var fechasPasadas = [];

    const diasCalendario = document.querySelectorAll('.calendario1 .dia');
    diasCalendario.forEach(dia => {
      const diasMesCalendario1 = parseInt(dia.textContent);
      const mesActualIndice = meses.indexOf(elementosCalendario.mesCalendario1.textContent.split(' ')[0]);
      const añoActual = parseInt(elementosCalendario.mesCalendario1.textContent.split(' ')[1]);

      const fechasMesActual = new Date(añoActual, mesActualIndice, diasMesCalendario1);
      fechasMesActual.setHours(0, 0, 0, 0);

      if (!dia.classList.contains('fuera-de-mes')) {
        if (fechasMesActual < hoy) {
          dia.classList.add('pasado');
          fechasPasadas.push(fechasMesActual);
        }
      }

      if (!dia.classList.contains('pasado')) {
        if (fechasMesActual >= fechaInicio && fechasMesActual <= fechaFin) {
          dia.classList.add('reservado');
          fechasReservadas.push(fechasMesActual);
        }
      }
    });

    const diasCalendario2 = document.querySelectorAll('.calendario2 .dia2');
    diasCalendario2.forEach(dia => {
      const diasMesCalendario2 = parseInt(dia.textContent);
      const mesIndice2 = meses.indexOf(elementosCalendario.mesCalendario2.textContent.split(' ')[0]);
      const añoActual2 = parseInt(elementosCalendario.mesCalendario2.textContent.split(' ')[1]);

      const fechasMes2 = new Date(añoActual2, mesIndice2, diasMesCalendario2);
      if (fechasMes2 >= fechaInicio && fechasMes2 <= fechaFin) {
        dia.classList.add('reservado');
      }
    });
  });
}

// Procesar precios de los dias
function procesarPrecios(preciosFechas) {
  preciosFechas.forEach(precios => {
    const fechas = new Date(precios.fecha);
    if (!isNaN(fechas.getTime())) {
      const preciosValor = precios.precio;
      fechas.setHours(0, 0, 0, 0);

      const diasCalendario = document.querySelectorAll('.calendario1 .dia');
      diasCalendario.forEach(dia => {
        const diasMesCalendario1 = parseInt(dia.textContent);
        const mesActualIndice = meses.indexOf(elementosCalendario.mesCalendario1.textContent.split(' ')[0]);
        const añoActual = parseInt(elementosCalendario.mesCalendario1.textContent.split(' ')[1]);
        const fechasMesActual = new Date(añoActual, mesActualIndice, diasMesCalendario1);

        if (!dia.classList.contains('fuera-de-mes') && !dia.classList.contains('pasado') && !dia.classList.contains('reservado')) {
          if (fechasMesActual.getTime() === fechas.getTime()) {
            const precioDiv = document.createElement('div');
            precioDiv.classList.add('precio');
            precioDiv.textContent = `${preciosValor}€`;
            dia.appendChild(precioDiv);
          }
        }
      });

      const diasCalendario2 = document.querySelectorAll('.calendario2 .dia2');
      diasCalendario2.forEach(dia => {
        const diasMesCalendario2 = parseInt(dia.textContent);
        const mesActualIndice2 = meses.indexOf(elementosCalendario.mesCalendario2.textContent.split(' ')[0]);
        const añoActual2 = parseInt(elementosCalendario.mesCalendario2.textContent.split(' ')[1]);
        const fechasMes2 = new Date(añoActual2, mesActualIndice2, diasMesCalendario2);

        if (!dia.classList.contains('fuera-de-mes') && !dia.classList.contains('pasado') && !dia.classList.contains('reservado')) {
          if (fechasMes2.getTime() === fechas.getTime()) {
            const precioDiv = document.createElement('div');
            precioDiv.classList.add('precio');
            precioDiv.textContent = `${preciosValor}€`;
            dia.appendChild(precioDiv);
          }
        }
      });
    }
  });
}


let calendarioInput = null;  // Referencia global al calendario del formulario, es null porque aun no se ha creado el calendarioInput
let calendarioAbierto = false; // Estado del calendario del formulario, es false porque de primeras esta cerrado el calendarioInput
let calendarioActivo = null; // Referencia al input que activó el calendario
let fechaInicioSeleccionada = null; // Almacena la fecha seleccionada en FechaInicio
let fechaFinSeleccionada = null; // Almacena la fecha seleccionada en FechaFin

//Almacena mes y año
let mesActualInput = new Date().getMonth();
let añoActualInput = new Date().getFullYear();


// Esta función se encarga de manejar la apertura y cierre del calendario
function manejarCalendario() {
  // Obtener referencia al input de fecha de recogida
  const inputFechaInicio = document.getElementById('FechaInicio');
  const InputFechaFin = document.getElementById('FechaFin');

  // Agregar un evento de clic al input de fecha de recogida

  inputFechaInicio.addEventListener('click', abrirCalendario);
  InputFechaFin.addEventListener('click', abrirCalendario);

  document.addEventListener('click', function (event) {
    cerrarCalendarioFueraDeClick(event, [inputFechaInicio, InputFechaFin]);
  });

  // Agregar un evento de redimensionamiento para reposicionar el calendario
  window.addEventListener('resize', function () {
    if (calendarioAbierto && calendarioActivo) {
      posicionarCalendario(calendarioActivo);
    }
  });
}

function abrirCalendario(event) {
  // Evitar la propagación del evento para que no se cierre inmediatamente
  event.stopPropagation();

  const targetInput = event.target; // Determinar cuál input fue clicado. Sirve para cuando tienes dos eventos saber cual fue clicado
  //console.log(targetInput); Imprime <input type="text" id="FechaInicio" placeholder="Fecha de recogida"> o <input type="text" id="FechaFin" placeholder="Fecha de entrega" readonly="">

  // Si el calendario ya está abierto y es diferente al input clicado, lo cierra
  if (calendarioAbierto && calendarioActivo !== targetInput) {
    calendarioInput.remove();
    calendarioInput = null;
    calendarioAbierto = false;
  }

  // Si el calendario no está abierto, o es el mismo input, lo abre
  if (!calendarioAbierto || calendarioActivo !== targetInput) {
    if (!calendarioInput) {
      // Crear el calendario y almacenarlo en la variable global
      calendarioInput = crearCalendarioInput();
    } else {
      // Si ya fue creado, solo lo muestra
      calendarioInput.style.display = 'block';
    }
    // Posicionar el calendario junto al input clicado
    posicionarCalendario(targetInput);
    // Actualizar el estado del calendario clonado
    calendarioAbierto = true;
    // Establecer el input activo
    calendarioActivo = targetInput;

    // Si el input clicado es FechaFin y fechaInicioSeleccionada está definida, bloquea los días anteriores
    if (targetInput.id === 'FechaFin' && fechaInicioSeleccionada) {
      const mesCalendarioInput = calendarioInput.querySelector('.mesCalendarioInput');
      const diasInput = calendarioInput.querySelector('.diasInput');

      //Actualiza al mes y año del seleccionado en FechaInicio
      mesActualInput = fechaInicioSeleccionada.getMonth();
      añoActualInput = fechaInicioSeleccionada.getFullYear();

      actualizarCalendarioFechaFin(mesCalendarioInput, diasInput);
    }
  }
}



// Función para posicionar el calendario junto al input clicado
function posicionarCalendario(targetInput) {
  const posicion = targetInput.getBoundingClientRect();
  calendarioInput.style.position = 'absolute';
  calendarioInput.style.top = `${posicion.bottom + window.scrollY}px`;
  calendarioInput.style.left = `${posicion.left + window.scrollX}px`;
}

// Agregar un evento de clic al documento para detectar clics fuera del calendario
function cerrarCalendarioFueraDeClick(event, inputs) {
  const target = event.target;
  console.log(target);

  if (calendarioAbierto && !inputs.includes(target) && !calendarioInput.contains(target)) { //El calendario está abierto (calendarioAbierto es true). El elemento objetivo (target) no coincide con ninguno de los elementos de entrada del calendario (inputs). El elemento objetivo (target) no está contenido dentro del contenedor principal del calendario (calendarioInput).
    // Oculta el calendario clonado si se hace clic fuera de él o del input de fecha de recogida
    calendarioInput.remove();
    // Restablecer la referencia del calendario a null
    calendarioInput = null;
    // Actualizar el estado del calendario clonado
    calendarioAbierto = false;
    // Restablecer el input activo
    calendarioActivo = null;
  }
}

// Creación calendario input e insercción en el DOM
function crearCalendarioInput() {
 
  const contenedorCalendarioInput = document.createElement('div');
  contenedorCalendarioInput.classList.add('contenedorCalendarioInput');

  const cabeceraCalendarioInput = document.createElement('div');
  cabeceraCalendarioInput.classList.add('cabeceraInput');

  const botonesPrev = document.createElement('div');
  botonesPrev.classList.add('botonesCabeceraInput');
  const botonAnterior = document.createElement('div');
  botonAnterior.classList.add('botonAnteriorInput');
  botonAnterior.innerHTML = '<i class="fas fa-chevron-left"></i>';
  botonesPrev.appendChild(botonAnterior);

  const mesCalendarioInput = document.createElement('div');
  mesCalendarioInput.classList.add('mesCalendarioInput');
  mesCalendarioInput.textContent = `${meses[mesActualInput]} ${añoActualInput}`;

  const botonesNext = document.createElement('div');
  botonesNext.classList.add('botonesCabeceraInput');
  const botonSiguiente = document.createElement('div');
  botonSiguiente.classList.add('botonSiguienteInput');
  botonSiguiente.innerHTML = '<i class="fas fa-chevron-right"></i>';
  botonesNext.appendChild(botonSiguiente);

  cabeceraCalendarioInput.appendChild(botonesPrev);
  cabeceraCalendarioInput.appendChild(mesCalendarioInput);
  cabeceraCalendarioInput.appendChild(botonesNext);

  const calendarioInput = document.createElement('div');
  calendarioInput.classList.add('calendario3Input');

  const semanaInput = document.createElement('div');
  semanaInput.classList.add('semanaInput');
  const diasSemanaInput = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  diasSemanaInput.forEach(dia => {
    const diaSemanaInput = document.createElement('div');
    diaSemanaInput.classList.add('dia-semanaInput');
    diaSemanaInput.textContent = dia;
    semanaInput.appendChild(diaSemanaInput);
  });

  const diasInput = document.createElement('div');
  diasInput.classList.add('diasInput');

  calendarioInput.appendChild(semanaInput);
  calendarioInput.appendChild(diasInput);

  const hoy = document.createElement('div');
  hoy.classList.add('hoyInput');

  const botonHoyInput = document.createElement('div');
  botonHoyInput.classList.add('botonHoyInput');
  botonHoyInput.textContent = 'Hoy';
  hoy.appendChild(botonHoyInput);

  const botonLimpiarInput = document.createElement('div');
  botonLimpiarInput.classList.add('botonLimpiarInput');
  botonLimpiarInput.textContent = 'Limpiar';

  hoy.appendChild(botonLimpiarInput);

  contenedorCalendarioInput.appendChild(cabeceraCalendarioInput);
  contenedorCalendarioInput.appendChild(calendarioInput);
  contenedorCalendarioInput.appendChild(hoy);

  // Agrega el calendario Input al DOM justo después del input FechaInicio
  const inputFechaInicio = document.getElementById('FechaInicio');
  inputFechaInicio.insertAdjacentElement('afterend', contenedorCalendarioInput);



  obtenerFechasReservadas(function (data) {
    procesarFechasReservadasInput(data, mesCalendarioInput);
  });


  botonSiguiente.addEventListener('click', function () {
    mesActualInput++;
    console.log(mesActualInput);
    if (mesActualInput > 11) {
      mesActualInput = 0;
      añoActualInput++;
    }
    actualizarContenidoCalendario(mesCalendarioInput, diasInput, mesActualInput, añoActualInput);
    obtenerFechasReservadas(function (data) {
      procesarFechasReservadasInput(data, mesCalendarioInput);
      seleccionarDiasCalendarioInput();
      bloquearDiasAnterioresAFechaInicio(); // Bloquear días si es necesario
    });
    ocultarBotonAtrasInput(botonAnterior, mesActualInput, añoActualInput);
    ocultarBotonHoyInput(botonHoyInput, mesActualInput, añoActualInput);
  });

  botonAnterior.addEventListener('click', function () {
    mesActualInput--;
    if (mesActualInput < 0) {
      mesActualInput = 11;
      añoActualInput--;
    }
    actualizarContenidoCalendario(mesCalendarioInput, diasInput, mesActualInput, añoActualInput);
    obtenerFechasReservadas(function (data) {
      procesarFechasReservadasInput(data, mesCalendarioInput);
      seleccionarDiasCalendarioInput();
      bloquearDiasAnterioresAFechaInicio(); // Bloquear días si es necesario
    });
    ocultarBotonAtrasInput(botonAnterior, mesActualInput, añoActualInput);
    ocultarBotonHoyInput(botonHoyInput, mesActualInput, añoActualInput);
  });

  botonHoyInput.addEventListener('click', function () {
    mesActualInput = fecha.getMonth();
    añoActualInput = fecha.getFullYear();

    actualizarContenidoCalendario(mesCalendarioInput, diasInput, mesActualInput, añoActualInput);
    obtenerFechasReservadas(function (data) {
      procesarFechasReservadasInput(data, mesCalendarioInput);
      seleccionarDiasCalendarioInput();
      bloquearDiasAnterioresAFechaInicio(); // Bloquear días si es necesario
    });
    ocultarBotonAtrasInput(botonAnterior, mesActualInput, añoActualInput);
    ocultarBotonHoyInput(botonHoyInput, mesActualInput, añoActualInput);
  });


  // Agrega un evento click al botón "Cancelar" utilizando la nueva función
  botonLimpiarInput.addEventListener('click', limpiarFormulario);


  ocultarBotonAtrasInput(botonAnterior, mesActualInput, añoActualInput);

  ocultarBotonHoyInput(botonHoyInput, mesActualInput, añoActualInput);

  // Actualizar contenido del calendario
  actualizarContenidoCalendario(mesCalendarioInput, diasInput, mesActualInput, añoActualInput);

  // Agregar evento de clic a cada día del calendario
  seleccionarDiasCalendarioInput();

  return contenedorCalendarioInput;
}











// Logica Calendario Input
function actualizarContenidoCalendario(mes3Input, dias, mesActualInput, añoActualInput) {

  fecha.setDate(1); //Establece el día del objeto date al primer día del mes actual. Esto es útil para calcular los días del mes actual.

  const fechaPrimerDiaMes = new Date(añoActualInput, mesActualInput, 1); //Crea un nuevo objeto de fecha representando el primer día del mes actual.
  const fechaUltimoDiaMes = new Date(añoActualInput, mesActualInput + 1, 0);//Crea un nuevo objeto de fecha representando el ultimo día del mes actual.
  const primerDiaSemana = fechaPrimerDiaMes.getDay(); // Obtener el índice del primer día de la semana del mes actual (0 para domingo, 1 para lunes, ..., 6 para sábado).
  const ajustarPrimerDiaSemana = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;// Si el primer día de la semana es domingo, ajustar para que el lunes sea el primer día
  const ultimoDiaSemana = fechaUltimoDiaMes.getDay();//Obtiene el índice del día de la semana del último día del mes actual (0 para domingo, 1 para lunes, ..., 6 para sábado).
  const ajustarUltimoDiaSemana = ultimoDiaSemana === 0 ? 6 : ultimoDiaSemana - 1; // Si el último día de la semana es domingo, ajustar para que el domingo sea el último día
  const ultimoDiaMes = fechaUltimoDiaMes.getDate();//Obtiene el número del día del último día del mes actual.
  const fechaUltimoDiaMesAnterior = new Date(añoActualInput, mesActualInput, 0);//Crea un nuevo objeto de fecha representando el último día del mes anterior.
  const ultimoDiaMesAnterior = fechaUltimoDiaMesAnterior.getDate();//Obtiene el número del día del último día del mes anterior.
  const diasMesSiguiente = 7 - ajustarUltimoDiaSemana - 1;//Calcula el número de días del mes siguiente que deben mostrarse al final del calendario para completar la última semana.

  // Actualiza nombre mes
  mes3Input.innerHTML = `${meses[mesActualInput]} ${añoActualInput}`;//Actualiza el contenido del elemento HTML con la clase "mes1" para mostrar el nombre del mes y el año actual.

  //La función luego genera el HTML necesario para mostrar los días del calendario, iterando sobre los días del mes actual, los días restantes del mes anterior y los días del mes siguiente. Cada día se representa como un elemento <div> con la clase "dia" y se agrega al contenido de days.
  let diasCalendarioInput = "";

  //Dias mes anterior incluidos en el calendario
  for (let x = ajustarPrimerDiaSemana; x > 0; x--) {
    diasCalendarioInput += `<div class="diaInput fuera-de-mes">${ultimoDiaMesAnterior - x + 1}</div>`;
  }

  //Resaltar el dia actual del mes y muestra dia mes1
  for (let i = 1; i <= ultimoDiaMes; i++) {
    if (
      i === new Date().getDate() &&
      mesActualInput === new Date().getMonth() &&
      añoActualInput === new Date().getFullYear()
    ) {
      diasCalendarioInput += `<div class="diaInput hoy">${i}</div>`;
    } else {
      diasCalendarioInput += `<div class="diaInput">${i}</div>`;
    }
  }

  //Dias mes siguiente incluidos en el calendario
  for (let j = 1; j <= diasMesSiguiente; j++) {
    diasCalendarioInput += `<div class="diaInput fuera-de-mes">${j}</div>`;
  }

  //El contenido generado se asigna al elemento HTML con la clase "dias", que parece ser el contenedor principal del calendario en la página.
  dias.innerHTML = diasCalendarioInput;
}

function actualizarCalendarioFechaFin(mesCalendarioInput, diasInput) {

  mesCalendarioInput.textContent = `${meses[mesActualInput]} ${añoActualInput}`;



  actualizarContenidoCalendario(mesCalendarioInput, diasInput, mesActualInput, añoActualInput);
  obtenerFechasReservadas(function (data) {
    procesarFechasReservadasInput(data, mesCalendarioInput);
    seleccionarDiasCalendarioInput();
    bloquearDiasAnterioresAFechaInicio(); // Bloquear días si es necesario
  });

  const botonAnterior = calendarioInput.querySelector('.botonAnteriorInput');
  const botonHoy = calendarioInput.querySelector('.botonHoyInput');
  ocultarBotonAtrasInput(botonAnterior, mesActualInput, añoActualInput);
  ocultarBotonHoyInput(botonHoy, mesActualInput, añoActualInput);

}




//Ocultar botonAtras
function ocultarBotonAtrasInput(botonAnterior, mesActualInput, añoActualInput) {
  const fechaActual = new Date();
  if (
    mesActualInput === fechaActual.getMonth() &&
    añoActualInput === fechaActual.getFullYear()
  ) {
    botonAnterior.style.display = "none";
  } else {
    botonAnterior.style.display = "flex";
  }
}

function ocultarBotonHoyInput(botonHoyInput, mesActualInput, añoActualInput) {
  const fechaActual = new Date();
  if (
    mesActualInput === fechaActual.getMonth() &&
    añoActualInput === fechaActual.getFullYear()
  ) {
    botonHoyInput.style.display = "none";
  } else {
    botonHoyInput.style.display = "flex";
  }
}

// Obtener reservas
function procesarFechasReservadasInput(data, mesCalendarioInput) {
  data.forEach(reserva => {
    const fechaInicio = new Date(reserva.fecha_inicio);
    const fechaFin = new Date(reserva.fecha_fin);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fechaInicio.setHours(0, 0, 0, 0);
    fechaFin.setHours(23, 59, 59, 999);

    var fechasReservadas = [];
    var fechasPasadas = [];

    const diasCalendarioInput = document.querySelectorAll('.calendario3Input .diaInput');
    diasCalendarioInput.forEach(dia => {
      const diasMesCalendarioInput = parseInt(dia.textContent);
      const mesActualIndiceInput = meses.indexOf(mesCalendarioInput.textContent.split(' ')[0]);
      const añoActual = parseInt(mesCalendarioInput.textContent.split(' ')[1]);

      const fechasMesActual = new Date(añoActual, mesActualIndiceInput, diasMesCalendarioInput);
      fechasMesActual.setHours(0, 0, 0, 0);

      if (!dia.classList.contains('fuera-de-mes')) {
        if (fechasMesActual < hoy) {
          dia.classList.add('pasado');
          fechasPasadas.push(fechasMesActual);
        }
      }

      if (!dia.classList.contains('pasado')) {
        if (fechasMesActual >= fechaInicio && fechasMesActual <= fechaFin) {
          dia.classList.add('reservado');
          fechasReservadas.push(fechasMesActual);
        }
      }
    });
  }
  )
}




// Seleccionar dias 
function seleccionarDiasCalendarioInput() {
  // Obtener todos los elementos con la clase especificada
  const diasCalendario = document.querySelectorAll('.diaInput');


  // Agregar un evento de clic a cada elemento
  diasCalendario.forEach(dia => {
    if (!dia.classList.contains('fuera-de-mes') && !dia.classList.contains('pasado') && !dia.classList.contains('reservado')) {
      dia.addEventListener('click', () => {

        // Cambiar el color de fondo del día al hacer clic
        dia.classList.toggle('seleccionado');


        // Obtener el texto solo del nodo de texto inmediato del padre
        const texto = dia.childNodes;
        let numeroDia = '';

        // Iterar sobre los nodos hijos para encontrar el nodo de texto
        texto.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            numeroDia = node.textContent.trim();
          }
        });


        const mesAño = document.querySelector('.mesCalendarioInput');

        const textoMesAño = mesAño.textContent.split(' ');

        // Crear la fecha seleccionada
        const mesSeleccionado = meses.indexOf(textoMesAño[0]);

        const añoSeleccionado = parseInt(textoMesAño[1]);

        const fechaSeleccionada = new Date(añoSeleccionado, mesSeleccionado, numeroDia);


        // Mostrar la fecha seleccionada en el input "elegido"
        if (fechaSeleccionada) {
          const inputFecha = calendarioActivo;

          inputFecha.value = fechaSeleccionada.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });

          // Actualizar la fecha de inicio seleccionada
          if (inputFecha.id === 'FechaInicio') {
            fechaInicioSeleccionada = fechaSeleccionada;

            bloquearDiasAnterioresAFechaInicio(); // Bloquear días si es necesario

          } else if (inputFecha.id === 'FechaFin') {
            // Eliminar la clase "bloqueado" cuando se selecciona una fecha en FechaFin
            diasCalendario.forEach(dia => {
              dia.classList.remove('bloqueado');
            });
          }


          // Ocultar el calendario después de seleccionar el día
          calendarioInput.remove();
          calendarioInput = null;
          calendarioAbierto = false;
          calendarioActivo = null;
        }
      });
    }
  });
}

function bloquearDiasAnterioresAFechaInicio() {
  const diasCalendario = document.querySelectorAll('.diaInput');
  const mesAño = document.querySelector('.mesCalendarioInput');
  const textoMesAño = mesAño.textContent.split(' ');

  const mesSeleccionado = meses.indexOf(textoMesAño[0]);
  const añoSeleccionado = parseInt(textoMesAño[1]);

  diasCalendario.forEach(dia => {
    const texto = dia.childNodes;
    let numeroDia = '';
    texto.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        numeroDia = node.textContent.trim();
      }
    });

    const fechaDia = new Date(añoSeleccionado, mesSeleccionado, numeroDia);
console.log(calendarioInput);

    if (calendarioInput )
    if (fechaDia < fechaInicioSeleccionada && !dia.classList.contains('fuera-de-mes')) {
      dia.classList.add('bloqueado');
    }
  });
}


let clickCount = 0; // Contador de clics
// Seleccionar dias 
function seleccionarDiasCalendariosPrincipales(claseDia, claseMes) {
  // Obtener todos los elementos con la clase especificada
  const diasCalendario = document.querySelectorAll(`.${claseDia}`);


  // Agregar un evento de clic a cada elemento
  diasCalendario.forEach(dia => {
    if (!dia.classList.contains('fuera-de-mes') && !dia.classList.contains('pasado') && !dia.classList.contains('reservado')) {
      dia.addEventListener('click', () => {

        // Manejar el contador de clics
        clickCount++;

        // Si es el tercer clic, reiniciar el estado
        if (clickCount > 2) {
          diasCalendario.forEach(dia => {
            dia.classList.remove('seleccionado');
          });
          clickCount = 1; // Reiniciar el contador de clics
          fechaInicioSeleccionada = null;
          fechaFinSeleccionada = null;
        }

        // Obtener el texto solo del nodo de texto inmediato del padre
        const texto = dia.childNodes;
        let numeroDia = '';


        // Iterar sobre los nodos hijos para encontrar el nodo de texto
        texto.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            numeroDia = node.textContent.trim();
          }
        });

        const mesAño = document.querySelector(`.${claseMes}`);

        const textoMesAño = mesAño.textContent.split(' ');

        // Crear la fecha seleccionada
        const mesSeleccionado = meses.indexOf(textoMesAño[0]);

        const añoSeleccionado = parseInt(textoMesAño[1]);

        const fechaSeleccionada = new Date(añoSeleccionado, mesSeleccionado, numeroDia);


        // Mostrar la fecha seleccionada en el input "elegido"
        if (fechaSeleccionada) {
          let inputFecha;

          if (clickCount === 1) {
            inputFecha = document.getElementById('FechaInicio');
            fechaInicioSeleccionada = fechaSeleccionada; // Almacenar la fecha seleccionada
            console.log(fechaInicioSeleccionada);
            dia.classList.add('seleccionado'); // Marcar el día como seleccionado
          } else if (clickCount === 2) {
            inputFecha = document.getElementById('FechaFin');
            fechaFinSeleccionada = fechaSeleccionada; // Almacenar la fecha seleccionada
            dia.classList.add('seleccionado'); // Marcar el día como seleccionado


            // Marcar los días intermedios como seleccionados
            diasCalendario.forEach(dia => {
              const texto = dia.childNodes;
              let numeroDia = '';
              texto.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                  numeroDia = node.textContent.trim();
                }
              });

              const fechaDia = new Date(añoSeleccionado, mesSeleccionado, numeroDia);
              if (fechaDia > fechaInicioSeleccionada && fechaDia < fechaFinSeleccionada && !dia.classList.contains('fuera-de-mes')) {
                dia.classList.add('seleccionado');
              }
            });
          }

          inputFecha.value = fechaSeleccionada.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });


          // Marcar días anteriores a la fecha seleccionada en FechaInicio como bloqueados
          if (fechaInicioSeleccionada && clickCount === 1) {
            diasCalendario.forEach(dia => {
              const texto = dia.childNodes;
              let numeroDia = '';
              texto.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                  numeroDia = node.textContent.trim();
                }
              });

              const fechaDia = new Date(añoSeleccionado, mesSeleccionado, numeroDia);
              if (fechaDia < fechaInicioSeleccionada && !dia.classList.contains('fuera-de-mes')) {
                dia.classList.add('bloqueado');
              }
            });
          } else if (clickCount === 2) {
            // Eliminar la clase 'bloqueado' de todos los días cuando se selecciona FechaFin
            diasCalendario.forEach(dia => {
              dia.classList.remove('bloqueado');
            });
          }
        }
      });
    }
  });
}



//LIMPIAR FORMULARIO
function limpiarFormulario() {

  // Selecciona los campos de entrada de fecha
  var fechaInicioInput = document.getElementById('FechaInicio');
  var fechaFinInput = document.getElementById('FechaFin');

  // Restablece los valores de los campos de entrada a una cadena vacía
  fechaInicioInput.value = '';
  fechaFinInput.value = '';

   // Restablece las fechas seleccionadas
   fechaInicioSeleccionada = null;
   fechaFinSeleccionada = null;

  // Extraigo, itero y elimino clase a dias seleccionados
  const diasSeleccionados = document.querySelectorAll('.seleccionado');
  diasSeleccionados.forEach(dia => {
    dia.classList.remove('seleccionado');
  });

  // Extraigo, itero y elimino clase a dias bloqueados
  const diasBloqueados = document.querySelectorAll('.bloqueado');
  diasBloqueados.forEach(dia => {
    dia.classList.remove('bloqueado');
  });

  //Contador de clicks a 0
  clickCount = 0;

   // Reiniciar el calendario a la fecha actual
   mesActualInput = new Date().getMonth();
   añoActualInput = new Date().getFullYear();


};



//  ME FALLAN VARIAS COSAS AL BLOQUEAR LOS DIAS






/*function iterarDiasCalendario(calendario1, fechaComparar) {

  const diasCalendario = document.querySelectorAll(`.${calendario1} .dia`);

  diasCalendario.forEach(dia => {
    // Obtiene el texto completo del elemento "dia"
    let textoCompleto = dia.textContent;

    // Obtiene el texto del elemento "precio"
    let textoPrecio = dia.querySelector('.precio') ? dia.querySelector('.precio').textContent : '';

    // Remueve el texto del "precio" del texto completo
    let diasMesCalendario1 = textoCompleto.replace(textoPrecio, '').trim();

    // Indice mes actual
    const mesActualIndice = meses.indexOf(elementosCalendario.mesCalendario1.textContent.split(' ')[0]);

    // Indice año actual
    const añoActual = parseInt(elementosCalendario.mesCalendario1.textContent.split(' ')[1]);

    const fechaMesActual = new Date(añoActual, mesActualIndice, diasMesCalendario1);
    fechaMesActual.setHours(0, 0, 0, 0); // Asegúrate de que la hora sea la misma

    if (!dia.classList.contains('fuera-de-mes') && !dia.classList.contains('pasado') && !dia.classList.contains('reservado')) {
      if (fechaMesActual.getTime() == fechaComparar.getTime()) {
        console.log("Fecha correcta:", fechaMesActual);
        dia.classList.add('seleccionado');
      } else {
        //console.log("Fecha incorrecta:", fechaMesActual);
        dia.classList.remove('seleccionado');
      }
    }
  });
}

function iterarDiasCalendario2(calendario2, fechaComparar) {

  const diasCalendario = document.querySelectorAll(`.${calendario2} .dia2`);

  diasCalendario.forEach(dia => {
    // Obtiene el texto completo del elemento "dia"
    let textoCompleto = dia.textContent;

    // Obtiene el texto del elemento "precio"
    let textoPrecio = dia.querySelector('.precio') ? dia.querySelector('.precio').textContent : '';

    // Remueve el texto del "precio" del texto completo
    let diasMesCalendario2 = textoCompleto.replace(textoPrecio, '').trim();

    // Indice mes actual
    const mesActualIndice2 = meses.indexOf(elementosCalendario.mesCalendario2.textContent.split(' ')[0]);

    // Indice año actual
    const añoActual2 = parseInt(elementosCalendario.mesCalendario2.textContent.split(' ')[1]);

    const fechaMesActual2 = new Date(añoActual2, mesActualIndice2, diasMesCalendario2);
    fechaMesActual2.setHours(0, 0, 0, 0); // Asegúrate de que la hora sea la misma

    if (!dia.classList.contains('fuera-de-mes') && !dia.classList.contains('reservado')) {
      if (fechaMesActual2.getTime() == fechaComparar.getTime()) {
        console.log("Fecha correcta:", fechaMesActual2);
        dia.classList.add('seleccionado');
      } else {
        //console.log("Fecha incorrecta:", fechaMesActual);
        dia.classList.remove('seleccionado');
      }
    }
  });
}*/

















