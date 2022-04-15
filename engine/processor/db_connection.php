<?php
$database_info = $APP["database-connection-info"];
$dbc = mysqli_connect($database_info["hostname"],$database_info["username"],$database_info["password"],$database_info["database"]) or die(mysqli_connect_error());
mysqli_set_charset($dbc,"utf8");