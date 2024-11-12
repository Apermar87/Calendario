document.addEventListener("DOMContentLoaded", function () {

    // Muestra el calendario
    var calendario1 = new FullCalendar.Calendar(document.getElementById('Calendario1'), {
       
        initialView: 'multiMonth', // Usar la vista personalizada multiMonth

        views: {
            multiMonth: {
                type: 'dayGrid',
                selectable: true, // Seleccionar rango de dias con el raton arrastrando
                unselectAuto: false,
                duration: { months: 2 }, // Duración de dos meses
            }
        },

        height: 510, //Modificar tamaño calendario

        //Mover cabecera para cambiar de mes, y today hacia la izquierda. Centrar titulo. Colocar en derecha, para seleccionar por MES, SEMANA Y DIA.
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next today'
        },

        // Configuración de la primera semana y los fines de semana
        firstDay: 1, // Establece el primer día de la semana como lunes (0 para domingo, 1 para lunes, etc.)
        weekends: true, // Incluye los fines de semana (sábado y domingo)
        showNonCurrentDates: false, //Ocultar dias de otros meses

        //Poner el año en cada mes
        multiMonthTitleFormat: {
            month: 'long',
            year: 'numeric'
        },

        // Configuración del idioma
        locale: 'es', // Establece el idioma en español

        // Cambiar texto del botón "Today" por "Hoy"
        buttonText: {
            today: 'Hoy'
        },

        // Mostrar solo una letra en mayúscula en los encabezados de los días del mes
        dayHeaderContent: function (arg) {
            return arg.date.toLocaleDateString('default', { weekday: 'short' })[0].toUpperCase();
        },

        eventSources: [
            {
                url: 'datoseventos.php?accion=listar', // URL para obtener los eventos desde el servidor
                method: 'GET', // Método HTTP para la solicitud (puede ser GET o POST)
            }
        ],

        eventContent: function(arg) {
            // Ocultar el contenido del evento
            return { domNodes: [] };
        },

        eventDidMount: function(info) {
            // Obtener la fecha de inicio y fin del evento
            var startDate = info.event.start;
            var endDate = info.event.end;

            // Iterar sobre los días entre la fecha de inicio y fin del evento
            var currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                // Obtener el elemento del día correspondiente a la fecha actual
                var dayElement = document.querySelector('.fc-day[data-date="' + currentDate.toISOString().slice(0, 10) + '"]');
                // Cambiar el color de fondo del día del evento
                dayElement.style.backgroundColor = '#ff9f89';
                // Avanzar al siguiente día
                currentDate.setDate(currentDate.getDate() + 1);
            }
        },

        dateClick: function (info) {
            // Cambiar la fecha de inicio al hacer clic en una fecha en el calendario
            document.getElementById('FechaInicio').value = info.dateStr;
        },
        
        // Evento select que se activa al seleccionar un rango de fechas en el calendario
        select: function (info) {
            // Obtener las fechas de inicio y fin
            var fechaInicio = info.startStr;
            var fechaFin = info.endStr;

            // Ajustar la fecha de fin para incluir el último día
            var fechaFinModificada = new Date(fechaFin);
            fechaFinModificada.setDate(fechaFinModificada.getDate() - 1);
            var fechaFinFinal = fechaFinModificada.toISOString().slice(0, 10);

            // Actualizar los campos de fecha de inicio y fecha de fin con las fechas seleccionadas en el calendario
            document.getElementById('FechaInicio').value = fechaInicio;
            document.getElementById('FechaFin').value = fechaFinFinal;
        },

         // Evento que se activa al cambiar el rango de fechas en el calendario
         datesSet: function (info) {
            // Cambiar el título del calendario después de cambiar el rango de fechas
            document.querySelector('.fc-toolbar-title').textContent = 'Calendario de disponibilidad';
        },

        // Evento que determina si un día específico es seleccionable
        selectAllow: function (arg) {
            // Verificar si el día tiene eventos cargados desde la base de datos
            var dayHasEvents = checkDayHasEvents(arg.start);
            // Devolver true si el día no tiene eventos, de lo contrario, devolver false
            return !dayHasEvents;
        }
    });

    // Función para verificar si un día tiene eventos cargados desde la base de datos
    function checkDayHasEvents(day) {
        // Obtener la fecha en formato YYYY-MM-DD
        var formattedDate = day.toISOString().slice(0, 10);

        // Iterar sobre los eventos cargados desde la base de datos
        for (var i = 0; i < calendario1.getEvents().length; i++) {
            var event = calendario1.getEvents()[i];
            // Obtener la fecha de inicio y fin del evento
            var startDate = new Date(event.start);
            var endDate = new Date(event.end);
            // Verificar si el día actual está dentro del rango de fechas del evento
            if (startDate <= day && endDate >= day) {
                // El día tiene eventos, por lo que no es seleccionable
                // Además, ajustamos el rango de selección
                calendario1.select(startDate, endDate);
                return true;
            }
        }
        // Si no se encuentra ningún evento para el día actual, el día es seleccionable
        return false;
    }

    // Función de la biblioteca FullCalendar para mostrar calendario
    calendario1.render();

    // Evento de clic para mostrar la selección de fecha de inicio en el calendario
    document.getElementById('FechaInicio').addEventListener('change', function () {
        var fechaInicio = this.value;
        calendario1.select(fechaInicio, document.getElementById('FechaFin').value);
    });

    // Evento de cambio en el campo de fecha de fin
    document.getElementById('FechaFin').addEventListener('change', function () {
        var fechaFin = this.value;
        // Ajustar la fecha de fin para incluir el último día
        var fechaFinModificada = new Date(fechaFin);
        fechaFinModificada.setDate(fechaFinModificada.getDate() + 1);
        var fechaFinFinal = fechaFinModificada.toISOString().slice(0, 10);
        // Actualizar el campo de fecha de fin con la fecha ajustada
        document.getElementById('FechaFin').value = fechaFinFinal;
        // Seleccionar el rango de fechas en el calendario
        calendario1.select(document.getElementById('FechaInicio').value, fechaFinFinal);
    });

    // Cambiar el título del calendario después de renderizarlo
    document.querySelector('.fc-toolbar-title').textContent = 'Calendario de disponibilidad';

});




