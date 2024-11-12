<?php

header('Content-Type: application/json');

require("conexion.php");

$conexion = regresarConexion();


switch ($_GET['accion']) {

  case 'listar':
    $datos = mysqli_query($conexion, "select id,
                nombre_cliente,
                apellidos_cliente,
                email_cliente,
                telefono_cliente,
                fecha_inicio,
                fecha_fin,
                tarifa_id
                from wp_reservas");
    $resultado = mysqli_fetch_all($datos, MYSQLI_ASSOC);
    echo json_encode($resultado);

    break;

  case 'agregar':
    $respuesta = mysqli_query($conexion, "insert into wp_reservas (select id, nombre_cliente, apellidos_cliente, email_cliente, telefono_cliente, fecha_inicio, fecha_fin, tarifa_id ) values
                          ('$_POST[nombre_cliente]','$_POST[apellidos_cliente]','$_POST[email_cliente]','$_POST[telefono_cliente]','$_POST[fecha_inicio]','$_POST[fecha_fin]','$_POST[tarifa_id]')");
    echo json_encode($respuesta);
    break;

  case 'modificar':
    $respuesta = mysqli_query($conexion, "update wp_reservas set nombre = '$_POST[nombre]',
                        tarifa = '$_POST[tarifa]',
                        telefono = '$_POST[telefono]',
                        email = '$_POST[email]',
                        inicio = '$_POST[inicio]',
                        fin = '$_POST[fin]'
                        where id = $_POST[id]");
    echo json_encode($respuesta);
    break;

  case 'borrar':
      $respuesta = mysqli_query($conexion, "delete from wp_reservas where id = $_POST[id]");
      echo json_encode($respuesta);
    break;
}

 ?>
