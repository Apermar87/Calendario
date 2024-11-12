<?php

header('Content-Type: application/json');

require("conexion.php");

$conexion = regresarConexion();

switch ($_GET['accion']) {

    case 'reservado':
        $datos = mysqli_query($conexion, "SELECT fecha_inicio, fecha_fin FROM wp_reservas");
        $reservas = array();
        while ($fila = mysqli_fetch_assoc($datos)) {
            // Agregar cada fila al array de reservas
            $reservas[] = $fila;
        }
        echo json_encode($reservas);
        break;

    case 'obtener_precios':
        // Consulta SQL para obtener todas las fechas dentro del rango de fechas de las tarifas
        $query = "SELECT fecha, precio FROM (
                    SELECT t.nombre_tarifa, DATE_ADD(t.fecha_inicio, INTERVAL n DAY) AS fecha, t.precio
                    FROM wp_tarifas t
                    JOIN (
                        SELECT a.N + b.N * 10 + c.N * 100 AS n
                        FROM (
                            SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
                        ) AS a
                        CROSS JOIN (
                            SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
                        ) AS b
                        CROSS JOIN (
                            SELECT 0 AS N UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
                        ) AS c
                    ) AS nums ON DATE_ADD(t.fecha_inicio, INTERVAL nums.n DAY) <= t.fecha_fin
                ) AS calendario
                ORDER BY fecha, nombre_tarifa";

        $result = mysqli_query($conexion, $query);

        $tarifas = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $tarifas[] = $row;
        }
        echo json_encode($tarifas);
        break;
}
?>