/*
//funciones que interactuan con el FormularioEventos
function recuperarDatosFormulario(){
    let registro = {
      id: $('#Id').val(),
      titulo: $('#Titulo').val(),
      descripcion: $('#Descripcion').val(),
      inicio: $('#FechaInicio').val() + ' ' + $('#HoraInicio').val(),
      fin: $('#FechaFin').val() + ' ' + $('#HoraFin').val(),
      colorfondo: $('#ColorFondo').val(),
      colortexto: $('#ColorTexto').val()
    }
    return registro;
  }

   //Eventos de botones de la aplicacion
   $('#BotonAgregar').click(function(){
    let registro = recuperarDatosFormulario();
    agregarRegistro(registro);
    $('#FormularioEventos').modal('hide');
  });


     //funciones para comunicarse con el servidor AJAX!
     function agregarRegistro(registro) {
        $.ajax({
          type: 'POST',
          url: 'datoseventos.php?accion=agregar',
          data: registro,
          success: function(msg){
            calendario1.refetchEvents();
          },
          error: function(error) {
            alert("Hubo un error al agregar el evento: " + error);
          }
        });
      }
  
      function modificarRegistro(registro){
        $.ajax({
          type: 'POST',
          url: 'datoseventos.php?accion=modificar',
          data: registro,
          success: function(msg){
            calendario1.refetchEvents();
          },
          error: function(error) {
            alert("Hubo un error al modificar el evento: " + error);
          }
        });
      }
  
      function borrarRegistro(registro){
        $.ajax({
          type: 'POST',
          url: 'datoseventos.php?accion=borrar',
          data: registro,
          success: function(msg){
            calendario1.refetchEvents();
          },
          error: function(error) {
            alert("Hubo un error al borrar el evento: " + error);
          }
        });
      }*/